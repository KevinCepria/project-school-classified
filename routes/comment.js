var express = require("express");
var router = express.Router();
var Comment = require ("../models/comment");
var Post = require ("../models/post");
var middleware = require("../middleware");

//adding comment process
router.post("/files/:university/:id/comments", middleware.isLoggedIn, function(request, response){
     
     Post.findById(request.params.id).exec(function(error, post){
          if(error){
              console.log(error);
             
          }
          else {

              request.body.comment.content = request.sanitize(request.body.comment.content);
              var formData = request.body.comment
              Comment.create(formData, function(error, comment){
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
                        comment.post.id = post._id;
                        comment.post.uniAcronym = post.university.acronym;
                        comment.post.title = post.title;
                        comment.save();
                        
                        post.comments.push(comment);
                        post.save();
                        
                        if(request.xhr){
                            
                            response.json(comment);
                            
                        } 
                        else {
                            
                            response.redirect("/files/"+request.params.university+"/"+request.params.id)
                        }
                        
                        
                   }
                  
              });
          }
         
     });
    
});

//editing delete process
router.delete("/files/:university/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(request, response){
   
    
     Post.findById(request.params.id).exec(function(error, post){
          if(error){
                  console.log(error)
          }
          else{
                   Comment.findByIdAndRemove(request.params.comment_id, function(error){
                   if(error){
                       console.log(error)
                   } else {
                       console.log("success")
                       
                       var index = post.comments.findIndex(function(v){
                             return v == request.params.comment_id;
                        });
   
                        post.comments.splice(index,1);
                        post.save();
                       
                        response.json(null);
                   }
                });
                          
          }
     });
    
});


//updating comment process
router.put("/files/:university/:id/comments/:comment_id", middleware.checkCommentOwnerShip, function(request, response){
       Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment,{new:true}, function(error, updatedComment){
          if(error){
              console.log(error)
          } else {
              
              (request.xhr)? response.json(updatedComment.content) : response.redirect("/files/"+request.params.university+"/"+request.params.id)
              
          }
       });
   
});



module.exports = router;

