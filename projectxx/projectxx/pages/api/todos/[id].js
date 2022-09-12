const axios = require('axios');
require('dotenv').config();

export default function handler(req, res) {
  console.log(`Todo operation: ${req.method}`);

  if (req.method === 'PUT') {
    const { id } = req.query;

    axios.put(`http://127.0.0.1:${process.env.TODOSPORT}/todos/${id}`)
    .then(s => {
      res.status(200).json(s.data);
    })
    .catch(err => res.status(500).json(err));
  }
}