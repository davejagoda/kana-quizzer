const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool ( {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} );
const kana = require('./kana');
const bodyParser = require('body-parser');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: true} ))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null };
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  } )
  .get('/kana', function(request, response) {
    // the choice of kana is a combination of a specific row (the a i u e o order)
    // and a syllabary (hiragana or katakana)
    var choice = kana.kana[Math.floor(Math.random() * kana.kana.length)][Math.floor(Math.random() * 2 + 1)];
    console.log('choice:' + choice);
    response.render('pages/kana_get', {choice: choice} );
  } )
  .post('/kana', function(request, response) {
    console.log('userinput: ' + request.body.userinput);
    console.log('genkana: ' + request.body.genkana);
    console.log('userinput === genkana? ' + kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana));
    response.render('pages/kana_post', {correct: kana.kanaMatched(request.body.userinput, request.body.genkana, kana.kana) } );
  } )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
