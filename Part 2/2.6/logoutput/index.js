const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;
const MESSAGE = process.env.MESSAGE;

app.use(express.json());

const randomString = () => {
  let string = '';
  const length = Math.round(Math.random() * 5 + 1);

  for (let i = 0; i < length; i++) {
    string += Math.round(Math.random() * 10 + 1); 
  }

  return string;
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (_, response) => {
  axios.get(`http://127.0.0.1:${process.env.PINGPONGPORT}/pingpong`)
  .then(s => {
    response.status(200).send(`
      ${MESSAGE}
      ${new Date().toISOString()}: ${randomString()}
      ${s.data}
    `);
  })
  .catch(s => response.status(500).send(s));
});
