
/* Table of content
--------------------------------------------

========

--------
ANIMATION AFTER PAGE LOAD
PARALLAX ON HOME PAGE
CURSOR FOLLOWER ON HOME PAGE
NAVIGATION ANIMATION
PAGE TRANSITIONS 
GALLERY PAGE SLIDER
WORK PAGE PARALLAX SLIDER
CONTACT FORM SUBMIT
-----------
==========

*/




// PAGE EFFECT AFTER LOADING

$(window).on('load',function(){
  gsap.to('.loader-content',1,{    //LOADING TEXT TRANSITION
    opacity:'0',
    delay:.5,
  });
  gsap.to('#loader',1.5,{   //LOADING PAGE TRANSITION
  y:'-100%',
  ease:'Expo.easeInOut',
  delay:1,
  onComplete : function(){   //FUNCTION AFTER COMPLETE TRANSITION OF LOADING PAGE
         gsap.to('.home-slider-image',1.5,{ //IMAGE TRANSITION
          x:'0%',
          width:'100%',
          objectFit:'cover',
          ease:'Expo.easeInOut',
         })
         gsap.to('.text-home-page',1,{  //LINES TRANSITIION
          y:'0%',
          delay:1.5,
          ease:'Expo.easeInOut',
         })
         gsap.to('.opacity2',.5,{  //OPACITY TRANSITION
          opacity:1,
          delay:2.5,
         })
         gsap.to('.opacity3',.5,{  //OPACITY TRANSITION
          opacity:1,
          delay:3,
         })
         gallerylinkhome()  //GALLERY CURSOR EFFECT
  }
});
gsap.to('#loader',0,{   //LOADING PAGE TRANSITION
    display:'none',
    delay:2.5,
});
})
// PAGE EFFECT AFTER LOADING




//PARALLAX ON HOME PAGE

