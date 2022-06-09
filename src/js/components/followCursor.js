import gsap, {Power2} from "gsap";

const followCursor = () => {
  const ball = document.querySelector('.order-btn__wrapper'),
    container = document.querySelector('.order-btn'),
    text = document.querySelector('.order-btn__link__text'),
    btn = document.querySelector('.order-btn__link'),
    introSection = document.querySelector('.intro'),
    timelineRotate = gsap.timeline({defaults: {ease: 'none', duration: 40}});

  let containerProps = {
    height: 230,
    width: 230,
    increasedHeight: 350,
    increasedWidth: 350,
  };

  timelineRotate.to(btn, {
    rotation: 360,
    repeat: -1,
  });

  container.addEventListener('mouseleave', () => {
    gsap.to(container, {
      height: containerProps.height,
      width: containerProps.width,
      ease: "power3",
      duration: 0.3,
      marginTop: 0,
      marginLeft: 0.
    });

    const ballStyles = window.getComputedStyle(container);

    if (introSection.classList.contains('animation-intro')) {
      console.log(true)
      gsap.to(ball, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        borderColor: 'transparent'
      });
    } else {
      gsap.to(ball, {
        scale: 0.9,
        x: 0,
        y: 80,
        duration: 0.3,
        borderColor: 'transparent'
      });
    }

    gsap.to(text, {
      scale: 1,
      duration: 0.3,
      x: 0,
      y: 0,
    });

  });

  container.addEventListener('mouseenter', (ev) => {
    gsap.to(container, {
      height: containerProps.increasedHeight,
      width: containerProps.increasedWidth,
      ease: "power3",
      duration: 0.6,
      marginTop: -40,
      marginLeft: -60
    });

    gsap.to(ball, {
      scale: 1.3,
      borderColor: 'rgba(255,255,255,0.3)',
      duration: 0.3
    });

    gsap.to(text, {
      scale: 0.8,
      duration: 0.3
    });
  });

  container.addEventListener('mousemove', (ev) => {
    callParallax(ev);
  });

  function callParallax(e) {
    parallaxIt(e, ball, 50);
    parallaxIt(e, text, 50);
  }

  function parallaxIt(e, target, movement) {
    const left = container.getBoundingClientRect().left,
      top = container.getBoundingClientRect().top,
      relX = e.pageX - left,
      relY = e.pageY - top;

    gsap.to(target, {
      x: (relX - container.offsetWidth / 2) / container.offsetWidth * movement,
      y: (relY - container.offsetHeight / 2) / container.offsetHeight * movement,
      ease: Power2.easeOut,
      duration: 0.3
    });
  }

}
export default followCursor;