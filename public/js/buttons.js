var $;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
var animRubberBand = 'animated rubberBand';
var animJello = 'animated jello';
var animPulse = 'animated pulse';

$(document).ready(function(e) {   
  
  $(".comment-section").on("click",".reply-button .btn", function(event){

      event.preventDefault();
      $(this).blur();
    	$(this).parent().next().fadeToggle(400, function(){
    	    
    	     	$(this).children().children(".form-control").focus();
    	});

  });
  
  $(".comments").on("mouseover",".like-button .regular",function(){
    
         $(this).removeClass("regular").addClass("solid")
         .children().toggleClass("far fas");
  });
  
  $(".comments").on("mouseout",".like-button .solid",function(event){
        
         $(this).removeClass("solid").addClass("regular")
         .children().toggleClass("far fas");
  });
  
  $(".comments").on("click",".like-button .solid",function(event){
         event.preventDefault();
         var dislikeButtonSpan = $(this).parent().siblings(".dislike-button").children();
         $(this).removeClass("solid").addClass("liked");
         
         dislikeButtonSpan.removeClass("liked").addClass("regular")
         .children().removeClass("fas").addClass("far");
         
         $(this).children().toggleClass(animRubberBand).one(animationEnd, function(){
              $(this).removeClass(animRubberBand);
         });
          
  });
  
  $(".comments").on("click",".like-button .liked",function(event){
         $(this).children().toggleClass("far fas ").removeClass("liked").addClass("regular");
  });
  
  $(".comments").on("mouseover",".dislike-button .regular",function(){
         $(this).removeClass("regular").addClass("solid")
         .children().toggleClass("far fas");
  });
  
  $(".comments").on("mouseout",".dislike-button .solid",function(event){
          $(this).removeClass("solid").addClass("regular")
         .children().toggleClass("far fas");
  });
  
  $(".comments").on("click",".dislike-button .solid",function(event){
         event.preventDefault();
         var  likeButtonSpan = $(this).parent().siblings(".like-button").children();
         $(this).removeClass("solid").addClass("liked")
         
         likeButtonSpan.removeClass("liked")
         .addClass("regular")
         .children().removeClass("fas").addClass("far");
         
         $(this).children().toggleClass(animRubberBand).one(animationEnd, function(){
           $(this).removeClass(animRubberBand);
         });
  });
  
  $(".comments").on("click",".dislike-button .liked",function(event){
          event.preventDefault();
          $(this).children().toggleClass("far fas")
          .removeClass("liked")
          .addClass("regular");
  });
  
  
  $(".comment-form").on("mouseover","button", function(){
        $(this).addClass(animPulse).one(animationEnd, function(event){
             $(this).removeClass(animPulse)
        });
  });
  
  
  /* Logic for register button */
   $("#register-form .register").submit(function (event){
        
         var userID=$(this).find("#userID");
         var password=$(this).find("#userPassword");
         var passwordConfirmation= $(this).find("#passwordConfirmation");
         var error = $(".error-msg");
         
         if(!userID.val().replace(/ /g, '') || !password.val().replace(/ /g, '') || !passwordConfirmation.val().replace(/ /g, '')){
            
              errorMsg(error,"Please complete the registration form")
              
         }
         
         else {
           
              if(/\s/.test(userID.val().trim()) || /\s/.test(password.val().trim()) || /\s/.test(passwordConfirmation.val().trim()) || !/^[a-zA-Z0-9- ]*$/g.test(userID.val().trim()) || !/^[a-zA-Z0-9- ]*$/g.test(password.val().trim()) || !/^[a-zA-Z0-9- ]*$/g.test(passwordConfirmation.val().trim())){
                
                 errorMsg(error,"Spaces and special characters are not allowed");
                
              }
              
              else{
                 
                    if(userID.val().trim().length < 5 || userID.val().trim().length > 20){
                      
                            errorMsg(error,"Username can only have 5 to 20 characters");
                    }
                    
                    else if(password.val().trim().length < 5 || password.val().trim().length > 20){
                      
                            errorMsg(error,"Password can only have 5 to 20 characters");
                    }
                    
                    else {
                         
                         if(!(password.val().trim() === passwordConfirmation.val().trim())){
                           
                                errorMsg(error,"Passwords do not match please check again");
                         }
                         
                         else{
                           
                                return true;
                           
                         }
                      
                    }
                
              }
             
         }
         
         return false;
          
  });
  
  $('#post-form > form').submit(function(event){
    
      var error = $(".error-msg");
      
      if( !$('#post-form input').val()){
        
          errorMsg(error,"Please give your story a title");
          
      }
      
      else if( $('textarea').val().trim().length < 800){
        
          errorMsg(error,"Minimum number of characters not reached");
          
      }
        
      else if($('textarea').val().trim().length > 15000){
          
          errorMsg(error,"Maximum number of characters exceeded");
          
      }
      
      else{
        
          return true;
          
      }
    
      return false;
  });
  
  function errorMsg(error, message){
     
        error.html('')
        error.append(
              `<p><i class="fas fa-exclamation-circle"></i>${message}<p>`
              ).addClass("animated bounceIn").one(animationEnd, function(){
                error.removeClass("animated bounceIn");
              });
  }
  

});

function isScrolledIntoView(elem){
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top-100;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}