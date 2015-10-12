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
// the choice of kana is a combination of a specific row (the a i u e o order)
// and a syllabary (hiragana or katakana)
  var choice = kana.kana[Math.floor(Math.random() * kana.kana.length)][Math.floor(Math.random() * 2 + 1)];
  console.log('choice:' + choice);
  response.render('pages/kana_get', {choice: choice} );
});

app.post('/kana', function(request, response) {
  console.log('userinput: ' + request.body.userinput);
  console.log('genkana: ' + request.body.genkana);
  console.log('userinput === genkana? ' + kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana));
  response.render('pages/kana_post', {correct: kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana) } );
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
