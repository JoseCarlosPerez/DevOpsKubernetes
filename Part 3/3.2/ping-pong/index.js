const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDatabase, sequelize } = require('./db');
const Pong  = require('./Models/Pong');

const PORT = process.env.PORT;

app.use(express.json());

app.get('/healthz', (_, response) => {
  response.status(200).send(true);
});

app.get('/pingpong', async (_, response) => {
  const pong = await Pong.findByPk(0);
  let counter = 0;

  if (pong) {
    counter = ++pong.pong;
    await pong.save();
  } else {
    await Pong.create({ id: 0, pong: counter });
  }

  response.status(200).send(`pong ${counter}`);
});

const start = async () => {
  await connectToDatabase();

  sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
