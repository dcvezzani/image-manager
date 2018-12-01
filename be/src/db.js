const config = require('../knexfile');
const knex = require('knex')(config.development); // todo: make more flexible with `process.env.NODE_ENV`

export default knex;