$(document).ready(function() {
    var parallaxSlider;
    var parallaxSliderOptions = {
      speed: 1500,
      parallax: true,
      loop: true,
      centeredSlides: true,
      mousewheel: true,
      on: {
        init: function() {
          let swiper = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            $(swiper.slides[i])
              .find('.img-container')
              .attr({
                'data-swiper-parallax': 1 * swiper.width,
              });
  
           
          }
        },
        resize: function() {
          this.update();
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      autoplay: {
        delay: 8000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.slider-controls .next-ctrl',
        prevEl: '.slider-controls .prev-ctrl'
      },
      observer: true,  
      observeParents: true,
    };
  
    parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
    $(window).on('resize', function() {
      parallaxSlider.destroy();
      parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
    });
    $(function(){
      var a = document.querySelectorAll('[href="#home"]');
      a.forEach(b=>b.addEventListener('click',function(){
        setTimeout(function(){
          parallaxSlider.destroy();
          parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
        },1600)
      }))
    })
    

  });

  //HOME PARALLAX OVER






  
  //CURSOR FOLLOWER

            function gallerylinkhome(){
              var $cursor = $('.gallery-link');
                function cursormover(e){
                 gsap.to( $cursor , {
                   x : e.clientX + 75,
                   y : e.clientY - 75,
                   top:'0%',
                   right:'100%'
                  })

                }

                function cursorposition(){
                 gsap.to( $cursor,{
                  top:'1%',
                  right:'2%',
                  x:0,
                  y:0, 
                 })
               }
               $('.text-home-page').on('mousemove',cursorposition);
               $('#navigation-content').on('mousemove',cursorposition);
               $('.swiper-container').on('mousemove',cursormover);
               $('.logo').on('mousemove',cursormover);
            }

      // CURSOR FOLLOWER









//NAVIGATION ANIMATION

$(function(){
  $('.navigation-bar').on('click',function(){
    gsap.to('.navigation-back',1.5,{   //LOADING PAGE TRANSITION
      y:'0%',
      ease:'Expo.easeInOut',
      stagger:-.3,
      delay:0,
      onComplete :function(){
        gsap.to('.navigation-links',.6,{opacity:1,stagger:.1,pointerEvents:'all'}) 
        gsap.to('#navigation-content',.6,{pointerEvents:'all'})
        gsap.to('.navigation-close',.6,{opacity:1,pointerEvents:'all'})
        gsap.to('.social-links',.6,{opacity:1,stagger:.1,pointerEvents:'all'})
      }
    })
  })

  $('.navigation-close').on('click',function(){
        gsap.to('.navigation-back',1.5,{y:'-100%',ease:'Expo.easeInOut',delay:1,stagger:.3,})    
        gsap.to('.navigation-links',.6,{opacity:0,stagger:-.1,pointerEvents:'none'})
        gsap.to('.navigation-close',.6,{opacity:0,pointerEvents:'none'})
        gsap.to('#navigation-content',0,{pointerEvents:'none'})
        gsap.to('.social-links',0,{pointerEvents:'none'})
        gsap.to('.navigation-close',0,{pointerEvents:'none'})
        gsap.to('.navigation-links',0,{pointerEvents:'none'})
        gsap.to('.social-links',.6,{opacity:0,stagger:-.1,pointerEvents:'none'})
  })
})

// NAVIGATION ANIMATION








//PAGE TRANSITIONS 

$(function pagetransition(){
  var links = [...document.querySelectorAll('.page-link')]; // GET ALL THE LINKS WITH CLASS 'PAGE LINK'
  var breaker = document.querySelector('#breaker'); //GET THE BREAKER(THE SCREEN THAT ANIMATES ON CLICK ON A LINK)

  links.forEach(link => link.addEventListener('click',function(){ // CLICK ON ANY LINK WILL DO THE FOLLOWING 
     
    var page =  link.getAttribute("href"); //GET THE VALUE OF HREF ATTRIBUTE FOR THE LLINK WHICH HAS BEEN CLICKED

    if(document.querySelector(page)){

      //DISPLAYBREAKER FUNCTION
      function displaybreaker(){
          breaker.style.display = 'block'; // ANIMATE BREAKER(SCREEN)
 
          breaker.addEventListener('animationend',function(){
              this.style.display="none";  //WHEN ITS COMPLETELY ANIMATED SET IT TO DEFAULT
          })
          gsap.to('.navigation-back',1.5,{y:'-100%',ease:'Expo.easeInOut',delay:1,stagger:.3,})   // PULL UP THE NAVIGATION IF ITS DOWN 
          gsap.to('.navigation-links',.6,{opacity:0,stagger:-.1,pointerEvents:'none'})
          gsap.to('.navigation-close',.6,{opacity:0,pointerEvents:'none'})
          gsap.to('#navigation-content',.6,{pointerEvents:'none'})
          gsap.to('.social-links',.6,{opacity:0,stagger:-.1,pointerEvents:'none'})
      }
      //DISPLAYBREAKER FUNCTION
  
 
      displaybreaker()   // CALL DISPLAYBREAKER FUNCTION
 
 
      //  CHANGEPAGE FUNCTION
      function changepage(){
 
         var pages = links.map(a=>a.getAttribute("href")) // GET ALL PAGES
         setTimeout(function(){
          pages.forEach(a=>document.querySelector(a).style.display='none'); //SET ALL PAGES TO DISPLAY='NONE'
          document.querySelector(page).style.display ='block'; //SET THE STYLE OF THEE PAGE WHICH HAS BEEN CALLED TO DISPLAY 'BLOCK'
         },1500) 
       }    
      //  CHANGEPAGE FUNCTION
      
      changepage()   // CALL CHANGEPAGE FUNCTION
    }
  }))
})

//PAGE TRANSITION






// GALLERY PAGE SLIDER

new Swiper('#gallery .swiper-container', {
  slidesPerView: 'auto',
  speed: 500,
  spaceBetween: 30,
  centeredSlides: true,
  grabCursor: true,
  navigation: {
    nextEl: '#next',
    prevEl: '#prev'
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.progress-bar-container-swiper',
    type: 'progressbar',
  },
  mousewheel: true,
  observer: true,  
  observeParents: true,
});
// SLIDER ON GALLERY PAGE









//PARALLAX SLIDER ON WORK PAGE

$(document).ready(function() {
  var parallaxSlider2;
  var parallaxSliderOptions2 = {
    speed: 1500,
    parallax: true,
    loop: true,
    centeredSlides: true,
    direction:'vertical',
    mousewheel: true,
    observer: true,  
    observeParents: true,
    on: {
      init: function() {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find('.project')
            .attr({
              'data-swiper-parallax': 1 * swiper.height,
            });
        }
      },
      resize: function() {
        this.update();
      }
    },
    navigation: {
      nextEl: '#vertical-next',
      prevEl: '#vertical-prev'
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
  };


    parallaxSlider2 = new Swiper('#work .swiper-container', parallaxSliderOptions2);


  $(window).on('resize', function() {
    parallaxSlider2.destroy();
    parallaxSlider2 = new Swiper('#work .swiper-container', parallaxSliderOptions2);
  });

  $(function(){
    var a = document.querySelectorAll('[href="#work"]');
    a.forEach(b=>b.addEventListener('click',function(){
      setTimeout(function(){
        parallaxSlider2.destroy();
        parallaxSlider2 = new Swiper('#work .swiper-container', parallaxSliderOptions2);
      },1500)
    }))
  })
});


//PARALLAX SLIDER ON WORK PAGE


  //CONTACT FORM 


  var submit = document.getElementById('submit');

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  function sendEmail() {
    var name = $("#name");
    var email = $('#email');
    var subject = $("#subject");
    var body = $("#body");
    

    

    if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(body) ) {
        if($("#email").val().match(mailformat)){
          $('#submit').text("Sending");
          $.ajax({
              url: 'mail.php',
              method: 'POST',
              dataType: 'json',
              data: {
                  name: name.val(),
                  email: email.val(),
                  subject: subject.val(),
                  body: body.val()
                  
              }, success: function (response) {
                   $('form')[0].reset();
                   $('#submit').text("Sent!!!");
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


  //CONTACT FORM 










