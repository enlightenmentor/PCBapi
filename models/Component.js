const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  rId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});
const Component = mongoose.model('Component', componentSchema);

module.exports = Component;