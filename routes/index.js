
/*
 * GET home page.
 */

exports.index = function(req, res){
  var db = require("../lib/db");

  if (!req.session.actions ) { req.session.actions = 0; actions = 0;}
  if (!req.session.rulesPlayed) { req.session.rulesPlayed = []; }

  if (req.session.message) {
    message = req.session.message;
    req.session.message = null;
  } else {
    message = false;
  }

  actions = req.session.actions;
  db.actions.count({}, function(err, globalActionsCount) {
    if( err ) {
      console.log("No actions found");
    }
    else { 
      db.actions.aggregate([{ $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalActionsList) {
        if( err ) {
          console.log("Unable to aggregate actions list");
        }
        else { 
          res.render('index', { title: 'EurOhGod - The Eurovision Drinking Game', globalActionsCount: format_number(globalActionsCount)});
        }
      });
    }
  });
};