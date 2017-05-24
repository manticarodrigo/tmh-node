const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const app = express();

app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "stage.themanhome.com, themanhome.herokuapp.com");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(express.static('www'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({  
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}));

const routes = require('./routes');
app.use('/', routes);
 
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
module.exports = app;