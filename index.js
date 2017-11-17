const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./modules/mongo-connection');
const getCompInfo = require('./modules/get-comp-info');
const Component = require('./models/Component');
const Build = require('./models/Build');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

// Add new component
app.post('/components', (req, res) => {
  const rId = req.body.rId;
  Component.findOne({rId: rId}).then((component) => {
    if (component === null) {
      getCompInfo(rId).then((component) => {
        const newComponent = new Component({
          rId: component.id,
          title: component.title,
          type: component.parent_title,
          producer: component.producer,
          available: component.sell_status == 'available' ? true : false,
          price: component.price
        });
        newComponent.save().then(() => {
          res.send({
            success: true,
            message: 'Component added successfully!'
          });
        });
      });
    } else {
      res.send({
        success: false,
        message: 'Component already exists!'
      });
    }
  });
})

// Fetch all components
app.get('/components', (req, res) => {
  Component.find({}).then((components) => {
    res.send(components)
  }).catch((err) => {
    console.error(err);
  })
});

// Fetch single post
app.get('/components/:_id', (req, res) => {
  Component.findById(req.params._id).then((component) => {
    res.send(component);
  }).catch((err) => {
    console.error(err);
  })
})

// Delete a post
app.delete('/components/:_id', (req, res) => {
  Component.remove({_id: req.params._id })
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch((err) => {
      res.send({
        success: true,
        message: err.message
      })
    })
})

const server = app.listen(process.env.PORT || 8081, () => {
  console.log(`Serving from: ${server.address().address}:${server.address().port}`)
})