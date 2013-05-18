
// Find out which entry was active last
var lastActiveCursor=db.entries.find({active: 0, ts_end: { $exists:true } } ).sort({ts_end: -1}).limit(1);
var lastActive=lastActiveCursor.hasNext() ? lastActiveCursor.next() : null;

// Find out what the next entry should be
nextEntry=db.entries.findOne({_id: lastActive._id+1});

// Make it live
db.entries.update({ _id: nextEntry._id}, { $set: {ts_start: (new Date).getTime(), active: 1}});


