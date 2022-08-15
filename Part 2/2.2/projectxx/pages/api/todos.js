const axios = require('axios');
require('dotenv').config();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const todo = req.body.todo;
    axios.post(`http://127.0.0.1:${process.env.TODOSPORT}/todos`, {
      todo
    })
    .then(s => {
      res.status(200).json(s.data);
    })
    .catch(err => res.status(500).json(err));
  } else if (req.method === 'GET'){
    axios.get(`http://127.0.0.1:${process.env.TODOSPORT}/todos`)
    .then(s => {
      res.status(200).json(s.data);
    })
    .catch(err => res.status(500).json(err));
  }
}
