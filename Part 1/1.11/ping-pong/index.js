const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();
const getDirName = require('path').dirname;
const mkdirp = require('mkdirp');

const PORT = process.env.PORT;

let counter = -1;

const randomString = () => {
  let string = '';
  const length = Math.round(Math.random() * 5 + 1);

  for (let i = 0; i < length; i++) {
    string += Math.round(Math.random() * 10 + 1); 
  }

  return string;
};

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/pingpong', (_, response) => {
  counter++;

  mkdirp(getDirName(process.env.FILE)).then(function () {
    fs.writeFile(process.env.FILE, `${new Date()}: ${randomString()}\nPing/Pong: ${counter}`, (error) => {
      console.log(error ?? 'Writing success')
    });
  });


  response.status(200).send(`pong ${counter}`);
});
