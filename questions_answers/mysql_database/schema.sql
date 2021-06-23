DROP DATABASE IF EXISTS questions_answers;
CREATE DATABASE questions_answers;

USE questions_answers;

CREATE TABLE questions (
  id INT AUTO_INCREMENT,
  body VARCHAR(1000),
  _name VARCHAR(255),
  email VARCHAR(255),
  product_id INT,
  helpfulness INT,
  reported TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT,
  body VARCHAR(1000),
  _name VARCHAR(255),
  email VARCHAR(255),
  helpfulness INT,
  reported TINYINT,
  questions_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (questions_id) REFERENCES questions(id)
);

CREATE TABLE answers_photos (
  id INT AUTO_INCREMENT,
  _url VARCHAR(255),
  answers_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (answers_id) REFERENCES answers(id)
);