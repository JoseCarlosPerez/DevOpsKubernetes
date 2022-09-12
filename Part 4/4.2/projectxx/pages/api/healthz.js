const axios = require('axios');
require('dotenv').config();

export default function handler(req, res) {
  axios.get(`http://127.0.0.1:${process.env.TODOSPORT}/healthz`)
  .then(s => {
    if (s.status === 200) {
      res.status(200).json({ "status": "ok" });
    } else {
      res.status(503).json({ "status": 'Todos is not ready' });
    }
  })
  .catch(err => res.status(500).json(err));
}