var $;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
var animPulse = 'animated pulse';

$(document).ready(function(e) {   
     $("#userPassword").on("input", function(event){
        var password =$(this);
        event.preventDefault();
         
        
        if(/\s/.test(password.val()) || !/^[a-zA-Z0-9- ]*$/g.test(password.val()) ){
             password.css("border", "solid 2px red");
             password.siblings(".notice-right").text("Spaces and special characters are not allowed!");
             password.siblings(".notice-right").css({"color":"red" , "float": "right"});
        } 
        
        else{
            password.css("border", "solid 1px #ccc");
            password.siblings(".notice-right").text("");
        }
        
          
     });
     
     
    $("#passwordConfirmation").on("input", function(event){
        event.preventDefault();
        var passwordConfirmation = $(this);
        var password = $("#userPassword");
        
        if(password.val() == "" && passwordConfirmation.val() == ""){
            password.css("border", "solid 1px #ccc");
            password.siblings(".notice-right").text("");
            passwordConfirmation.css("border", "1px solid #ccc");
            passwordConfirmation.siblings(".notice-right").text("");
        }
        
        
        else if(password.val() == ""){
             password.css("border", "solid 2px red");
             password.siblings(".notice-right").text("No password set!");
             password.siblings(".notice-right").css({"color":"red" , "float": "right"});
            
        }
        
        else if(passwordConfirmation.val() == ""){
             passwordConfirmation.css("border", "solid 1px #ccc");
             passwordConfirmation.siblings(".notice-right").text("");
        }
        
        else if(password.val() === passwordConfirmation.val()){
             
             passwordConfirmation.css("border", "solid 2px green");
             passwordConfirmation.siblings(".notice-right").text("Alright!");
             passwordConfirmation.siblings(".notice-right").css({"color":"green" , "float": "right"});
             passwordConfirmation.addClass(animPulse).one(animationEnd, function(){
                  passwordConfirmation.removeClass(animPulse);
             });
        }
        else{
             passwordConfirmation.css("border", "solid 2px red");
             passwordConfirmation.siblings(".notice-right").text("Not matching!")
             passwordConfirmation.siblings(".notice-right").css({"color":"red" , "float": "right"});
        }
           
    });
    
     $("#userID").on("input", function(event){
        event.preventDefault();
        
        var username = $(this);
        
        if(/\s/.test(username.val()) && !/^[a-zA-Z0-9- ]*$/g.test(username.val()) ){
            
             username.siblings(".notice-right").text("-__- Are you serious?");
        }
        
        
        else if (/\s/.test(username.val())) {
         // It has any kind of whitespace
             username.css("border", "solid 2px red");
             username.siblings(".notice-right").text("No spaces please!");
             username.siblings(".notice-right").css({"color":"red" , "float": "right"});
        }
        
        else if (!/^[a-zA-Z0-9- ]*$/g.test(username.val())) {
              // it looks okay now
             username.css("border", "solid 2px red");
             username.siblings(".notice-right").text("No special characters allowed");
             username.siblings(".notice-right").css({"color":"red" , "float": "right"});
         }
         
       else{
             username.css("border", "1px solid #ccc");
             username.siblings(".notice-right").text("");
       }
           
    });
    
    autosize($('textarea'));
    
    $('#post-form textarea').on('input', function(e){
        
        let content = $(this);
        
        if( content.val().trim().length <= 15000){
          $(".counter").text( content.val().trim().length);
        }
        
        else{
          content.val(content.val().trim().slice(0, 15000));
          alert('Maximum Character Limit Reached');
        }
    })
    
});