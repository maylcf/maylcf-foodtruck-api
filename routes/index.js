var express = require('express');
var initDb = require('../db');
var config = require('../config');
var middleware = require('../middleware');

console.log("#Routes");

let router = express();
let api = express.Router();  

// // Connect to DB
initDb(db => {
  
  console.log("#Routes > Mid");
  
  router.use(middleware({config, db}));
  
  console.log("#Routes > restaurant");
  
  //router.use('/restaurant', restaurant({ config, db }));
  
});

module.exports = router;