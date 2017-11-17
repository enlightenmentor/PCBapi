const express = require('express');
const router = express.Router();
const getCompInfo = require('../modules/get-comp-info');
const Component = require('../models/Component');

// Add new component
router.post('/', async (req, res) => {
  try {
    const rId = req.body.rId;
    const component = await Component.findOne({rId: rId});
    if (component === null) {
      let compInfo = await getCompInfo(rId);
      let newComponent = new Component({
        rId: component.id,
        title: component.title,
        type: component.parent_title,
        producer: component.producer,
        available: component.sell_status == 'available' ? true : false,
        price: component.price
      });
      await newComponent.save();
      res.send({
        success: true
      });
    } else {
      throw new Error('Component already exists!');
    }
  } catch(err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

// Fetch all components
router.get('/', async (req, res) => {
  try {
    const components = await Component.find({});
    res.send(components);
  } catch(err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
});

// Fetch single post
router.get('/:_id', async (req, res) => {
  try {
    const component = await Component.findById(req.params._id);
    res.send(component);
  } catch(err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

// Delete a post
router.delete('/:_id', async (req, res) => {
  try {
    await Component.remove({_id: req.params._id });
    res.send({
      success: true
    });
  } catch(err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

module.exports = router;