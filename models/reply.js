var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var replySchema = mongoose.Schema({
    
    content: { type: String,
               required: [true, "Please type a reply"],
               trim: true,
            },
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    replies :[
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Reply"
          }
        
        ],
        
    creationDate: {
  
          type: Date,
          default: Date.now()
    }
    
});

module.exports = mongoose.model("Reply", replySchema);