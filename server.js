const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();

const port = 9000;

const migration = true;

app.use(bodyParser.json({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  if(migration) {
    require('./app/migrations')(app, database);
  }
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})
