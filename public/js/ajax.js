var $, moment;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
$(document).ready(function(e) {   
  
  // Ajax processs in adding comments to the database and prepending the new comment
  $(".comment-form form").submit(function(event){
      event.preventDefault();
      var formData = $(this).serialize();
      var error = $(".error-msg");
      var url = $(this).attr("action");
      $(this).children("button").blur();
      $.post(url, formData, function(data){
          
          
          if(data.errors){
            
              errorMsg(error, data.errors);
               
          }
          
          else {
              var creation = moment(Date.now()).fromNow();
              data[1] = data[1].toLowerCase();
              $(".comments").prepend(
              `<div class="row comment-entry animated fadeIn">
                    <div class="user-comment-img">
                      <img src="https://euroshop.wwe.com/on/demandware.static/-/Sites-wwe-euro-navigation/default/dw2a6de264/images/superstar-thumb-300/john-cena-2017.jpg"></img>
                    </div>
                    <div class="comment-content">
                      <div>
                          <a class="${data[1]}-text"><strong>${data[0].author.username}</strong></a><span class="time-stamp"><strong>  • ` + creation + `</strong></span>
                          <p> ${data[0].content}</p>
                      </div>
                      <div class="reply-button">
                          <a href="#" class="btn btn-primary btn-sm ${data[1]}-button ">Reply</a> 
                          <span class="like-button"><a class="regular"><i class="far fa-thumbs-up fa-lg"></i></a> ${data[0].likes.length}</span>
                          <span class="dislike-button"><a class="regular"><i class="far fa-thumbs-down fa-lg"></i></a>${data[0].dislikes.length}</span>
                      </div>
                          <div class="reply-form">
                              <form>
                                  <textarea class="form-control" rows="2"></textarea>
                                  <input type="submit"  class="btn btn-primary btn-sm btn-sm ${data[1]}-button" value="Post"></input>
                              </form>
                          </div>
                    </div>
                </div>`    
              );
              $(this).find(".form-control").val("");
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