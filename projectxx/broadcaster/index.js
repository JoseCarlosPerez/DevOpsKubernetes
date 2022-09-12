require('dotenv').config();
const NATS = require('nats');
const natsStringCode = NATS.StringCodec();
const axios = require('axios');

console.log('Nats broadcaster is running');
NATS.connect({ servers: process.env.NATS_URL })
.then(async conn => {
  const sub = conn.subscribe('todo_created', { queue: 'broadcaster.workers' });
  
  for await (const message of sub) {
    const data = natsStringCode.decode(message.data);
    console.log(`Sending message: ${data}`)

    await axios.post(
      process.env.DISCORD_URL,
      { 'content': data }
    );
  }
});
