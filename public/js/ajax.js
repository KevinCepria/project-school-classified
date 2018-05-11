var $, moment;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
$(document).ready(function(e) {   
  
  // $(document).ajaxStart(function(){
  //   errorMsg($(".error-msg"), "Ajax request detected");
    
  // });
  
  $(document).ajaxComplete(function(){
    $('.la-ball-pulse-sync').remove();
  });
    
  
  
  // Ajax processs in adding comments to the database and prepending the new comment
  $(".comment-form form").submit(function(event){
      event.preventDefault();
      var form = $(this);
      var formData = $(this).serialize();
      var error = $(".error-msg");
      var url = form.attr("action");
      $(this).children("button").blur();
      
      
      if($("#my-comments").length === 0){
          
          $('.comments').prepend(
          `<div class="la-ball-pulse-sync">
                <div></div>
                <div></div>
                <div></div>
          </div>`);
      }
      else{
           $('#my-comments h4').after(
            `<div class="la-ball-pulse-sync">
                  <div></div>
                  <div></div>
                  <div></div>
            </div>`);
      }
        
      $.post(url, formData, function(data){
          
          // if($("#my-comments").length === 0){
              
          //     $('.comments').prepend(
          //     `<div class="la-ball-pulse-sync">
          //           <div></div>
          //           <div></div>
          //           <div></div>
          //     </div>`);
          // }
          // else{
          //     $('#my-comments h4').after(
          //       `<div class="la-ball-pulse-sync">
          //             <div></div>
          //             <div></div>
          //             <div></div>
          //       </div>`);
          // }
        
          
          if(data.errors){
            
              errorMsg(error, data.errors);
               
          }
          
          else {
              var creation = moment(Date.now()).fromNow();
              data.post.uniAcronym = data.post.uniAcronym.toLowerCase();
              if($("#my-comments").length === 0){
                
                $(".comment-form").after(
                  `<div id="my-comments" class="comments">
                        <h4>Your comments</h4>
                   </div>
                   <hr>`
                  );  
              }
              
              $("#my-comments h4").after(
              `<div class="row comment-entry animated fadeIn">
                    <div class="user-comment-img">
                      <img src="https://euroshop.wwe.com/on/demandware.static/-/Sites-wwe-euro-navigation/default/dw2a6de264/images/superstar-thumb-300/john-cena-2017.jpg"></img>
                    </div>
                    <div class="comment-content">
                      <div>
                          <a class="${data.post.uniAcronym}-text"><strong>${data.author.username}</strong></a><span class="time-stamp"><strong>  • ` + creation + `</strong></span><span class="caret"></span>
                          <p> ${data.content}</p>
                      </div>
                      <div class="reply-button">
                          <a href="#" class="btn btn-primary btn-sm ${data.post.uniAcronym}-button ">Reply</a> 
                          <span class="like-button"><a class="regular"><i class="far fa-thumbs-up fa-lg"></i></a> ${data.likes.length}</span>
                          <span class="dislike-button"><a class="regular"><i class="far fa-thumbs-down fa-lg"></i></a>${data.dislikes.length}</span>
                      </div>
                          <div class="reply-form">
                              <form>
                                  <textarea class="form-control" rows="2"></textarea>
                                  <input type="submit"  class="btn btn-primary btn-sm btn-sm ${data.post.uniAcronym}-button" value="Post"></input>
                              </form>
                          </div>
                    </div>
                </div>`    
              );
              form.children(".form-control").val("");
              autosize.update(form.children(".form-control"));
          }
      });
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