// Fetch stats
var db = require("../lib/db");

exports.fetch = function (req,res){
  //var data = fetchData();
  db.actions.aggregate([{ $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalActionsList) {
    if( err ) {
      console.log("Unable to aggregate actions list");
    }
    else { 
      res.render('stats', {layout: false, globalActionsList: globalActionsList});
    }
  });
}