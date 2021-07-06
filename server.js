const express = require('express');
const port = 8080;
const Mongodb = require('./mongo_database');
// const MySQLdb = require('./mysql_database');

const app = express();

app.use(express.json());

app.get('/questions', (req, res) => {
  const param = req.body;
  Mongodb.getQuestionsById(param.product_id, param.count, param.page, (err, data) => {
    if (err) {
      res.status(400).end(err);
    } else {
      res.send(data);
    }
  })
});

app.get('/questions/:question_id/answers', (req, res) => {
  const param = req.body;
  const id = req.params.question_id;
  Mongodb.getAnswersByQuestionId(Number(id), param.count, param.page, (err, data) => {
    if (err) {
      res.status(400).end(err);
    } else {
      res.send(data);
    }
  })
});

app.post('/questions', (req, res) => {
  Mongodb.addNewQuestion(req.body, (err, data) => {
    if(err) {
      res.status(400).end(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.post('/questions/:question_id/answers', (req, res) => {
  const id = req.params.question_id;
  req.body.question_id = Number(id);
  Mongodb.addNewAnswer(req.body, (err, data)=>{
    if(err) {
      res.status(400).end(err);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/questions/:question_id/helpful', (req, res) => {
  const id = req.params.question_id;
  Mongodb.markQuestionHelpful(Number(id), (err, data) => {
    if(err) {
      res.status(400).end(err);
    } else {
      res.sendStatus(204);
    }
  })
});

app.put('/answers/:answer_id/helpful', (req, res) => {
  const id = req.params.question_id;
  Mongodb.markAnswerHelpful(id, (err, data) => {
    if(err) {
      res.status(400).end(err);
    } else {
      res.sendStatus(204);
    }
  })
});

app.put('/answers/:answer_id/report', (req, res) => {
  const id = req.params.question_id;
  Mongodb.reportAnswer(id, (err, data) => {
    if(err) {
      res.status(400).end(err);
    } else {
      res.sendStatus(204);
    }
  })
})


app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
});