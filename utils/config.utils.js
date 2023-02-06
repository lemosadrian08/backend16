const dotenv = require('dotenv');
dotenv.config();
const minimist = require ('minimist')


const args = minimist(process.argv.slice(2),{
  alias:{
    p: 'port',
    m: 'mode'
  },
  default:{
    mode: 'FORK'
  }
})

module.exports = {
  MODE: args.mode,
  PORT: args.port,
  DB_PASSWORD: process.env.DB_PASSWORD
}