/**
 * @author Facundo Martin Gordillo <facundomgordillo@gmail.com>
 * @license See LICENSE.md
 */

// Curso de Express.js => https://platzi.com/cursos/express-js/
require('dotenv-flow').config();
const express = require("express")
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const bodyParser = require('body-parser');
const cfEnv = require('cfenv');
const cookieParser = require('cookie-parser');
const express_enforces_ssl = require('express-enforces-ssl');
const log4js = require('log4js');
const http = require("http")
const path = require("path")
const CronJob = require('cron').CronJob;
const app = express()
const isLocal = cfEnv.getAppEnv().isLocal;

const logger = log4js.getLogger("livelowebapp");
logger.level = process.env.LOG_LEVEL || 'info'

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(cookieParser());
app.use(log4js.connectLogger(logger, { level: logger.level }));
app.enable("trust proxy"); // Trust proxy is required in order to enforce https
app.use(express.static(path.join(__dirname + "/../build")))

console.log("env: ", process.env.NODE_ENV);


const pgInit = require('./db/initDb')();
const db = require('./db/index')
const pgClient = pgInit.pgClient;
const pgPool = pgInit.pgPool;
app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : "user_sessions"   // Use another table-name than the default "session" one
  }),
  secret: process.env.REACT_APP_EXPRESS_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


// Enforce https
if (process.env.NODE_ENV === 'production') {
  app.use(express_enforces_ssl());
}

// Configure express application to use passport
app.use(passport.initialize());
app.use(passport.session());

// Example connect to database
pgClient.connect(err => {
  if (err) {
    console.error(" error connecting", err)
  }
  else {
    console.log("Database connected");
    pgClient.end()
  }
})


/**
 * For other routes consiting of passport authentication, see './routers/auth' to export more routes.
 * 
 * Routes exported include:
 *  - /api/{}
 * 
 */
app.use('/', require('./routers/auth')(app, passport, pgClient));
app.use('/', require('./routers/health')(app, passport, pgClient));

app.get("/*", (req, res) => {
  // res.sendFile(path.join(__dirname, "build", "index.html"))
  res.sendFile(path.join(__dirname+'/../build/index.html'));

})

const server = http.createServer(app)
const port = process.env.PORT || 5000;

server.listen(port)
server.on("listening", () => {
  console.log('APIs are listening on port ' + port);
})

console.log('App is located at: http://localhost:3000');