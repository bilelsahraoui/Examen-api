/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server launched on port ${process.env.APP_PORT}`);
});

mongoose.set('strictQuery', true);
mongoose.set('strictPopulate', false);
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
).then(() => {
  console.log('successfully connected to the database');
}).catch((err) => console.log(err));
