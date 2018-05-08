var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Post = require("../models/post");
var middleware = require("../middleware");

//route for displaying all posts (homepage)
router.get("/files",function(request, response){
    Post.find({}).sort({creationDate: 'descending'}).exec(function(error, posts){
        if(error){
            console.log(error)
        }
        else{
             response.render("post/index",{posts:posts});
        }
    });
 
});

//add post form 
router.get("/files/new",middleware.isLoggedIn,function(request, response){
    response.render("post/new")
});

//route for displaying all posts of a unviersity
router.get("/files/:university",function(request, response){
    Post.find({'university.acronym':request.params.university}).sort({creationDate:'descending'}).exec(function(error, posts){
        if(error){
            console.log(error)
        }
        else{
             response.render("post/index",{posts:posts});
        }
    });
 
});

//route for displaying the page of a post
router.get("/files/:university/:id",function(request, response){
    Post.findById(request.params.id).populate({path:'comments',options:{sort:{creationDate:'descending'}}}).exec(function(error, post){
         if(error)console.log(error)
         else response.render("post/show", {post:post})
    });
});


//add post process
router.post("/files", middleware.isLoggedIn,function(request, response){
    request.body.title = request.sanitize(request.body.title);
    request.body.content = request.sanitize(request.body.content);
    var post = {
            title : request.body.title,
            content : request.body.content,
            author : {
                id : request.user.id,
                username: request.user.username
            },
            university : {
                id: request.user.university.id,
                name: request.user.university.name,
                acronym:  request.user.university.acronym,
           },
           creationDate: Date.now()
    }
    
    Post.create(post,function(error, createdPost){
          if(error){
              let err = error.errors.title ||  error.errors.content ;
              request.flash("error", err.message);
              response.redirect("back")
           }
          else{
              response.redirect("/files/"+ createdPost.university.acronym + "/"+ createdPost._id);
          } 
    });
});

//edit post form
router.get("/files/:university/:id/edit", middleware.checkPostOwnerShip, function(request, response){
    
    
    
});

// edit post process
router.put("/files/:university/:id", middleware.checkPostOwnerShip, function(request, response){
    
});

//delete post process
router.delete("/files/:university/:id", middleware.checkPostOwnerShip, function(request, response){
    Post.findById(request.params.id, function(error){
        if(error) console.log(error)
        else{
         response.redirect("/files");
        }
    });
});

module.exports = router;
