// Fetch stats
// We gather them once but render twice. I don't think there's anything useful about this - so debate whether it's worth doing at all.
var db = require("../lib/db");

exports.fetch = function (req,res){ 
  var timeWindow = 600000 // 10m
  var aggregateTime = (new Date).getTime()-timeWindow
  db.actions.aggregate([{ $match: { timestamp: { $gt: aggregateTime } }  }, { $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalActionsList) {
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