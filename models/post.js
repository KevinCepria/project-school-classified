var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var postSchema = mongoose.Schema({
    
    title:{ type: String,
            required: [true,'Please give your story a title'],
            trim:true,
          },
          
    content:{ type: String,
              required: [true,'Minimum number of characters not reached'],
              trim:true,
              minlength: [800,'Minimum number of characters not reached'],
              maxlength: [15000,'Maximum number of characters exceeded'],
            },
            
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    
    university:{
        
            id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "University"
            },
         name: String,
         acronym: String
    },
    
    comments :[
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"
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
                },
                username: String
                 
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


module.exports = mongoose.model("Post", postSchema);