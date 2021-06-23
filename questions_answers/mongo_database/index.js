const mongoose = require('mongoose');
const config = require ('../config.js');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to the database!')
});

const questionSchema = Schema({
  body: String,
  name: String,
  email: String,
  product_id: String,
  helpfulness: Number,
  reported: Boolean,
  answers: [{
    body: String,
    name:String,
    email: String,
    helpfulness: Number,
    reported: Boolean,
    photos: [{
      url: String
    }]
  }]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);