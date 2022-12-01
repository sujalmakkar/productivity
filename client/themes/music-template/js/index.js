// LOADER
paceOptions = {
  ajax: true,
  document: true,
  eventLag: false
  };

  Pace.on('done', function() {
      gsap.to('.p',1,{
        opacity:0,
        y:'-15%',
        stagger:-.1,
      })

  gsap.to('#preloader',1.5,{
      y:'-100%',
      ease:'Expo.easeInOut',
      delay:1,
      onComplete : function(){


        gsap.to('.fade-in',2,{duration:1,opacity:1,delay:0});


function theme(){
  if(document.querySelector('.theme') ){
    $(function () {
      var elements = $(".theme").toArray();
      $(window).scroll(function () {
          elements.forEach(function (item) {
              if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
                
                  $(item).addClass("reveal");
             
              }
          });
      });
      elements.forEach(function (item) {
          if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight ) {
          
        
              $(item).addClass("reveal");
          
         
          }
      });
  });
}
}
theme();

if(document.querySelector('.cursor')){
  gsap.to('.cursor',1,{opacity:1,delay:1,scale:1,stagger:.2})
  gsap.to('.cursor-two',1,{opacity:1,delay:1,scale:1,stagger:.2})
}


      }
 });
})


const tilt = $('img').tilt({
    maxTilt:        -1,
     perspective:    100,   // Transform perspective, the lower the more extreme the tilt gets.
     easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
     scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
     speed:          500,    // Speed of the enter/exit transition.
     transition:     true,   // Set a transition on enter/exit.
     disableAxis:    null,   // What axis should be disabled. Can be X or Y.
     reset:          true,   // If the tilt effect has to be reset on exit.
     glare:          false,  // Enables glare effect
     maxGlare:       1       // From 0 - 1.
});


  //CUSTOM CURSOR ANIMATION
  $(function(){
    var $cursor = $('.cursor');
    var $cursortwo = $('.cursor-two')
      function cursormover(e){
       
       gsap.to( $cursor , {
         x : e.clientX ,
         y : e.clientY,
        })
        gsap.to( $cursortwo , {
          x : e.clientX ,
          y : e.clientY,
         })
      }
      function cursorhover(e){
       gsap.to( $cursor,{
        scale:1.5,
        opacity:.4,
        background:'rgb(235,235,235)',
        border:'none',
        ease: Expo.easeOut,
       })
       gsap.to( $cursortwo,{
        scale:0,
        opacity:0
       })
     }
     function cursor(e){
       gsap.to( $cursor, {
        scale:1,
        opacity:1,
        background:'transparent',
        border:'1px solid rgb(235,235,235)',
        innerHTML:''
       }) 
       gsap.to( $cursortwo,{
        scale:1,
        opacity:1
       })
     }
     $(window).on('mousemove',cursormover);
     $('a').hover(cursorhover,cursor);
     $('.hover').hover(cursorhover,cursor);
     
  })

   // SCROLL PROGRESS ANIMATION

   $(window).scroll(function() {
    var scroll = $(window).scrollTop(),
      dh = $(document).height(),
      wh = $(window).height();
    scrollPercent = (scroll / (dh - wh)) * 100;
    $(".progressbar").css("height", scrollPercent + "%");
  });


  //contact form display 

  if(document.querySelector('#myForm')){
    var submit = document.getElementById('contact');
         submit.addEventListener('click',function(){
      gsap.to('#form',.5,{opacity:1,pointerEvents:'all'})
         })
  }


  
  
   //CONTACT FORM (AFTER SUBMIT) 

   if(document.querySelector('#myForm')){
    var submit = document.getElementById('submit');

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    function sendEmail() {
     
      var body = $("#body");
      var email = $('#email');
      
  
      

      if ( isNotEmpty(body)  && isNotEmpty(email) ) {
          if($("#email").val().match(mailformat)){
            $('#submit').text("Sending");

            setTimeout(function(){
              $('#myForm')[0].reset();
              $('#submit').text("Thank You!!!");
              setTimeout(function(){
               gsap.to('#form',1,{opacity:0,pointerEvents:'none'})
              },500)
            },2000)
            $.ajax({
                url: 'mail.php',
                method: 'POST',
                dataType: 'json',
                data: {
                  
                    email: email.val(),
                    body: body.val()
                    
                }, success: function (response) {
                     console.log('success')
                }
                
                
             });
          }
          else{
            $('#message').css('opacity', '.8');
            setTimeout(function(){
            $('#message').css('opacity', '0');
            },2000)
        }

      }
  }
  
  function isNotEmpty(caller) {
      if (caller.val() == "" ) {
          caller.css('border', '1px solid red');
      $('#submit').text("Send");
          return false;
      }

       else
          caller.css('border', '');
      return true;
  }
  
  submit.addEventListener('click',sendEmail)
  
  }
  





 
//submit feel


var submit = document.getElementById('feel-button');
submit.addEventListener('click',function(){
gsap.to('#form-feel-main',.5,{opacity:1,pointerEvents:'all'})
})


if(document.querySelector('#form-feel')){
    var submit = document.getElementById('submit-feel');



    function sendEmail() {
     
      var body = $("#body-feel");
      
  
      

      if ( isNotEmpty(body) ) {
        
            $('#submit-feel').text("Sending");

            setTimeout(function(){
              $('#form-feel')[0].reset();
              $('#submit-feel').text("Thank You!!!");
              setTimeout(function(){
               gsap.to('#form-feel-main',1,{opacity:0,pointerEvents:'none'})
              },500)
            },2000)
            $.ajax({
                url: 'feel.php',
                method: 'POST',
                dataType: 'json',
                data: {          
                    body: body.val()                  
                }, success: function (response) {
                     console.log('success')
                }
                
                
             });
         
    

      }
  }
  
  function isNotEmpty(caller) {
      if (caller.val() == "" ) {
          caller.css('border', '1px solid red');
      $('#submit-feel').text("Send");
          return false;

      }

       else
          caller.css('border', '');
    

      return true;
  }
  
  submit.addEventListener('click',sendEmail)
  
  }



  
if(document.querySelector('.why-close')){
    var close= document.querySelector('.why-close');
    close.addEventListener('click',function(){
       gsap.to('#form-feel-main',.5,{opacity:0,pointerEvents:'none'})
    })
}
  console.log('cool');

  
 


  