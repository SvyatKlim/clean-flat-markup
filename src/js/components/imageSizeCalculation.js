const imageSizeCalculation = () => {

  function reset(el) {
    el.style.width = '100%';
    el.style.height = '100%';
  }

  function setup(el) {
    const defaultHeight = 800,
      defaultWidth = 1065,
      height = window.innerHeight,
      width = el.offsetWidth;

    const widthBasedOnHeight = (defaultWidth / defaultHeight) * height;

    if (widthBasedOnHeight >= width) {
      el.style.width = widthBasedOnHeight + 'px';
      el.style.height = height + 'px';
    } else {
      const heightBasedOnWidth = (defaultHeight / defaultWidth) * width;
      el.style.width = width + 'px';
      el.style.height = heightBasedOnWidth + 'px';
    }
  }

  const images = [...document.querySelectorAll('.about__tab__img')];
  images.map((el) => setup(el));

  window.addEventListener('resize', () => {
    images.map((el) => reset(el));
    images.map((el) => setup(el));
  });
}

export default imageSizeCalculation;