import gsap, {Power2, Power4} from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import headerOnScroll from './headerOnScroll'

gsap.registerPlugin(ScrollTrigger)

const scrollFunction = (container, btnClass) => {

  const btn = document.querySelector(btnClass),
    btnStyles = window.getComputedStyle(btn),
    elem = document.querySelector(container);

  const scrollbar = new LocomotiveScroll({
      el: document.querySelector(container),
      smooth: true,
      getDirection: true,
      smoothMobile: true
    }),
    scrollContent = elem.getBoundingClientRect(),
    introSection = document.querySelector('.intro'),
    introSectionStyles = introSection.getBoundingClientRect(),
    cardsWrapper = document.querySelector('.benefits'),
    cardsWrapperStyles = cardsWrapper.getBoundingClientRect(),
    aboutSection = document.querySelector('.about'),
    aboutSectionStyles = aboutSection.getBoundingClientRect(),
    aboutInfoHeight = document.querySelector('.about__info').offsetHeight,
    tabsSection = document.querySelector('.about__tabs'),
    tabImages = document.querySelector('.about__tabs__images'),
    tabList = document.querySelector('.about__tabs__list'),
    header = document.querySelector('.header'),
    vh = window.innerHeight / 100,
    startAnimationPosition = scrollContent.height - (vh * 15);

  let animation1 = gsap.timeline({defaults: {ease: Power2.easeOut, duration: 0.8}}),
    animation2 = gsap.timeline({defaults: {ease: Power4.easeOut, duration: 1}}),
    animation3 = gsap.timeline({defaults: {ease: Power4.easeOut, duration: 0.9}}),
    animation4 = gsap.timeline({defaults: {ease: Power2.easeIn, duration: 1}}),
    isAnimation = false,
    isBtnReturn = false,
    isScrollDocument = false;

  function onResize() {
    scrollbar.update()
  }

  window.addEventListener('resize', onResize, false);

  function triggerClass(el, className, conditionStarted) {
    if (conditionStarted) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  }

  scrollbar.on('scroll', (status) => {
    const offset = status.scroll,
      scrollPosition = offset.y + window.innerHeight;
    scrollPosition > cardsWrapperStyles.y ? triggerClass(cardsWrapper, 'animation-start', true) : triggerClass(cardsWrapper, 'animation-start', false)
    offset.y > aboutSectionStyles.y ? triggerClass(aboutSection, 'animation-about', true) : triggerClass(aboutSection, 'animation-about', false)

    if (window.innerWidth > 1024) {
      offset.y === introSectionStyles.y ? triggerClass(introSection, 'animation-intro', true) : triggerClass(introSection, 'animation-intro', false)

      if (offset.y > 0 && !isScrollDocument) {
        gsap.to(btn.querySelector('.order-btn__wrapper')
          , {
            duration: 0.5,
            scale: 0.9,
            y: 80,
          })
        isScrollDocument = true;
      } else if (offset.y < 1 && isScrollDocument) {
        gsap.to(btn.querySelector('.order-btn__wrapper')
          , {
            duration: 0.5,
            scale: 1,
            y: 0,
          })
        isScrollDocument = false;
      }


      if (aboutSection.classList.contains('animation-about')) {
        header.classList.add('hidden')
      } else {
        header.classList.remove('hidden')
        headerOnScroll(offset.y); //header position
      }
      if (scrollPosition >= startAnimationPosition && !isAnimation) {
        const tabsOffset = tabsSection.getBoundingClientRect();
        // Btn scale out
        isAnimation = true;
        gsap.to(btn, {
          duration: 2,
          delay: 1,
          translateY: parseInt(btnStyles.height) / 1.5,
          translateX: 0,
          scale: 0,
          zIndex: 0,
          pointerEvents: "none",
        });

        animation1.fromTo(tabImages, {
          y: 0,
        }, {
          y: tabsOffset.top,
          onComplete: () => {
            setTimeout(() => {
              tabList.classList.add('animation-list');
            }, 200)
            scrollbar.scrollTo(offset.y + tabsOffset.top)
            animation2.to(tabImages, {
              y: 0,
            })
            animation3.to(tabList, {
              display: 'flex',
              x: 0,
              onComplete: () => {
                tabImages.querySelector('.first-img').classList.add('active')
              }
            }).delay(0.1);
          }
        })
        animation4.to(tabImages, {
          x: 0
        })
      }
      if (scrollPosition < (scrollContent.height - 1) && status.direction === 'up' && isAnimation === true) {
        gsap.to(btn, {
          duration: 0.6,
          translateY: 0,
          translateX: 0,
          zIndex: 6,
          scale: 1,
          pointerEvents: "unset",
        })
      }
      if (scrollPosition >= (scrollContent.height - 1) && isAnimation === true) {
        gsap.to(btn, {
          duration: 0.6,
          translateY: parseInt(btnStyles.height) / 1.5,
          scale: 0,
          pointerEvents: "unset",
        })
      }
    } else {
      if (aboutSection.classList.contains('animation-about')) {
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
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
      gsap.to(btn.querySelector('.order-btn__wrapper'), {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        borderColor: 'transparent'
      });
    }
  })

}
export default scrollFunction;