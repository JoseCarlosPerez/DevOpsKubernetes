const axios = require('axios');

const executeJob = async () => {
  const response = await axios.get('https://en.wikipedia.org/wiki/Special:Random')
  
  const subr = await axios.post('http://projectxx-svc.projectxx.svc.cluster.local:2346/todos', {
    todo: `Read ${response.request.res.responseUrl}`
  });

  console.log(subr.status === 201 ? 'Job executed' : 'Error executing this Job');
}

executeJob();
