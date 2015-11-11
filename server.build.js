// GLOBALS
'use strict';

var express = require('express');

var app = express();

var router = express.Router();
var apiRouter = express.Router();
var scriptRouter = express.Router();

var port = process.env.PORT || 80;

var routerOptions = { root: __dirname };

// MIDDLEWARE
router.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

// ROUTES
// index
router.get('/', function (req, res) {
  res.sendFile('html/index.html', routerOptions, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('loaded index');
    }
  });
});

// about
router.get('/about', function (req, res) {
  res.sendFile('html/about.html', routerOptions, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('loaded about');
    }
  });
});

// game
router.get('/game', function (req, res) {
  res.sendFile('html/game.html', routerOptions, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('loaded game');
    }
  });
});

// scripts
scriptRouter.get('/three.js', function (req, res) {
  res.sendFile('js/utils/three.js', routerOptions, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('loaded threejs');
    }
  });
});

scriptRouter.get('/game.build.js', function (req, res) {
  res.sendFile('js/build/game.build.js', routerOptions, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('loaded game');
    }
  });
});

// api
apiRouter.get('/', function (req, res) {
  res.send('api page');
});

// USER ROUTER
app.use('/', router);
app.use('/scripts', scriptRouter);
app.use('/api', apiRouter);

// START THE SERVER
app.listen(port);
console.log('listening on port ' + port);