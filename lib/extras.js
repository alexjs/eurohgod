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


updateCount = function(req){

  var db = require("./db");
  var _ = require('underscore')
  var session = req.session;
  req.session.actions = req.session.actions + 1;

  if (req.body.rule_id) {
    var rule_num = Number(req.body.rule_id);
    if (req.session.rulesPlayed) {
            // Check to see whether the input is valid
            if (!isNaN(rule_num)) {
              if (_.where(rules, {id: rule_num})) { 
                var matchedRule = _.findWhere(rules, {id: rule_num} )
                req.session.rulesPlayed.push(rule_num);
                req.session.message = { 'rule': matchedRule.name, 'text': matchedRule.msg, 'type': matchedRule.type};
                    // If we got all the way here, then grab a current timestamp purely for stats purposes
                    // This duplicates info that's in ObjectId, but is much easier to query
                    var currentTime = (new Date).getTime()
                    db.actions.save({rule: matchedRule.id, rule_name: matchedRule.name, type: matchedRule.type, timestamp: currentTime})
              }
            }
    }
  }
}

