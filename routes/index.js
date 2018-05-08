var express = require("express");
var router  = express.Router();
var passport = require("passport")
var User = require("../models/user");
var University = require("../models/university");
var middleware = require("../middleware");

//Redirect to files
router.get("/",function(request, response){
     response.redirect("/files")
});

//register form
router.get("/register", middleware.isNotLoggedIn, function(request, response){
     University.find({}).sort({name: 1}).exec(function(error, university){
         if(error)console.log(error)
         else  {
             response.render("register", {university:university});
         }
     })
});

//register process
router.post("/register", middleware.isNotLoggedIn, function(request, response){
     var university;
     var name= String(request.body.university).substring(0,String(request.body.university).indexOf("-")).trim();
     University.findOne({name:name}, function(error, regUniversity){
          if(error){
               request.flash("error", error.message);
               response.redirect("/register")
          } 
          else if(!regUniversity){
               request.flash("error", 'University selected not found');
               response.redirect("/register");
          }
          else{
                 
                  if(request.body.password === request.body.passwordConfirm){
                      university = {
                      id: regUniversity._id,
                      name: regUniversity.name,
                      acronym: regUniversity.acronym
                      }
                     var newUser = new User ({username: request.body.username, university:university});
                     User.register(newUser, request.body.password, function(error, user){
                        if(error){
                             request.flash("error", error.message);
                             response.redirect("/register")
                        }
                        else{
                           passport.authenticate("local")(request, response, function(){
                           response.redirect("/");
                           
                        });
                      }
                  }); 
              }
                  else{
                      
                      request.flash("error", "Passwords do not match please check again");
                      response.redirect("/register");

                  }
                 
          }
    });
 
});

//login form
router.get("/login", middleware.isNotLoggedIn, function(request, response){
     response.render("login");
});


//login process
router.post("/login",middleware.isNotLoggedIn, passport.authenticate("local",{
       successRedirect:"/",
       failureRedirect:"/login",
       failureFlash : { type: 'error', message: 'Invalid username or password.' }
       }));
       
//logout process
router.get("/logout", function(request, response){
       request.logout();
       response.redirect("/")
});

module.exports = router;
