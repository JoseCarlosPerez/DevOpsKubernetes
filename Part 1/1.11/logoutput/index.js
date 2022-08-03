const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (_, response) => {
  fs.readFile(process.env.FILE, 'utf8', (err, data) => { 
    if (err) {
      response.status(500).json({
        status: err
      });
    } else {
      response.status(200).json({
        status: data
      });
    }
  });
});
