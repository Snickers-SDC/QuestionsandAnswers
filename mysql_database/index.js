const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'questions_answers',
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL connected');
  }
});

module.exports = db;
