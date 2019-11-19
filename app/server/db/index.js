const { Pool } = require('pg')

const pgInit = require('./initDb')();
const pgPool = pgInit.pgPool;
const pgClient = pgInit.pgClient;
const pgPromise = pgInit.pgPromise;

module.exports = {
  promise: () => pgPromise,
  query: (text, params) => pgPool.query(text, params),
}