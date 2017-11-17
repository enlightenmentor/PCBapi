const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }]
});
const Build = mongoose.model('Build', buildSchema);

module.exports = Build;