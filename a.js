const db = require('./db');

db.any('SELECT * FROM my_table')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });