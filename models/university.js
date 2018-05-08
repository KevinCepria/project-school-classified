var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");

var UniversitySchema = new mongoose.Schema({
    name: String,
    acronym: String,
    color: String
});


module.exports = mongoose.model("University", UniversitySchema, 'university');
