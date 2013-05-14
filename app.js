
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , csv = require('ya-csv')
  , jquery = require('jquery')
  , update = require('./routes/update')
  , redirect = require('./routes/redirect')
  , MongoStore = require('connect-mongo')(express)
  ;



require('./lib/extras');

var app = module.exports = express.createServer();

app.use(express.cookieParser());
app.use(express.session({ 
  secret: "help i am stuck in a cookieParser",
  maxAge: new Date(Date.now() + 86400000),
  store: new MongoStore({ db: "eurohgod" })
  }));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Errors

app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade');
    } else {
        next(err);
    }
});

// Load sites

rules = []
rulesPlayed = []
actions = 0


var db = require("./lib/db");
db.rules.find({}, function(err, rulesDb) {
  if( err || !rules) console.log("No rules found");
  else rulesDb.forEach( function(data) {
    rules.push( {
      'id':   data['_id'],
      'msg':  data['msg'],
      'name': data['name'],
      'type': data['type']
    });
  } );
});


// Routes

app.get('/', routes.index);
app.post('/submit', update.submit);
app.all('*', redirect.redirect);



var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
