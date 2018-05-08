var express = require("express");
var Reply = require ("../models/reply");
var router = express.router();
var Comment = require ("../models/comment");
var Post = require ("../models/post");
var middleware = require("../middleware");

//adding reply process
router.post("/files/:university/:id/comments/:comment_id/reply", middleware.isLoggedIn, function(request, response){
     
     Comment.findById(request.params.comment_id).exec(function(error, post){
          if(error){
              console.log(error);
             
          }
          else {

              request.body.comment.content = request.sanitize(request.body.comment.content);
              var formData = request.body.comment
              var data = [];
              Reply.create(formData, function(error, comment){
                   if(error){
                       
                        let errorMsg = {errors:error.errors.content.message};
                        
                        if(request.xhr){
                            
                            response.json(errorMsg);
                        }
                        else{
                           request.flash("error", errorMsg);
                           response.redirect("/files/"+request.params.university+"/"+request.params.id);
                        }
                        
                   }
                   else{
                        comment.creationDate = Date.now();
                        comment.author.id = request.user.id;
                        comment.author.username= request.user.username;
                        comment.save();
                        
                        post.comments.push(comment);
                        post.save();
                        
                        if(request.xhr){
                            
                            data.push(comment);
                            data.push(post.university.acronym);
                            response.json(data);
                            
                        } 
                        else {
                            
                            response.redirect("/files/"+request.params.university+"/"+request.params.id)
                        }
                        
                        
                   }
                  
              });
          }
         
     });
    
});

//editing reply process

//deleting reply process


module.export = router;
