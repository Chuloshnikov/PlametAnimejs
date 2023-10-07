function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, {scale: 1});
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }
  
  var sphereAnimation = (function() {
  
    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var animations = [];
  
    fitElementToParent(sphereEl);
  
  var breathAnimation = anime({
      targets: spherePathEls,
      stroke: [
        { value: 'rgba(255,75,75,1)', duration: 700, easing: 'easeInSine' },  // Светится при увеличении
        { value: 'rgba(80,80,80,.35)', duration: 700, easing: 'easeOutSine' }  // Гаснет при переходе к нормальному состоянию
      ],
      scale: [
        { value: 1.1, duration: 700, easing: 'easeInSine' },
        { value: 1, duration: 700, easing: 'easeOutSine' }
      ],
      loop: true,
      autoplay: false
  });
  
  var introAnimation = anime.timeline({
      autoplay: false
  })
  .add({
      targets: spherePathEls,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 3900,
        easing: 'easeInOutCirc',
        delay: anime.stagger(190, {direction: 'reverse'})
      },
      duration: 2000,
      delay: anime.stagger(60, {direction: 'reverse'}),
      easing: 'linear'
  }, 0);
  
    var shadowAnimation = anime({
      targets: '#sphereGradient',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 30000,
      easing: 'easeOutQuint',
      autoplay: false
    }, 0);
  
    function init() {
      introAnimation.play();
      breathAnimation.play();
      shadowAnimation.play();
    }
  
    init();
  
  })();