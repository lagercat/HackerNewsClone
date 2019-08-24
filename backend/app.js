const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,'+
                'Content-Type, Accept, Authorizations');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET,' +
                'POST, PUT, PATCH, OPTIONS');
  next();
});

app.use('/api/users', usersRoutes);

module.exports.app = app;
