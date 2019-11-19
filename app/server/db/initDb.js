/**
 * Export PG Client - enables a connection with the Databases-for-PostgreSQL
 */

const pg = require("pg");
const promise = require('bluebird');
const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(initOptions);


module.exports = function() {
  let credentials;

  let connectionString;
  let caCert;

  if (process.env.NODE_ENV === 'production') {
    // production
    console.log("Production development");
    var appInfo = JSON.parse(process.env.VCAP_SERVICES);
    credentials = appInfo["databases-for-postgresql"][0].credentials;

    // caCert = Buffer.from(process.env.PG_CERT, 'base64').toString();
    // connectionString = process.env.COMPOSED;
    // let config = require('../../vcap-prod');
    // credentials = config.services["databases-for-postgresql"][0];

    let postgresConnection = credentials.connection.postgres;
    caCert = Buffer.from(postgresConnection.certificate.certificate_base64, 'base64').toString();

    connectionString = postgresConnection.composed[0];


  }
  else {
    // local development
    console.log("Local development");
    let config = require('../../vcap-local');
    credentials = config.services["databases-for-postgresql"][0].credentials;
    let postgresConnection = credentials.connection.postgres;
    caCert = Buffer.from(postgresConnection.certificate.certificate_base64, 'base64').toString();

    connectionString = postgresConnection.composed[0];

  }


  // When using pgClient must do pgClient.connect() and pgClient.end()
  let pgClient = new pg.Client({
    connectionString: connectionString,
    ssl: {
      ca: caCert
    }
  })

  let pgPool = new pg.Pool({
    connectionString: connectionString,
    ssl: {
      ca: caCert
    }
  })

  let pgPromise = pgp({
    connectionString: connectionString,
    ssl: {
      ca: caCert
    }
  })

  return {
    pgClient,
    pgPool,
    pgPromise
  }
}