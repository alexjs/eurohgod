
/*
 * GET home page.
 */

exports.nowplaying = function(req, res){
  var db = require("../lib/db");

  nowPlaying = {};
  db.entries.findOne({active: 1}, function(err, nowPlaying) {
    if( err ) {
      console.log("No actions found");
    } else {
      res.render('nowplaying', {layout: false, nowPlaying: nowPlaying});
    }
  });
};