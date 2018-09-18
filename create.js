var sql = require('sqlite3');

// create database
var db = new sql.Database('tournament.sqlite');

db.serialize(function() {

  // making the table
  db.run("CREATE TABLE matches (id varchar(100), redName varchar(100), redScore integer, greenName varchar(100), greenScore integer, winner varchar(100), winType varchar(100))");

  // adding data
  db.run("INSERT INTO matches VALUES ('asdf123', 'E. Snow', 20, 'T. Dure', 4, 'E. Snow', 'Technical Pin')");
  db.run("INSERT INTO matches VALUES ('jkl321', 'R. Dorman', 4, 'E. Snow', 1, 'R. Dorman', 'Pin')");

  // verify we can query data
  db.each("SELECT id, redName, redScore, greenName, greenScore, winner, winType FROM matches", function(err, row) {
      console.log(JSON.stringify(row));
  });

});

db.close();