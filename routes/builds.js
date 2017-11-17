const express = require('express');
const router = express.Router();
const Build = require('../models/Build');

// Add new component
router.post('/', async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const components = req.body.components;
    let newBuild = new Build({
      title: title,
      description: description,
      components: components
    });
    await newBuild.save();
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

// Fetch all components
router.get('/', async (req, res) => {
  try {
    const builds = await Build.find({});
    res.send(builds);
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
    const build = await Build.findById(req.params._id);
    await Build.populate(build, { path: 'components' });
    res.send(build);
  } catch(err) {
    res.status(500).send({
      success: false,
      error: err.message
    });
  }
})

// Update a post
router.put('/:_id', async (req, res) => {
  try {
    const build = await Build.findById(req.params._id);
    build.title = req.body.title;
    build.description = req.body.description;
    build.components = req.body.components;
    await build.save();
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

// Delete a post
router.delete('/:_id', async (req, res) => {
  try {
    await Build.remove({_id: req.params._id });
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