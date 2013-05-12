
/*
 * GET home page.
 */

exports.index = function(req, res){
  var db = require("../lib/db");

  if (!req.session.drinks) { req.session.drinks = 0; drinks = 0;}
  if (!req.session.rulesPlayed) { req.session.rulesPlayed = []; }

  if (req.session.message) {
    message = req.session.message;
    req.session.message = null;
  } else {
    message = false;
  }

  drinks = req.session.drinks;
  db.drinks.count({}, function(err, globalDrinksCount) {
    if( err || !globalDrinksCount) {
      console.log("No drinks found");
    }
    else { 
      res.render('index', { title: 'Eurovision Drinkalong', globalDrinksCount: format_number(globalDrinksCount)});
    }
  });
};