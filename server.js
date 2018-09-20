var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , sql = require('sqlite3')
  , port = 8080;

// db setup
var db = new sql.Database('tournament.sqlite');

var server = http.createServer(function (req, res) {
  var uri = url.parse(req.url)

  switch (uri.pathname) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      sendFile(res, 'index.html')
      break
    case '/crud.js':
      sendFile(res, 'crud.js', 'text/javascript')
      break
    case '/extra.js':
      sendFile(res, 'extra.js', 'text/javascript')
      break
    case '/read':
      read(res);
      break
    case '/update':
      update(res, req);
      break
    case '/create':
      create(res, req);
      break
    case '/delete':
      del(res, req);
      break
    case '/getWrestlerInfo':
      getWrestlerInfo(res, req);
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080');

/*------subroutines-------*/
function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function (error, content) {
    res.writeHead(200, { 'Content-type': contentType })
    res.end(content, 'utf-8')
  })
}

// common technique for a 'unique' alphanumeric id 
function new_id() {
  return Date.now().toString(36)
}

// read all data from database and send to res
function read(res) {
  var matches = [];
  db.each(
    "SELECT id, redName, redScore, greenName, greenScore, winner, winType FROM matches",  // database query
    function (err, row) {
      matches.push(row)
      console.log("current matches: " + row)
    }, // called for each row returned
    function () { res.end(JSON.stringify(matches)) } // called last
  )
}

var wrestler = {};
// get specific wrestler's info
function getWrestlerInfo(res, req) {
  console.log("grabbing wrestler info");
  console.log("json: " + req);

  //process incoming data
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()

    //need to get the wrestler name from the request
    wrestler = JSON.parse(body); //something wrong with this line
    console.log('wrestler: ' + wrestler.name);
    //need to filter all rows with wrestler name as winner
    var points = 0;
    var wrestlerData = {};
    db.each(
      `SELECT winType FROM matches WHERE winner = '${wrestler.name}'`,
      function (err, row) {
        switch (row.winType) {
          case 'Pin':
            points += 6;
            break
          case 'Technical Pin':
            points += 5;
            break
          case 'Major':
            points += 4;
            break
          case 'Minor':
            points += 3;
            break
          default:
            break
        }
        console.log("current points: " + points);
      }, //called for each row returned
      function () {
        wrestlerData.name = wrestler.name;
        wrestlerData.points = points;
        res.end(JSON.stringify(wrestlerData));
      } // called last
    )
  })
}

// update specific line in database, using info in req, the request from the client
function update(res, req) {
  console.log("updating database");
  //process incoming data
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process(JSON.parse(body))
    res.end()
  })

  function process(row) {
    console.log("made it into the process function")
    console.log("row: " + JSON.stringify(row));
    var query = `
      UPDATE matches 
      SET redName  = '${row.redName}',
          redScore = '${row.redScore}',
          greenName = '${row.greenName}',
          greenScore = '${row.greenScore}',
          winner = '${row.winner}',
          winType = '${row.winType}'
      WHERE
          id = '${row.id}'
    `
    db.run(
      query,
      function (err) { res.end('match updated') }
    )
  }
}

function create(res, req) {
  console.log("creating new match in database");
  //process incoming data
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process(JSON.parse(body))
    res.end()
  })

  function process(row) {
    console.log("made it into the process function")
    console.log("row: " + JSON.stringify(row));
    var query = `
        INSERT INTO matches (id, redName, redScore, greenName, greenScore, winner, winType)
        VALUES ('${new_id()}', '${row.redName}', '${row.redScore}', '${row.greenName}', 
          '${row.greenScore}', '${row.winner}', '${row.winType}');
      `
    db.run(
      query,
      function (err) { res.end('match created') }
    )
  }
}

function del(res, req) {
  console.log("deleting match in database");
  //process incoming data
  let body = []
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    process(JSON.parse(body))
    res.end()
  })

  function process(row) {
    console.log("made it into the process function")
    console.log("row: " + JSON.stringify(row));
    var query = `
        DELETE FROM matches
        WHERE id = '${row.id}';
      `
    db.run(
      query,
      function (err) { res.end('match deleted') }
    )
  }
}