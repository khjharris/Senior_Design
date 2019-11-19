// const express = require('express');
// const router = express.Router();

const Router = require('express-promise-router')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

const rp = require('request-promise');
const db = require('../db/index')
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SK);

/**
 * Router export for authenticated/protected api's
 * 
 * @passport - used for authentication
 * 
 * @userProfileManager - used to retrieve user attributes
 * 
 * @selfServiceManager - used to set up custom UI's, will most likely not be used within these apis
 * 
 * Url:
 *  - http://localhost:3000/api/{}
 *  - https://https://livelowebapp.us-south.cf.appdomain.cloud/api/{}
 * 
 *  - http://localhost:3000/api/protected/{}
 *  - https://https://livelowebapp.us-south.cf.appdomain.cloud/api/protected/{}
 */
module.exports = function (app, passport, pgClient, userProfileManager, selfServiceManager) {

  // Test API Endpoint to determine if the application in running correctly
  router.get('/api/health', (req, res) => {
    res.json({
      "health": "Ok"
    })
  })

  router.get('/api/test/services', (req, res) => {
    res.send(process.env.VCAP_SERVICES);
  })

  router.get('/api/test/stripe', (req, res) => {
    res.send(process.env.REACT_APP_STRIPE_PK);
  })

  return router;
}