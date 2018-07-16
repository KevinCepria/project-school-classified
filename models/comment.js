var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var commentSchema = mongoose.Schema({
    
    content: { type: String,
               required: [true, "Please type a comment"],
               trim: true,
            },
    post:{
        
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
            },
            uniAcronym: String,
            title: String,

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
         },
    
    likes: [
             {

                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }

                 
             }
        ],
        
    dislikes: [
        
              {

                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                username: String
                 
             }
        
        ],
    
});

module.exports = mongoose.model("Comment", commentSchema);