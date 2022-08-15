const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDatabase, sequelize } = require('./db');
const Todo = require('./Models/Todo');
const PORT = process.env.PORT;

app.use(express.json());

app.get('/todos', async (_, response) => {
  const todos = await Todo.findAll();

  response.status(200).json(todos);
});

app.post('/todos', async (request, response) => {
  const {todo} = request.body;
  const newTodo = await Todo.create({text: todo});

  response.status(201).json(newTodo);
});


const start = async () => {
  await connectToDatabase();

  sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
