var databaseURI = "localhost:27017/eurohgod";
var collections = ["rules", "drinks", "users", "event"];
var db = require("mongojs").connect(databaseURI, collections);

module.exports = db;

