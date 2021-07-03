const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://mongo:27017/sdc', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongo connected!')
});

const questionSchema = Schema({
  id:Number,
  product_id: Number,
  body: String,
  date_written: Number,
  asker_name: String,
  asker_email: String,
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
}, { timestamps: true });

const answerSchema = Schema({
  id:Number,
  question_id: Number,
  body: String,
  date_written: Number,
  answerer_name: String,
  answerer_email: String,
  reported: { type: Number, default: 0 },
  helpful: { type: Number, default: 0 },
  photos: [{
    url: String
  }]
}, { timestamps: true });

const Answer =  mongoose.model('Answerscombine', answerSchema, 'answerscombines');
const Question = mongoose.model('Question', questionSchema);

// dev start
const getQuestionsById = (id, count, page, callback) => {
  const start = ( Number(page) * Number(count) ) - Number(count) || 0;
  const end = Number(count) || 6;
  Question.aggregate().match({product_id: id, reported:0}).skip(start).limit(end).exec((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const getAnswersByQuestionId = (id, count, page, callback) => {
  const start = ( Number(page) * Number(count) ) - Number(count) || 0;
  const end = Number(count) || 6;
  Answer.aggregate().match({question_id: id, reported:0}).skip(start).limit(end).exec((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const addNewQuestion = (quest, callback) => {
  Question.aggregate().sort({id:'desc'}).limit(1).exec((err, data) =>{
    if (err) {
      callback(err, null);
    } else {
      const questionId = data[0].id + 1;
      const newQuestion = new Question ({
        id:Number(questionId),
        product_id: Number(quest.product_id),
        date_written: Date.now(),
        body: quest.body,
        asker_name: quest.name,
        asker_email: quest.email,
      });

      newQuestion.save( (err, data) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    }
  });
};

const addNewAnswer = (answ, callback) => {
  Answer.aggregate().sort({id:'desc'}).limit(1).exec((err, data) =>{
    if (err) {
      callback(err, null);
    } else {
      const answerId = data[0].id + 1;
      const newAnswer = new Answer ({
        id:Number(answerId),
        question_id: Number(answ.question_id),
        body: answ.body,
        date_written: Date.now(),
        answerer_name: answ.answerer_name,
        answerer_email: answ.answerer_email,
        photos: answ.photos,
      });

      newAnswer.save((err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
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

module.exports = {
  getQuestionsById,
  getAnswersByQuestionId,
  addNewQuestion,
  addNewAnswer,
  markQuestionHelpful,
  reportQuestion,
  markAnswerHelpful,
  reportAnswer,
};