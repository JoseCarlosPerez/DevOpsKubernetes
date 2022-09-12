const axios = require('axios');
require('dotenv').config();

const post = (todo, res) => {
  try {
    axios.post(`http://127.0.0.1:${process.env.TODOSPORT}/todos`, {
      todo
    })
    .then(s => {
      res.status(200).json(s.data);
    })
    .catch(err => res.status(500).json(err));
  } catch(ex) {
    console.log(`Todos(POST): ${ex.message}`);
  }
};

const get = (res) => {
  try {
    axios.get(`http://127.0.0.1:${process.env.TODOSPORT}/todos`)
    .then(s => {
      res.status(200).json(s.data);
    })
    .catch(err => res.status(500).json(err));
  } catch(ex) {
    console.log(`Todos(GET): ${ex.message}`);
  }
};

export default function handler(req, res) {
  console.log(`Todo operation: ${req.method}`);

  if (req.method === 'POST') {
    post(req.body.todo, res);
  } else if (req.method === 'GET') {
    get(res);
  }
}
