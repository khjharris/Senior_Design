const express = require('express');
const rp = require('request-promise');
const router = express.Router();
const bodyParser = require('body-parser');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const SelfServiceManager = require('ibmcloud-appid').SelfServiceManager;
const userProfileManager = require("ibmcloud-appid").UserProfileManager;
const CALLBACK_URL = "/auth/callback";
var generateUserScim = require('../helpers/generateUserScim');

// -------------------------- CONST URL's -----------------------
const AUTH = "/auth";
const LOGIN_URL = "/auth/login"; // used to sign up or sign in a user
const LOG_OUT = "/auth/logout";
const SIGN_UP = "/auth/signup";


module.exports = function (app, passport, pgClient) {
  // ******************************** BEGIN CONFIGURE AUTHENTICATION ***********************************
  let appIDCredentials;

  // Determine AppID Credentials
  if (process.env.NODE_ENV === 'development') {
    // Local credentials
    let localConfig = require('../../vcap-local');
    appIDCredentials = localConfig.services["AppID"][0].credentials;
    appIDCredentials["redirectUri"] = "http://localhost:3000" + CALLBACK_URL;
  }
  else {
    // Production Credentials
    let prodConfig = JSON.parse(process.env.VCAP_SERVICES);

    // Find the Production AppID Service
    appIDCredentials = prodConfig["AppID"][0].credentials;
    appIDCredentials["redirectUri"] = "https://swim.us-south.cf.appdomain.cloud/" + CALLBACK_URL;
  }

  // For information on AppID Server SDK:
  // https://github.com/ibm-cloud-security/appid-serversdk-nodejs


  // Allows for custom control of the UI for the sign-in, sign-up, forgot password, changeDetail, and changePassword flows.
  // AppIDCredentials determines whether to use the local vs production config.
  let selfServiceManager = new SelfServiceManager({
    iamApiKey: appIDCredentials.apikey,
    managementUrl: appIDCredentials.managementUrl
  })

  // Configure user profile which is used for accessing profile attributes from the server.
  // AppIDCredentials determines whether to use the local vs production config.
  userProfileManager.init({
    appidServiceEndpoint: appIDCredentials.appidServiceEndpoint,
    version: appIDCredentials.version,
    tenantId: appIDCredentials.tenantId,
    oauthServerUrl: appIDCredentials.oauthServerUrl,
    profilesUrl: appIDCredentials.profilesUrl
  })

  // Configure passport to be used with AppID. AppIDCredentials determines whether to use the local vs production config.
  passport.use(new WebAppStrategy({
    tenantId: appIDCredentials.tenantId,
    clientId: appIDCredentials.clientId,
    secret: appIDCredentials.secret,
    oauthServerUrl: appIDCredentials.oauthServerUrl,
    redirectUri: appIDCredentials.redirectUri
  }))

  // Configure passportjs with user serialization/deserialization. This is required
  // for authenticated session persistence across HTTP requests. See passportjs docs
  // for additional information http://passportjs.org/docs
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  /**
   * Logout a user - Clears authentication information from session
   * 
   * Once logout is complete redirect to homepage
   * 
   * Once in homepage, force react to check for authentication and then add/remove authentication from react redux.
   */
  router.get(LOG_OUT, (req, res) => {
    WebAppStrategy.logout(req);
    res.redirect("/");
  });

  /**
   * Determine user authentication from the client-side
   * If authenticated, provided user data and attributes. Otherwise returns an error message
   * 
   * Returns:
   *  @user - user data from session
   *  @userAttributes - all user attributes, retrieved from userProfileManager
   * 
   */
  router.get('/auth/userData', function (req, res) {
    // Useful token information:
    // https://cloud.ibm.com/docs/services/appid?topic=appid-tokens

    // determine if user is authenticated
    if (req.isAuthenticated()) {

      let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
      userProfileManager.getAllAttributes(accessToken).then(attributes => {
        res.json({
          "user": req.user,
          "userAttributes": attributes,
        })
      })
      .catch(err => {
        // Error retrieving all user attributes
        console.log("\n\nError GETTING USER PROFILE \n\n", err);

        res.redirect(LOG_OUT);
      })
    }
    else {
      // User is not authenticated
      res.json({
        "error": "Not Authenticated"
      })
    }
  })

  /**
   * Update user attributes
   * 
   * Request Body:
   * @name - attribute name (key)
   * @value - attribute value
   * 
   */
  router.post('/auth/userData', async function (req, res) {
    const { name, value } = req.body;
    console.log("name -> ", name);
    console.log("value -> ", value);

    if (!value || value === "" || value === null) {
      res.json({});
    }

    if (req.isAuthenticated()) {
      let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;

      userProfileManager.setAttribute(accessToken, name, value).then(attribute => {
        console.log("Attribute successful - ", name);
        res.json({
          "user": req.user,
          "userAttribute": attribute
        })
      })
      .catch(err => {
        console.log("\n\nError UPDATING USER PROFILE \n\n", err);
        console.log("Attribute unsuccessful -", name);
        res.json({
          "error": "Error with attribute: " + name
        })
      })
    }
    else {
      console.log("Error: Not Authenticated");
      res.json({
        "error": "Not Authenticated"
      })
    }
  })

  router.delete('/auth/userData/:name', async function (req, res) {
    const { name } = req.params;

    if (req.isAuthenticated()) {
      let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;

      try {
        let deletedAttribute = await userProfileManager.deleteAttribute(accessToken, name);
        res.json({
          "deleted": "Succesfully deleted - " + name
        })
      }
      catch (e) {
        console.log("Error deleting attribute", e);
        res.json({
          "error": "Error deleting attribute"
        })
      }
    }
    else {
      res.json({
        "error": "Not Authenticated"
      })
    }
  })

  router.get('/auth/test', async function(req, res, next) {
    res.status(200).send("hello");
  })

  router.post('/auth/test', async function (req, res, next) {
    console.log("req body", req.body);

    res.status(200).json({"success": "success"})
  })

  // Login via form post
  router.post('/auth/form/login', async function (req, res, next) {
    passport.authenticate(WebAppStrategy.STRATEGY_NAME, function (err, user, info) {
      if (err) {
        // return next(err);
        console.log("Error general", err);
        return res.status(200).json({"error": "Error please try again"})

      }
      if (!user) {
        console.log("Error code", info.code);

        return res.status(200).json({"error": "Invalid email and/or password"})
      }
      req.logIn(user, function (err) {
        if (err) {
          console.log("Error logging in");
          return res.status(200).json({ "error": "Error authenticating user" })
          // return next(err);
        }
        else {
          console.log("success", user);
          return res.status(200).json({"success": user})
        }
        // return res.redirect(LANDING_PAGE_URL + languageQuery);
      });
    })(req, res, next);
  })

  // Create new user, with custom UI
  router.post('/auth/newUser', async function (req, res, next) {
    const { username, email, password, confirm_password, firstName, lastName, phoneNumber, redirectUri } = req.body;

    let userData = generateUserScim(email, password, firstName, lastName, phoneNumber);
    console.log("user data", userData);

    if (password !== confirm_password) {
      // error, not the same password
      res.status(200).json({ "error": "Passwords do not match" });
    }
    else {
      selfServiceManager.signUp(userData, 'en').then(function (user) {
        passport.authenticate(WebAppStrategy.STRATEGY_NAME, async function (err, authUser, info) {
          console.log("in passport authenticate web app");

          if (err) {
            console.log("Error with authentication", err);
            return res.status(200).json({"error": "error 1"})
          }
          if (!user) {
            console.log("Error code, no user", info.code);
    
            return res.status(200).json({"error": "No user found"})
          }

          req.logIn(authUser, async function (err) {
            if (err) {
              console.log("Error authenticationg user", err)
              return res.status(200).json({ "error": "Error authenticating user" })
              // return next(err);
            }
            else {
              console.log("Success");
              return res.status(200).json({"success": authUser})
            }
          });
        })(req, res, next)

      }).catch(function (err) {
        console.log("\n\nError: ", err.message);
        res.status(200).json({
          "error": err.message
        })
      });
    }
  })


  /**
   * Router export for authenticated/protected api's
   * 
   * @passport - used for authentication
   * 
   * @userProfileManager - used to retrieve user attributes
   * 
   * @selfServiceManager - used to set up custom UI's, will most likely not be used within these apis
   * 
   * Url: (both protected and unprotected routes)
   *  - http://localhost:3000/api/{}
   *  - https://https://livelowebapp.us-south.cf.appdomain.cloud/api/{}
   * 
   */
  router.use('/', require('./api')(app, passport, pgClient, userProfileManager, selfServiceManager));

  return router;
}