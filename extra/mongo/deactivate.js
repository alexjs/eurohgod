// Check what the current Active entry is
activeEntry=db.entries.findOne({active: 1});
// Make current entry inactive, record its timestamp
db.entries.update({ active: 1}, { $set: {ts_end: (new Date).getTime(), active: 0}});
