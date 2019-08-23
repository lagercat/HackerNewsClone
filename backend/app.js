const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
mongoose.connect('mongodb+srv://sebastian:' + process.env.MONGO_URL + '@cluster0-eo40d.mongodb.net/test'
    , {useNewUrlParser: true})
    .then(() => {
      console.log('Connected to database!');
    })
    .catch((error) => {
      console.log(error);
      console.log('Connection failed!');
    });
*/
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

module.exports = app;
