# https://kana-quizzer.herokuapp.com/kana

(based on Heroku's node-js-getting-started)

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

# dj notes

## Resources I found useful while customizing this:

- [Extracting Express POST API data](http://hawkee.com/snippet/10141/)
- [how i can send data from html form to node.js function](http://stackoverflow.com/questions/15568851/how-i-can-send-data-from-html-form-to-node-js-function)
- [TypeError: Cannot call method 'query' of null](http://stackoverflow.com/questions/24224142/typeerror-cannot-call-method-query-of-null-when-calling-pg-connect-with-her)

## History of this project

- cloned the Heroku sample app
- started modifying it
- renamed it on heroku (only on first machine): `heroku apps:rename kana-quizzer`
- turned on PaperTrail's permanent log archiving: https://papertrailapp.com/account/archives
- had Github make it a standalone repo instead of a fork
- renamed repo from node-js-getting-started to node-js-kana-quizzer from github web UI
- renamed repo from command line: `mv -i node-js-getting-started node-js-kana-quizzer`
- fixed up remotes from command line: `git remote set-url origin git@github.com:davejagoda/node-js-kana-quizzer.git`
- renamed heroku git remote (only on 2nd and subsequent machines): `heroku git:remote -a kana-quizzer`
- appended "?ssl=true" to DATABASE_URL to allow connnecting to Heroku database
