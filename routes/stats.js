// Fetch stats
var db = require("../lib/db");

exports.fetch = function (req,res){  
  db.actions.aggregate([{ $match: { timestamp: { $gt: 1368699159600 } }  }, { $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalActionsList) {
    if( err ) {
      console.log("Unable to aggregate actions list");
    }
    else { 
      if (req.route.path == '/stats-modal') {
        res.render('stats-modal', {layout: false, globalActionsList: globalActionsList});
      } else {
        res.render('stats', {layout: false, globalActionsList: globalActionsList});
      }
    }
  });
}