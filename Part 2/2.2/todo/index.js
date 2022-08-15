const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());

const todos = [];

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/todos', (_, response) => {
  response.status(200).json(todos);
});

app.post('/todos', (request, response) => {
  const body = request.body
  todos.push({
    id: todos.length,
    text: body.todo
  });

  response.status(201).json(todos[todos.length - 1]);
});
