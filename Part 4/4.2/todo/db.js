const Sequelize = require('sequelize');
require('dotenv').config();
const {BD: bd, BDUSER: user, BDPASSWORD: pass, SERVICEROUTE: service} = process.env;

const sequelize = new Sequelize(`postgres://${user}:${pass}@${service}:5432/${bd}`);

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
