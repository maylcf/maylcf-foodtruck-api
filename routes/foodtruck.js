var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var FoodTruck  = require('../model/foodtruck');
var Review     = require('../model/review');
var database   = require('../db.js');

var router = express.Router();
var connection = database();

/************************/
/** Get all FoodTrucks **/
/************************/

router.get('/', (req, res) => {
  FoodTruck.find({}, (err, foodtrucks) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(foodtrucks);
  });
});

/******************************/
/** Get a Specific FoodTruck **/
/******************************/

router.get('/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(foodtruck);
  });
});

/***************************/
/*** Add New FoodTruck *****/
/***************************/

router.post('/add', (req, res) => {
  
  let newFoodTruck = new FoodTruck();
  
  newFoodTruck.name = req.body.name;
  newFoodTruck.foodtype = req.body.foodtype;
  newFoodTruck.avgcost = req.body.avgcost;
  newFoodTruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
  newFoodTruck.geometry.coordinates.long = req.body.geometry.coordinates.long;

  newFoodTruck.save(err => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'FoodTruck saved successfully' });
  });
});

/***************************/
/*** Update a FoodTruck ****/
/***************************/

router.put('/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    foodtruck.name = req.body.name;
    foodtruck.foodtype = req.body.foodtype;
    foodtruck.avgcost = req.body.avgcost;
    foodtruck.geometry.coordinates.lat = req.body.geometry.coordinates.lat;
    foodtruck.geometry.coordinates.long = req.body.geometry.coordinates.long;
    
    foodtruck.save(err => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "FoodTruck info updated"});
    });
  });
});

/***************************/
/*** Delete a FoodTruck ****/
/***************************/

router.delete('/:id', (req, res) => {
  
  var id = req.params.id;
  
  FoodTruck.findById(id, (err, foodtruck) => {
    
    // Check for errors
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    // Check if FoodTruck exists
    if (foodtruck == null) {
      res.status(404).send("FoodTruck not found.");
      return;
    }
    
    // Remove Foodtruck
    FoodTruck.remove({ _id: id }, (err, foodtruck) => {
      
      // Check for errors
      if (err) {
        res.status(500).send(err);
        return;
      }
      
      Review.remove({ foodtruck: id }, (err, review) => {
        
        // Check for errors
        if (err) {
          res.status(500).send(err);
          return;
        }
        
        res.json({ message: "FoodTruck Successfully Removed!"});
        
      }); 
    }); 
  });
});

/**********************************/
/*** Add a Review to a FoodTruck **/
/**********************************/

router.post('/reviews/add/:id', (req, res) => {
  FoodTruck.findById(req.params.id, (err, foodtruck) => {
    
    if (err) {
      res.status(500).send(err);
      return;
    }

    // Create the new review
    let newReview = new Review();
    newReview.title = req.body.title;
    newReview.text = req.body.text;
    newReview.foodtruck = foodtruck._id;

    // Save the new review
    newReview.save((err, review) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      // Add the new Review into the foodtruck array of reviews
      foodtruck.reviews.push(newReview._id);
      foodtruck.save(err => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        
        res.json({ message: 'Food truck review saved!' });
        
      });
    });
  });
});

/*************************************/
/*** See all reviews of a FoodTruck **/
/*************************************/

router.get('/reviews/:id', (req, res) => {
  Review.find({foodtruck: req.params.id}, (err, reviews) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(reviews);
  })
});

router.get('/foodtype/:foodtype', (req, res) => {
  FoodTruck.find({ foodtype: req.body.foodtype}, (err, foodtrucks) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(foodtrucks);
  });
});


/***************************/
/*** Export ****************/
/***************************/

module.exports = router;