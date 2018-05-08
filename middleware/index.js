var Post = require("../models/post");
var Comment = require("../models/comment");
var Reply = require("../models/reply");

var middleware = {};

//middleware for checking post ownership
middleware.checkPostOwnerShip =  function(request, response, next){
    if(request.isAuthenticated()){
        Post.findById(request.params.id, function(error, post){
            if(error){
                //error handle
            }
            else {
                if(post.author.id.equals(request.user._id)){
                     next();
                }
                else{
                    //error handle
                }
            }
        });
    }
    else{
        response.redirect("/login");
    }
}

//middleware for checking comment ownership
middleware.checkCommentOwnerShip = function(request, response, next){
    if(request.isAuthenticated()){
        Comment.findById(request.params.comment_id).exec(function(error, comment){
            if(error){
                console.log(error)
            } else {
                
                if(comment.author.id.equals(request.user._id)){
                     next();
                } else{
                     response.redirect("back")
                }
            }
               
         })
    } else {
        
        response.redirect("back")
    }
}

//middleware for checking reply ownership
middleware.checkReplyOwnerShip = function(request, response, next){
    if(request.isAuthenticated()){
        Reply.findById(request.params.reply_id).exec(function(error, reply){
            if(error){
                console.log(error)
            } else {
                
                if(reply.author.id.equals(request.user._id)){
                     next();
                } else{
                     response.redirect("back")
                }
            }
               
         })
    } else {
        
        response.redirect("back")
    }
    
}

//middleware for checking if user is logged in
middleware.isLoggedIn = function(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    
    if(request.xhr){
        response.json({errors:"You need to be logged in to do that"})
                
    }
    else{
        request.flash("error", "You need to be logged in to do that");
        response.redirect("/login")
    }
        
       
}

//middleware for checking if user is not logged in
middleware.isNotLoggedIn = function(request, response, next){
    if(!request.isAuthenticated()){
        return next();
    }
        response.redirect("/files")
       
}

module.exports = middleware;