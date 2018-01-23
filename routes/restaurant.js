var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Restaurant = require('../model/restaurant');
var database   = require('../db.js');

var router = express.Router();
var connection = database();

/***************************/
/*** Routes ****************/
/***************************/

router.get('/', function(req, res){
  res.json({ message: 'Hi from  routes > Restaurant' });
});

// Add new restaurant => 'api/restaurants/add'

router.post('/add', function(req, res){
  console.log("#Controller/restaurant.js : add");
  let newRestaurant = new Restaurant();
    newRestaurant.name = req.body.name;
    newRestaurant.save( err => {
      
      if (err) {
        res.send(err);
      }
      
      res.json({ message: 'Restaurant saved!' });
      
    });
});

/***************************/
/*** Export ****************/
/***************************/

module.exports = router;