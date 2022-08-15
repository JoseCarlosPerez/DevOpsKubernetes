const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;

let counter = -1;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/pingpong', (_, response) => {
  response.status(200).send(`pong ${++counter}`);
});
