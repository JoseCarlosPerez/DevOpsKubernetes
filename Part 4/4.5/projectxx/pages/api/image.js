const fs = require('fs')
const axios = require('axios');
require('dotenv').config();

const image = Object.create(null);
const directory = process.env.IMAGE_DIRECTORY;

export default function handler(_, res) {
  try {
    const date = new Date().toISOString().split('T')[0];

    if (image[date]) {
      const img = fs.readFileSync(`${directory}img.png`);
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    } else {
      fetch('https://picsum.photos/1200')
      .then(s => {
        image[date] = 1;
  
        fs.mkdir(directory, (err) => {
          axios.get(s.url, { responseType: 'stream' }).then(response => {
            response.data.pipe(fs.createWriteStream(`${directory}img.png`));
            res.status(200).json(s.url);
          });
        });
      })
      .catch(err => res.status(500).json({ status: err }));
    }
  } catch(ex) {
    console.log(`Todos(GET): ${ex.message}`);
  }
}
