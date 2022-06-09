import gsap, {Power2, Power4} from "gsap";
import SmoothScroll from "smooth-scrollbar";
import headerOnScroll from "./headerOnScroll";

const scrollFunction = (container, btnClass) => {

  const btn = document.querySelector(btnClass),
    btnStyles = window.getComputedStyle(btn),
    elem = document.querySelector(container),
    options = {
    'damping': 0.06,
    'speed': 0.3,
    'alwaysShowTracks': true
  };

  btn.style.top = window.innerHeight - (parseInt(btnStyles.height) + 20) + 'px'; //btn default position

  const scrollbar = SmoothScroll.init(elem, options),
    btnPosition = btn.getBoundingClientRect(),

    scrollElement = document.querySelector('.scroll-content'),
    scrollContent = scrollElement.getBoundingClientRect(),

    cardsWrapper = document.querySelector('.benefits'),
    tabsSection = document.querySelector('.about__tabs'),
    tabImages = document.querySelector('.about__tabs__images'),
    tabList = document.querySelector('.about__tabs__list'),
    header = document.querySelector('.header'),
    vh = window.innerHeight / 100,
    startAnimationPosition = scrollContent.height - (vh * 10);

  let animation1 = gsap.timeline({defaults: {ease: Power2.easeOut, duration: 0.8}}),
    animation2 = gsap.timeline({defaults: {ease: Power4.easeOut, duration: 1}}),
    animation3 = gsap.timeline({defaults: {ease: Power4.easeOut, duration: 0.9}}),
    animation4 = gsap.timeline({defaults: {ease: Power2.easeIn, duration: 1}}),
    animation5 = gsap.timeline({defaults: {ease: Power4.easeOut, duration: 3, delay: 1}}),
    isAnimation = false,
    isBtnReturn = false,
    isScrollDocument = false;

  scrollbar.addListener(status => {
    const offset = status.offset,
      scrollPosition = offset.y + window.innerHeight;

    if (scrollPosition > (vh * 5)) {
      cardsWrapper.classList.add('animation-start');
    }

    if (window.innerWidth > 1024) {
      const btnStopPosition = scrollPosition - (parseInt(btnStyles.top) - parseInt(btnStyles.height));
      if (scrollPosition > (vh * 20)) {
        cardsWrapper.classList.add('animation-start')
      }
      if (offset.y > 0 && !isScrollDocument) {
        gsap.to(btn.querySelector('.order-btn__wrapper')
          , {
            duration: 0.5,
            y: 80,
          })
        isScrollDocument = true;
      } else if (offset.y < 1 && isScrollDocument) {
        gsap.to(btn.querySelector('.order-btn__wrapper')
          , {
            duration: 0.5,
            y: 0,
          })
        isScrollDocument = false;
      }


      if (scrollPosition >= (startAnimationPosition - (vh * 10))) {
        header.classList.add('hidden')
        btn.style.top = btn.style.top - (scrollPosition - btnStopPosition) + 'px';
        gsap.to(btn, {
          duration: 0.6,
          pointerEvents: "none",
          translateY: parseInt(btnStyles.height) + 80,
        })
      } else {
        header.classList.remove('hidden')
        headerOnScroll(offset.y); //header position
        btn.style.top = (btnPosition.top + offset.y) + 'px'; //btn update position
      }
      if (scrollPosition >= startAnimationPosition && !isAnimation) {
        isAnimation = true;
        const tabsOffset = tabsSection.getBoundingClientRect();
        animation5.to(btn, {
          translateY: btnStopPosition / 1.5,
          translateX: 0,
          zIndex: 8,
          scale: 0,
          pointerEvents: "none",
          display: 'none',
          onComplete: () => {
            scrollbar.setPosition(offset.y)
          }
        })
        animation1.fromTo(tabImages, {
          y: 0,
        }, {
          y: tabsOffset.top,
          onComplete: () => {
            setTimeout(() => {
              tabList.classList.add('animation-list')
            }, 200)
            scrollbar.scrollTo(0, offset.y + tabsOffset.top, 1300,)
            animation2.to(tabImages, {
              y: 0,
            })
            animation3.to(tabList, {
              display: 'flex',
              xPercent: 100
              , onComplete: () => {
                tabImages.querySelector('.first-img').classList.add('active')
              }
            }).delay(0.1);
            scrollbar.setPosition(offset.y)
          }
        })
        animation4.to(tabImages, {
          x: 0
        })
      }
      if (scrollPosition <= startAnimationPosition && isAnimation && !isBtnReturn) {
        console.log(' this position before animation')
        animation5.to(btn, {
          translateY: 0,
          translateX: 0,
          zIndex: 1,
          scale: 1,
          pointerEvents: "unset",
          display: 'inline-block',
        })
        btn.style.top = (btnPosition.top + offset.y) + 'px'; //btn update position
        isBtnReturn = true
      }
      if (scrollPosition >= startAnimationPosition && isAnimation && isBtnReturn) {
        animation5.to(btn, {
          scale: 0,
          pointerEvents: "unset",
          display: 'none',
        })
        btn.style.top = btnPosition.top + 'px';
        isBtnReturn = !isBtnReturn
      }
    } else {
      headerOnScroll(status.offset.y);
      btn.style.top = (btnPosition.top + offset.y) + 'px';
      if (scrollPosition >= startAnimationPosition - (vh * 30)) {
        gsap.to(btn, {
          duration: 0.4,
          opacity: 0,
          zIndex: 0,
          ease: Power2.easeOut
        })
      } else {
        gsap.to(btn, {
          duration: 0.4,
          opacity: 1,
          zIndex: 5,
          ease: Power2.easeOut
        })
      }
    }

  });

}
export default scrollFunction;