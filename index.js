const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./modules/mongo-connection');
const components = require('./routes/components');

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use('/components', components);
// app.use('/builds', builds);

const server = app.listen(process.env.PORT || 8081, () => {
  console.log(`Serving from: ${server.address().address}:${server.address().port}`)
})