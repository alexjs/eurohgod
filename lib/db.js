var databaseURI = "localhost:27017/eurohgod";
var collections = ["rules", "actions", "users", "event", "entries"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;
