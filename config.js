// config.js
module.exports = {
  url: 'mongodb://bl_user:qwerty123@ds037551.mongolab.com:37551/beerlocker',
  'options': {
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    }
  }
};
