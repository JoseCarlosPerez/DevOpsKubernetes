const express = require('express');
const app = express();
require('dotenv').config();
const { connectToDatabase, sequelize } = require('./db');
const Todo = require('./Models/Todo');
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

app.get('/todos', async (_, response) => {
  const todos = await Todo.findAll();

  response.status(200).json(todos);
});

app.post('/todos', async (request, response) => {
  const {todo} = request.body;

  if (todo.length > 140) {
    const wrongMessage = 'That TODO is to long';
    console.log(wrongMessage);
    response.status(403).json(wrongMessage);
  } else {
    const newTodo = await Todo.create({text: todo});
  
    response.status(201).json(newTodo);
  }
});

app.put('/todos/:id', async (request, response) => {
  console.log('enter');
  const id = request.params.id;
  console.log(id);
  const todo = new Todo({
    done: true
  });

  const result = await Todo.update({
    done: true
  },
  {
    where: { id }
  });

  if (result) {
    response.status(200).json(result);
  } else {
    response.status(404).json({
      error: 'Todo does not exist'
    });
  }
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
