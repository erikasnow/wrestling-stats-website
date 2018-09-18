var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , sql  = require('sqlite3')
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
      case '/read':
        read(res);
        break
      case '/update':
        update(res, req);
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
  console.log("entered read function")
  var matches = [];
  db.each(
    "SELECT id, redName, redScore, greenName, greenScore, winner, winType FROM matches",  // database query
    function(err, row) { 
      matches.push(row) 
      console.log("current matches: " + row)}, // called for each row returned
    function() { res.end( JSON.stringify(matches) ) } // called last
  )
  console.log("exited read function");
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
    process( JSON.parse(body) )
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
      function(err) { res.end('match updated') }
    )
  }
}