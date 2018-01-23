const mongoose = require('mongoose');

console.log("#DB");

module.exports = function() {
  //mongoose.Promise = global.promise;
  let db = mongoose.connect(process.env.MONGO_URI);
  return db;
}

