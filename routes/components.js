const express = require('express');
const router = express.Router();
const admin = require('../modules/firebase-admin');
const getCompInfo = require('../modules/get-comp-info');
const Component = require('../models/Component');

// Add new component
router.post('/', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const user = await verifyUser(authHeader);
    const rId = req.body.rId;
    const component = await Component.findOne({ rId: rId });
    if (component === null) {
      let compInfo = await getCompInfo(rId);
      let newComponent = new Component({
        rId: compInfo.id,
        title: compInfo.title,
        type: compInfo.parent_title,
        producer: compInfo.producer,
        available: compInfo.sell_status == 'available' ? true : false,
        price: compInfo.price
      });
      await newComponent.save();
      res.send({
        success: true,
        component: newComponent
      });
    } else {
      throw new Error('Component already exists!');
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

// Fetch all components
router.get('/', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const user = await verifyUser(authHeader);
    const components = await Component.find({});
    res.send(components);
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
});

// Fetch single component
router.get('/:_id', async (req, res) => {
  try {
    const component = await Component.findById(req.params._id);
    res.send(component);
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

// Delete a component
router.delete('/:_id', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    const user = await verifyUser(authHeader);
    await Component.remove({ _id: req.params._id });
    res.send({
      success: true
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

async function verifyUser(authHeader) {
  if (!authHeader)
    throw new Error('You have no admin rights');
  const token = authHeader.substr(7);
  const user = await admin.auth().verifyIdToken(token);
  if (!user)
    throw new Error('You have no admin rights');
  return user;
}

module.exports = router;