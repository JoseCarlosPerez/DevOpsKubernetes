const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:example@postgres-svc.pingpong-writer-reader.svc.cluster.local:5432/postgres');

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err.message)
    return process.exit(1)
  }

  return null
};

module.exports = {
  connectToDatabase,
  sequelize
};
