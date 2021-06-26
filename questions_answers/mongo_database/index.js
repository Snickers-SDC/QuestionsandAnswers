const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});

const answersSchema = Schema({
  body: String,
  name:String,
  email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [{
    url: String
  }]
})

const Answers = mongoose.model('Question', answersSchema);

const questionSchema = Schema({
  body: String,
  name: String,
  email: String,
  product_id: String,
  helpfulness: Number,
  reported: Boolean,
  answers: { type: mongoose.ObjectId, ref: Answers }
}, { timestamps: true });



const Question = mongoose.model('Question', questionSchema);
