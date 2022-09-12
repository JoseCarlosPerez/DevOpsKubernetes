const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDatabase, sequelize } = require('./db');
const Pong  = require('./Models/Pong');
const PORT = process.env.PORT;

let dbIsReady = false;

app.use(express.json());

app.get('/healthz', (_, response) => {

  if (dbIsReady) {
    response.status(200).send('OK');
  } else {
    response.status(503).send('Db is not ready');
  }

});

app.get('/pingpong', async (_, response) => {
  console.log('PINPONG');

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

  await sequelize.sync();

  dbIsReady = true;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
