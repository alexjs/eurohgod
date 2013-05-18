// Find out what the next entry should be
nextEntry=db.entries.findOne();

// Make it live
db.entries.update({ _id: nextEntry._id}, { $set: {ts_start: (new Date).getTime(), active: 1}});


