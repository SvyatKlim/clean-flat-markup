import {slideShow, slideHide} from "./gsapAnimTabs";
import touchDevice from "./touchDevice";

const getImageByAttr = (elem) => {
  let attr = elem.getAttribute('data-name');
  return document.querySelector(`.about__tab__img[data-name=${attr}]`);
}

const tabs = () => {

  const tabsArray = [...document.querySelectorAll('.about__tab__link')];

  tabsArray.forEach((el, i) => {
    let img = getImageByAttr(el);

    function removeHover() {
      if (!img.classList.contains('active')) {
        slideHide(img);
        el.removeEventListener('mouseleave', removeHover);
      }
    }

    if (!touchDevice()) {
      el.addEventListener('mouseenter', () => {
        if (!img.classList.contains('active')) {
          img.style.zIndex = 3;
          slideShow(img);
          el.addEventListener('mouseleave', removeHover)
        }
      });
    }

    el.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (!el.classList.contains('active')) { //Element isn't already active
        let previousImage;
        el.removeEventListener('mouseleave', removeHover);

        tabsArray.forEach((elem, j) => {

          let currentImage = getImageByAttr(elem);

          if (elem.classList.contains('active')) {
            previousImage = currentImage;
            currentImage.style.zIndex = 1;
            elem.classList.remove('active');
            currentImage.classList.remove('active');
          } else if (i === j) {
            img.style.zIndex = 2;
            img.classList.add('active');
            elem.classList.add('active');
          } else {
            currentImage.style.zIndex = 0;
          }

        })
      }

    });
  })

}

export default tabs;