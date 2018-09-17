var http = require('http')
  , fs = require('fs')
  , url = require('url')
  , port = 8080;

var dataSet;

function grabData() {
/* gotta use the database for this part somehow
  var json = fs.readFileSync('public/includes/data.JSON');

  json = JSON.parse(json)
  dataSet = (json);
  */
}

grabData();

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url)
  
    switch (uri.pathname) {
      case '/':
        sendFile(res, 'index.html')
        break
      case '/index.html':
        sendFile(res, 'index.html')
        break
      case '/read':
        break
      case '/update':
        break
        /*
      case '/results.js':
        sendFile(res, 'results.js', 'text/javascript')
        break
      case '/form.html':
        sendFile(res, 'form.html')
        break
      case '/results.html':
        sendFile(res, 'results.html')
        break
        */
      case '/style.css':
        sendFile(res, 'style.css', 'text/css')
        break
        /*
      case '/data': //sends recieved data from client and puts in database
        var body = '';
        req.on('data', function (data) {
          body += data;
        });
        req.on('end', function () {
          var parsedData = (JSON.parse((body)));
          addHumanYears(parsedData);
          dataSet.push(parsedData)
          fs.writeFile('public/includes/data.JSON', JSON.stringify(dataSet, null, 2), function (err) {
            if (err) throw err;
          });
        });
        res.writeHead(
          200,
          { 'Content-type': 'text/html' }
        )
        res.end('post recieved');
        break
        */
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