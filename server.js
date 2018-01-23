var http       = require('http');
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var routes     = require('./routes');
var config     = require('./config');

/***************************/
/*** Config App ************/
/***************************/

var app = express();

app.server = http.createServer(app);
app.use(express.static('public'));
app.use(bodyParser.json({ limit: config.bodyLimit }));
app.use(bodyParser.urlencoded({ extended: true }));

/***************************/
/*** Routes ****************/
/***************************/

app.use('/api/restaurant', require('./routes/restaurant'));
app.use('/api/foodtruck', require('./routes/foodtruck'));

/***************************/
/*** END: Routes ***********/
/***************************/

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;