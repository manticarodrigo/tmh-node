const config = {}

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
}

if (process.env.NODE && ~process.env.NODE.indexOf("heroku")) {
  config.mongoDB = {
    host: 'mongodb://heroku_sfsc9mn3:1qfo14sg1hpahvtfgcn2jlete4@ds133281.mlab.com:33281/heroku_sfsc9mn3'
  }
} else {
  config.mongoDB = {
    host: 'mongodb://127.0.0.1:27017/tmh'
  }
}

module.exports = config;