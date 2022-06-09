import scrollFunction from './components/gsapSmoothScroll'
import hover from "./components/hover";
import imageSizeCalculation from "./components/imageSizeCalculation";
import tabs from "./components/tabs";
import followCursor from "./components/followCursor";
import navMobile from "./components/navMobile";

document.addEventListener('DOMContentLoaded', function () {
  scrollFunction('.smooth-content', '.order-btn');
  navMobile()
  tabs();
  hover('.js-hover', true);
  hover('.js-card-hover');

  if (window.innerWidth > 1024) {
    imageSizeCalculation();
    followCursor();
  } else {
    document.querySelector('.first-img').classList.add('active')
  }
});