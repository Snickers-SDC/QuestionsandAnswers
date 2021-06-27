const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/sdc', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});

const answerSchema = Schema({
  question_id: Number,
  body: String,
  answerer_name:String,
  answerer_email: String,
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
  photos: [{
    id: Number,
    url: String
  }]
}, { timestamps: true })

const Answer = mongoose.model('Answerscombine', answerSchema, 'answerscombines');

const questionSchema = Schema({
  product_id: Number,
  body: String,
  asker_name: String,
  asker_email: String,
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
}, { timestamps: true });



const Question = mongoose.model('Question', questionSchema, 'questions');

// dev start
const getQuestionsById = (id, callback) => {
  Question.find({product_id: id, reported: 0}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const getAnswersByQuestionId = (id, callback) => {
  Answer.find({question_id: id, reported: 0}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addNewQuestion = (quest, callback) => {
  const newQuestion = new Question ({
    product_id: quest.product_id,
    body: quest.body,
    asker_name: quest.asker_name,
    asker_email: quest.asker_email,
  });

  Question.save(newQuestion, (err, data) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addNewAnswer = (answ, callback) => {
  const newAnswer = new Answer ({
    question_id: answ.question_id,
    body: answ.body,
    answerer_name: answ.answerer_name,
    answerer_email: answ.answerer_email,
    photos: answ.photos,
  });

  Answer.save(newAnswer, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const markQuestionHelpful = (id, callback) => {
  Question.findOneAndUpdate({id: id}, { $inc: {helpful: 1}}, {new: true}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const reportQuestion = (id, callback) => {
  Question.findOneAndUpdate({id: id}, { $inc: {reported: 1}}, {new: true}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const markAnswerHelpful = (id, callback) => {
  Answer.findOneAndUpdate({id: id}, { $inc: {helpful: 1}}, {new: true}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const reportAnswer = (id, callback) => {
  Answer.findOneAndUpdate({id: id}, { $inc: {reported: 1}}, {new: true}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.export = {
  getQuestionsById,
  getAnswersByQuestionId,
  addNewQuestion,
  addNewAnswer,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
}