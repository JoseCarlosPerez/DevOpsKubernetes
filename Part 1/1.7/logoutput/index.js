const express = require('express');
const app = express();
const logoutput = require('./logoutput');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (_, response) => {
    response.status(200).json({
      status: logoutput.getCurrentRandomString()
    })
});
