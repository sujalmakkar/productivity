(function() {

  const container = document.getElementById('app');

  const options = {
      onSpeedUp: (ev) => {},
      onSlowDown: (ev) => {},
      // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
      distortion: xyDistortion,

      length: 400,
      roadWidth: 15,
      islandWidth: 2,
      lanesPerRoad: 3,

      fov: 75,
      fovSpeedUp: 120,
      speedUp: 3,
      carLightsFade: 0,

      totalSideLightSticks: 30,
      lightPairsPerRoadWay: 30,

      // Percentage of the lane's width
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,

      /*** These ones have to be arrays of [min,max].  ***/
      lightStickWidth: [0.2, 0.05],
      lightStickHeight: [0.3, 0.7],

      movingAwaySpeed: [20, 50],
      movingCloserSpeed: [-150, -230],

      /****  Anything below can be either a number or an array of [min,max] ****/

      // Length of the lights. Best to be less than total length
      carLightsLength: [400 * 0.4, 400 * 0.2],
      // Radius of the tubes
      carLightsRadius: [0.03, 0.08],
      // Width is percentage of a lane. Numbers from 0 to 1
      carWidthPercentage: [0.1, 1],
      // How drunk the driver is.
      // carWidthPercentage's max + carShiftX's max -> Cannot go over 1. 
      // Or cars start going into other lanes 
      carShiftX: [-0, .1],
      // Self Explanatory
      carFloorSeparation: [1, 1.5],

      colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0xF1EECE,
          shoulderLines: 0x787A91,
          brokenLines: 0x787A91,
          /***  Only these colors can be an array ***/
          leftCars: [0x7D0D1B, 0xA90519, 0xff102a],
          rightCars: [0xF1EECE, 0xE6E2B1, 0xDFD98A],
          sticks: 0xF1EECE,
      }
  };

  const myApp = new App(container, options);
  myApp.loadAssets().then(myApp.init)
})()


  $(window).scroll(function() {
    var scroll = $(window).scrollTop()
    if(scroll > 60){
        $('#app').css('display','none')
        console.log('done')
    }
    else{
        $('#app').css('display','block')
        console.log('done1')
    }
});


// COOKIE POPUP DISPLAY FUNCTION

$(function() {
  var cookie_confirmation = document.querySelector('.cookie-confirmation')

  var cookie_popup = document.querySelector('.cookie-popup')
  cookie_confirmation.addEventListener('click', function() {
      cookie_popup.style.opacity = 0
      setTimeout(function() {
          cookie_popup.style.display = "none"
      }, 1000)
  })
})


// COOKIE POPUP DISPLAY FUNCTION



//COUNT FUNCTION

function count(div) {
  var increment;
  if (parseInt(div.getAttribute("data-number")) > 100) {
      increment = Math.round(parseInt(div.getAttribute("data-number")) / 200)
  } else {
      increment = 1
  }
  var stop = setInterval(function() {
      if (parseInt(div.innerHTML) < parseInt(div.getAttribute("data-number"))) {
          div.innerHTML = parseInt(div.innerHTML) + increment
      } else {
          div.innerHTML = parseInt(div.getAttribute("data-number"));
          clearInterval(stop)
      }
  }, 3000 / parseInt(div.getAttribute('data-number')))
}

//COUNT FUNCTION



// MASONRY

$( window ).load( function() {
 

    $('.testimonials-container').masonry({
      itemSelector: '.testimonial',
      isAnimated: true
    });


    $('.blogs-container').masonry({
      itemSelector: '.blog',
      isAnimated: true
    });

});




//OPACITY TRANSITIONS ON SCROLL FUNCTION

$(function () {
  var elements = $(".opacity-scroll").toArray();
  $(window).scroll(function () {
      elements.forEach(function (item) {
          if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
              $(item).removeClass("opacity-scroll");
          }
      });
  });
  elements.forEach(function (item) {
      if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight ) {
          $(item).removeClass("opacity-scroll");
      }
  });
});
//OPACITY TRANSITIONS ON SCROLL FUNCTION




//COUNTER INITIATE ON SCROLL FUNCTION


$(function () {
  var elements = $(".counter").toArray();
  $(window).scroll(function () {
      elements.forEach(function (item) {
          if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight) {
              count(item)
          }
      });
  });
  elements.forEach(function (item) {
      if ($(this).scrollTop() >= $(item).offset().top - window.innerHeight ) {
          count(item)
      }
  });
});


//COUNTER INITIATE ON SCROLL FUNCTION



// SWIPER JS  

//PROJECT CONTAINER HEIGHT



var projects_height = document.querySelectorAll('.project-container')
var projects_container = document.querySelector('.case-study-information')
var max_height;
projects_height.forEach(project => $(function() {
  max_height = Math.max(parseInt(project.offsetHeight + 50))
  projects_container.style.height = max_height + 'px';
}))

window.addEventListener('resize', function() {
  var projects_height = document.querySelectorAll('.project-container')
  var images_container = document.querySelector('.case-study-information')
  var max_height;
  projects_height.forEach(project => $(function() {
      max_height = Math.max(parseInt(project.offsetHeight + 50))
      images_container.style.height = max_height + 'px';
  }))
})




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
              gsap.set('.project-container', {
                  opacity: 0
              })
              var current_slide = document.querySelector('.swiper-slide-active')
              var div = current_slide.getAttribute("data-text");
              gsap.to(div, 1, {
                  opacity: 1,
                  pointerEvents: 'all'
              })
          },
          resize: function() {
              this.update();
          },
          slideChangeTransitionEnd: function() {
              var current_slide = document.querySelector('.swiper-slide-active')
              var div = current_slide.getAttribute("data-text");
              gsap.to('.project-container', .1, {
                  opacity: 0,
                  pointerEvents: 'none',
                  onComplete: function() {
                      gsap.to(div, .5, {
                          opacity: 1,
                          pointerEvents: 'all'
                      })
                  }

              })
          },
      },
      autoplay: {
          delay: 5000,
          disableOnInteraction: true,
      },
      observer: true,
      observeParents: true,
  };

  parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
  $(window).on('resize', function() {
      parallaxSlider.destroy();
      parallaxSlider = new Swiper('.parallax-slider', parallaxSliderOptions);
  });

});

$(function() {


  var menubar = document.querySelector('.menubar')
  var navigation = document.querySelector('#navigation-desktop')

  gsap.set('.navigation-opacity', {
      opacity: 0
  })

  menubar.addEventListener('click', function() {
      if (menubar.classList.contains('menubar-close')) {
          this.classList.remove('menubar-close');
          gsap.to('.navigation-opacity', .5, {
              opacity: 0,
              onComplete: function() {
                  gsap.to(navigation, .5, {
                      transform: 'translateX(100%)'
                  })
              }
          })
      } else {
          gsap.to(navigation, .5, {
              transform: 'translateX(0%)',
              onComplete: function() {
                  gsap.to('.navigation-opacity', .5, {
                      opacity: 1
                  })
              }
          })
          this.classList.add('menubar-close');
      }
  })



})



// [].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})