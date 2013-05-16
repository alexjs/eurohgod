format_number = function(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

fetchData = function() {
  var db = require("./db");
  console.log("test");
  db.actions.aggregate([{ $group: { _id: "$rule", total : { $sum : 1 }}}], function(err, globalActionsList) {
    if( err ) {
      console.log("Unable to aggregate actions list");
    }
    else { 
      console.log("we got some data!")
      console.log(globalActionsList)
      return globalActionsList
    }
  })
};

updateCount = function(req){

  var db = require("./db");
  var session = req.session;
  req.session.actions = req.session.actions + 1;

  if (req.body.rule_id) {
    if (req.session.rulesPlayed) {
            // Check to see whether the input is valid
            if (!isNaN(req.body.rule_id-1)) {
              if (rules[req.body.rule_id-1]){ 
                req.session.rulesPlayed.push(req.body.rule_id);
                req.session.message = { 'rule': rules[req.body.rule_id-1].name, 'text': rules[req.body.rule_id-1].msg, 'type': rules[req.body.rule_id-1].type};
                    // If we got all the way here, then grab a current timestamp purely for stats purposes
                    // This duplicates info that's in ObjectId, but is much easier to query
                    var currentTime = (new Date).getTime()
                    db.actions.save({rule: rules[req.body.rule_id-1].id, rule_name: rules[req.body.rule_id-1].name, type: rules[req.body.rule_id-1].type, timestamp: currentTime})
                  }
                }
              }
            }
          }

