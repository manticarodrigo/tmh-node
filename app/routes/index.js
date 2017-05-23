const express = require('express');
const router = express.Router();

// users routes
// const users = require('../users');

module.exports = function() {

	/* GET home page. */
  router.get('/', function(req, res ) {
      res.send('Connected to TMH realtime database');
  });

  // /* Additional routes go here */
  // router.route('/users')
  //   .get(users.getAllUsers)
  //   .put(users.saveUser);


  // router.route('/users/:userId')
  //   .get(users.getUser)
  //   .put(users.updateUser)
  //   .delete(users.deleteUser);

	return router;
};