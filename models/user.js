var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose");
var validator = require("validator");

var myPasswordValidator = function(password, cb) {
    if (!validator.isLength(password, 5, 20)) {
        return cb({message: "Password should be between 5 to 20 characters"});
    }
    else if ((/\s/.test(password) || !(/^[a-zA-Z0-9- ]*$/g.test(password)) )){
        return cb({message: "Spaces and special characters are not allowed"});
    }
    return cb(null);
}


var UserSchema = new mongoose.Schema({
    username:{ type: String,
               required: true,
               trim:true,
               minlength: [5,'Username can only have 5 to 20 characters'],
               maxlength: [20,'Username can only have 5 to 20 characters'],
               validate: {
                  validator: function(v) {
                    return !(/\s/.test(v) || !(/^[a-zA-Z0-9- ]*$/g.test(v)) );
                  },
                  message: 'Spaces and special characters are not allowed'
                },
               
    },
    password:{ type: String,
               trim:true,
    },
    university:{
         
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "University"
            },
         name: String,
         acronym: String
    }
});

UserSchema.plugin(passportLocalMongoose,{
    passwordValidator: myPasswordValidator
})

module.exports = mongoose.model("User", UserSchema);
