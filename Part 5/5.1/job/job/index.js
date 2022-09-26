const url = process.argv[2] || 'https://www.google.com';
const axios = require('axios');

axios.get(url)
.then(s => {
  console.log(s.data);
})
