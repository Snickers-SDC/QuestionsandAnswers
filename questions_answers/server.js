const express = require('express');
const port = 8080;
const Mongodb = require('./mongo_database');
const MySQLdb = require('./mysql_database');

const app = express();

app.use(express.json());

app.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Listening to port ${port}`);
});