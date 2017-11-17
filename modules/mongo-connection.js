const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://enlightenmentor:AQuoislygeegif6@ds113435.mlab.com:13435/pc-builder-db', {
  useMongoClient: true
}).catch((err) => {
  throw err;
});

module.exports = mongoose.connection;