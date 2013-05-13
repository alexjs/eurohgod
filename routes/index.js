
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
    if( err ) {
      console.log("No drinks found");
    }
    else { 
      db.drinks.aggregate([{ $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalDrinksList) {
        if( err ) {
          console.log("Unable to aggregate drinks list");
        }
        else { 
          res.render('index', { title: 'Eurovision Drinkalong', globalDrinksList: globalDrinksList, globalDrinksCount: format_number(globalDrinksCount)});
        }
      });
    }
  });
};