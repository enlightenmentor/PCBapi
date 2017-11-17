const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  components: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Component'
  }]
});
const Build = mongoose.model('Build', buildSchema);

module.exports = Build;