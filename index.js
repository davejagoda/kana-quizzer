var pg = require('pg');
var kana = require('./kana');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/db', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
        { console.error(err); response.send("Error " + err); }
      else
        { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.get('/kana', function(request, response) {
    var choice = Math.floor(Math.random() * kana.kana.length);
    response.render('pages/kana', {choice: choice} );
//  var preamble = '<!doctype html>\n<html>\n<head>\n<title>kana</title>\n<meta charset="utf-8" />\n<meta name="viewport" content="width = device-width" />\n</head>\n<body>\n<h1>';
//var postamble = '</h1>\n<form method="post">\n<input type="text" name="userinput">\n<input type="submit">\n</form>\n</body>\n</html>';
//  var midamble = '</h1>\n<form method="post">\n<input type="text" name="userinput" autocomplete="off">\n<input type="hidden" name="genkana" value="';
//  var postamble = '">\n<input type="submit" value="Check your answer">\n</form>\n</body>\n</html>';
//  var choice = Math.floor(Math.random() * kana.kana.length);
//  var syllabary = Math.floor(Math.random() * 2 + 1);
//  response.send(preamble + kana.kana[choice][syllabary] + midamble + kana.kana[choice][syllabary] + postamble)
//kana.kana[choice][syllabary] + ':' + choice + ':' + syllabary);
});

app.post('/kana', function(request, response) {
	//  console.log(request.body.userinput);
	//  console.log(request.body.genkana);
	//  response.send('You sent this body "' + request.body.userinput + '". This was hidden "' + request.body.genkana + '".');
  console.log(kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana));
  var preamble = '<!doctype html>\n<html>\n<head>\n<title>kana</title>\n<meta charset="utf-8" />\n<meta name="viewport" content="width = device-width" />\n</head>\n<body>\n<h1>';
  //  var postamble = '</h1>\n<a href="/kana">Next</a>\n</body>\n</html>';
  var postamble = '</h1>\n<form method="get">\n<next="/kana">\n<input type="submit" value="Next">\n</form>\n</body>\n</html>';
  var midamble;
  if (kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana)) {
    midamble = 'Correct!';
  } else {
    midamble = 'Wrong!';
  }
  response.send(preamble + midamble + postamble);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
