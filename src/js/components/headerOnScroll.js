const headerOnScroll = (offsetY) => {
  const header = document.querySelector('.header')

  if (offsetY > 1) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
};

export default headerOnScroll;
