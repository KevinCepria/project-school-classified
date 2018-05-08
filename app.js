// Require Packages needed   
   var express = require("express"),
           app = express(),
    bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
methodOverride = require("method-override"),
      passport = require("passport"),
 localStrategy = require ("passport-local"),
         flash = require("connect-flash"),
        moment = require("moment"),
        User  = require("./models/user"),
          Post = require("./models/post"),
      Comment  = require("./models/comment"),
         Reply = require("./models/reply"),
        expressSanitizer = require("express-sanitizer");
        
//requiring routes
var postRoutes    = require("./routes/post"),
   commentRoutes = require("./routes/comment"),
   indexRoutes   = require("./routes/index");
 
var url = process.env.DATABASEURL || "mongodb://localhost/dbv4";
mongoose.connect(url);

app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());



//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Prizmo",
    resave: false,
    saveUninitialized: false,
   // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
     res.locals.moment = moment;
     next();
 });


app.use(postRoutes);
app.use(indexRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED");
})