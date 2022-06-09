import gsap from "gsap";
import {Power2} from "gsap/gsap-core";

export const slideShow = (el) => {
  const value = window.offsetWidth;

  gsap.fromTo(el, {
    scale: 1.3,
    zIndex: 3,
    x: window.innerWidth,
    ease: Power2.easeOut,
    duration: 1,
  }, {
    scale: 1,
    x: -value,
    ease: Power2.easeOut,
    duration: 1,
  },);
}

export const slideHide = (el) => {

  gsap.to(el, {
    scale: 1.3,
    x: window.innerWidth,
    ease: Power2.easeOut,
    duration: 1,
    onStart: function () {
      el.style.zIndex = 3;
    },
  });
}