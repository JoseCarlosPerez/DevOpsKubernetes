const k8s = require('@kubernetes/client-node');
const mustache = require('mustache');
const request = require('request');
const JSONStream = require('json-stream');
const fs = require('fs').promises;

const kc = new k8s.KubeConfig();
process.env.NODE_ENV === 'development' ? kc.loadFromDefault() : kc.loadFromCluster();
const opts = {};
kc.applyToRequest(opts);

const client = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](`${kc.getCurrentCluster().server}${api}`, {...opts, ...options, headers: { ...options.headers, ...opts.headers }}, (err, res) => err ? reject(err) : resolve(JSON.parse(res.body))));

const fieldsFromDummySite = (object) => ({
  dummysite_name: object.metadata.name,
  container_name: object.metadata.name,
  job_name: `${object.metadata.name}-job-${object.spec.website_url}`,
  namespace: object.metadata.namespace,
  website_url: object.spec.website_url,
  image: object.spec.image,
});

const fieldsFromJob = (object) => ({
  dummysite_name: object.metadata.labels.dummysite,
  container_name: object.metadata.labels.dummysite,
  job_name: `${object.metadata.labels.dummysite}-job-${object.metadata.labels.website_url}`,
  namespace: object.metadata.namespace,
  website_url: object.metadata.labels.website_url,
  image: object.spec.template.spec.containers[0].image,
});

const getJobYAML = async (fields) => {
  const deploymentTemplate = await fs.readFile("job.mustache", "utf-8");
  return mustache.render(deploymentTemplate, fields);
};

const createJob = async (fields) => {
  console.log('Scheduling new job dummysite', fields.website_url, 'for dummysite', fields.dummysite_name, 'to namespace', fields.namespace);

  const yaml = await getJobYAML(fields);

  return sendRequestToApi(`/apis/batch/v1/namespaces/${fields.namespace}/jobs`, 'post', {
    headers: {
      'Content-Type': 'application/yaml'
    },
    body: yaml
  });
};

const removeJob = async ({ namespace, job_name }) => {
  const pods = await sendRequestToApi(`/api/v1/namespaces/${namespace}/pods/`)
  pods.items
  .filter(pod => pod.metadata.labels['job-name'] === job_name)
  .forEach(pod => sendRequestToApi(
    `/api/v1/namespaces/${namespace}/pods/${pod_name}`,
    'delete'
  ));

  return sendRequestToApi(
    `/apis/batch/v1/namespaces/${namespace}/jobs/${job_name}`,
    'delete'
  );
};

const cleanupForDummysite = async ({ namespace, dummysite_name }) => {
  console.log('Doing cleanup');

  const jobs = await sendRequestToApi(`/apis/batch/v1/namespaces/${namespace}/jobs`);
  jobs.items.forEach(job => {
    removeJob({ namespace, job_name: job.metadata.name });
  })
};

const maintainStatus = async () => {
  (await client.listPodForAllNamespaces()).body; // A bug in the client(?) was fixed by sending a request and not caring about response

  //#region DummySite
  
  const dummysite_stream = new JSONStream();

  dummysite_stream.on('data', async ({ type, object }) => {
    const fields = fieldsFromDummySite(object);

    if (type === 'ADDED') {
      createJob(fields);
    } else if (type === 'DELETED') {
      cleanupForDummysite(fields);
    }
  })

  request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(dummysite_stream);

  //#endregion

  //#region Jobs

  const job_stream = new JSONStream();

  job_stream.on('data', async ({ type, object }) => {
    if (object.metadata.labels.website_url && type !== 'DELETED' && !object.metadata.deletionTimestamp && object.status.succeeded) {
      removeJob(fieldsFromJob(jobObject));
    }
  });

  request.get(`${kc.getCurrentCluster().server}/apis/batch/v1/jobs?watch=true`, opts).pipe(job_stream);

  //#endregion
};

maintainStatus();
