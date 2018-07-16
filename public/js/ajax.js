var $, moment;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
$(document).ready(function(e) {
  
  var commentObj;
  var error = $(".comment-section .error-msg");
  var errModal = $("#myModal .error-msg");
  

  $(document).ajaxComplete(function(){
    $('.la-ball-pulse-sync').remove();
  });
    
  
  // Ajax processs in adding comments to the database and prepending the new comment
  $(".comment-form form").submit(function(event){
      event.preventDefault();
      let form = $(this);
      let formData = form.serialize();
       console.log(form);
      let url = form.attr("action");
      let submitButton = form.children("button");
      console.log(formData);
      
      submitButton
      .blur()
      .attr("disabled",true);
      
      
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
                        <hr>
                   </div>`
                  );  
              }
              
              $("#my-comments h4").after(
              `<div class="row comment-entry animated fadeIn">
                    <div class="user-comment-img">
                      <img src="https://euroshop.wwe.com/on/demandware.static/-/Sites-wwe-euro-navigation/default/dw2a6de264/images/superstar-thumb-300/john-cena-2017.jpg"></img>
                    </div>
                    <div class="comment-content">
                      <div class="comment-body">
                          <a class="${data.post.uniAcronym}-text"><strong>${data.author.username}</strong></a><span class="time-stamp"><strong>  • ` + creation + `</strong></span>
                          <li class="dropdown response">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></a>
                            <ul class="dropdown-menu">
                              <li><a href="/files/${data.post.uniAcronym.toUpperCase()}/${data.post.id}/comments/${data._id}?_method=PUT" class="edit-response" data-toggle="modal" data-target="#myModal"><i class="fas fa-edit" aria-hidden="true"> </i> Edit</a></li>
                              <li><a href="/files/${data.post.uniAcronym.toUpperCase()}/${data.post.id}/comments/${data._id}?_method=DELETE" class="delete-response"><i class="fa fa-times" aria-hidden="true"> </i> Delete</a></li>
                            </ul>
                          </li>
                          <p class="comment-text"> ${data.content}</p>
                      </div>
                      <div class="reply-button">
                          <a href="#" class="btn btn-sm ${data.post.uniAcronym}-button ">Reply</a> 
                          <span class="like-button"><a class="regular"><i class="far fa-thumbs-up fa-lg"></i></a> ${data.likes.length}</span>
                          <span class="dislike-button"><a class="regular"><i class="far fa-thumbs-down fa-lg"></i></a>${data.dislikes.length}</span>
                      </div>
                          <div class="reply-form">
                              <form>
                                  <textarea class="form-control" rows="2"></textarea>
                                  <input type="submit"  class="btn btn-sm ${data.post.uniAcronym}-button" value="Post"></input>
                              </form>
                          </div>
                    </div>
                </div>`    
              );
              form.children(".form-control").val("");
              autosize.update(form.children(".form-control"));
          }
          
          submitButton.attr("disabled",false);
      });
  });
  
  // deleting a comment in the databse and removing it from the html
  $(".comment-section").on("click",".delete-response", function(event){
    event.preventDefault();
    let comment = $(this).parents(".comment-entry");
    let url = $(this).attr('href');
    let circleLoader;
    
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: url,
        timeout: 45000,
        beforeSend: function(){
            comment.removeClass("animated").addClass("blur");
            
            comment.append(`
            <div class="circle-wrapper">
               <div class="sk-circle">
                  <div class="sk-circle1 sk-child"></div>
                  <div class="sk-circle2 sk-child"></div>
                  <div class="sk-circle3 sk-child"></div>
                  <div class="sk-circle4 sk-child"></div>
                  <div class="sk-circle5 sk-child"></div>
                  <div class="sk-circle6 sk-child"></div>
                  <div class="sk-circle7 sk-child"></div>
                  <div class="sk-circle8 sk-child"></div>
                  <div class="sk-circle9 sk-child"></div>
                  <div class="sk-circle10 sk-child"></div>
                  <div class="sk-circle11 sk-child"></div>
                  <div class="sk-circle12 sk-child"></div>
              </div>
            </div>
         `)
          circleLoader = $(".circle-wrapper");
        }
    }).then(function(data){
           if(data){
             errorMsg(error,data.errors);
             comment.removeClass("blur");
             circleLoader.remove();
           }
           else{
               
               comment.fadeOut(300, function(){
                  error.html('');
                  ($(this).siblings(".comment-entry").length <= 0)?   $(this).parent().remove() : $(this).remove();
                       
               });
           }
           
    }).catch(function(event){
           errorMsg(error,"Ooops! Something went wrong. Connection "+event.statusText)
           comment.removeClass("blur")
           circleLoader.remove();
    });
    
  });
  
  //pops up the modal for editing the comment
  $(".comment-section").on("click",".edit-response",function(event){
      event.preventDefault();
      
      let editResponse = $(this)
            commentObj = editResponse.parents(".comment-body").find(".comment-text")
      let commentText = commentObj.text();
        
      $("#myModal").modal("show");
      
      $(".edit-response-form").attr("action",editResponse.attr("href"));
      $(".edit-response-form textarea").val(commentText.trim());
      
      setTimeout(function(){
           autosize.update($('.edit-response-form textarea'));
      }, 180);
      
      return false;
      
  });
  
  //removes action attribute and empties text area when eidting is cancelled
  $(".cancel-edit").click(function(){
    
      let editForm = $(this).parent().parent();
      
       editForm.removeAttr("action");
       editForm.children("textarea").val("");
  });
  
  // updates comment/reply and loads loaders for ajax
  $(".edit-response-form").submit(function(event){
    
      event.preventDefault();
      let modal = $("#myModal");
      let modalDialog = modal.find(".modal-dialog");
      let form = $(this);
      let newItem= $(this).serialize();
      let url = $(this).attr("action");
      let circleLoader;
      $.ajax({
        type: 'PUT',
        data: newItem,
        dataType: 'json',
        url: url,
        beforeSend: function(){
            modalDialog.append(`
            <div class="check_mark">
               <div class="sk-circle">
                  <div class="sk-circle1 sk-child"></div>
                  <div class="sk-circle2 sk-child"></div>
                  <div class="sk-circle3 sk-child"></div>
                  <div class="sk-circle4 sk-child"></div>
                  <div class="sk-circle5 sk-child"></div>
                  <div class="sk-circle6 sk-child"></div>
                  <div class="sk-circle7 sk-child"></div>
                  <div class="sk-circle8 sk-child"></div>
                  <div class="sk-circle9 sk-child"></div>
                  <div class="sk-circle10 sk-child"></div>
                  <div class="sk-circle11 sk-child"></div>
                  <div class="sk-circle12 sk-child"></div>
              </div>
            </div>`);
            circleLoader = $(".check_mark");
        },
        timeout: 45000,
          
        success: function(data, textStatus ){
            if(data.errors){
                errorMsg(errModal, data.errors, modal);
                circleLoader.remove();
            }
            else{
                commentObj.text(data);
                commentObj = null;
                errModal.empty();
                circleLoader.empty();
                circleLoader.append(`
                    <div class="sa-icon sa-success animate">
                      <span class="sa-line sa-tip animateSuccessTip"></span>
                      <span class="sa-line sa-long animateSuccessLong"></span>
                      <div class="sa-placeholder"></div>
                      <p>UPDATED</p>
                    </div>
               `);
               
              setTimeout(function(){
                  modal.modal("hide");
                  circleLoader.remove();
              },1200)
            }
        },
        
        error: function(xhr, textStatus, errorThrown){
             
            errorMsg(errModal, "Ooops! Something went wrong. Connection " + textStatus);
            circleLoader.remove();
        }
      });

  })
  
  function errorMsg(error, message){
     
        error.html('')
        error.append(
              `<p><i class="fas fa-exclamation-circle"></i>${message}<p>`
              ).addClass("animated bounceIn").one(animationEnd, function(){
                error.removeClass("animated bounceIn");
              });
        
        if(!isScrolledIntoView(error)){
            $('html, body').animate({
                    scrollTop: ($(error).offset().top- 100)
                }, 600);
        }
  }
  
  
});