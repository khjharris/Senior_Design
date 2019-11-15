const express = require('express');
const router = express.Router();

module.exports = function(app, passport, pgClient) {

  router.get('/api/health', function (req, res, next) {
    res.json({
      status: 'UP'
    });
  });

  return router;
}