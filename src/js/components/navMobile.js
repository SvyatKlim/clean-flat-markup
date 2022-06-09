export default function navMobile(burgerBtn = '.js-nav', nav = '.js-nav-aside', subMenu = '.js-nav-overlay', overlay = '.js-nav-overlay') {

  const btn = document.querySelector(burgerBtn),
    navigation = document.querySelector(nav),
    menuItems = [...document.querySelectorAll('.menu-item a')],
    navOverlay = document.querySelector(overlay);

  function openNav() {
    btn.classList.add('active');
    navigation.classList.remove('close')
    navigation.classList.add('open');
    navOverlay.classList.add('open-menu');
  }

  function closeNav() {
    btn.classList.remove('active');
    navigation.classList.add('close')
    navigation.classList.remove('open');
    navOverlay.classList.remove('open-menu');
    navOverlay.classList.add('close');

    setTimeout(() => {
      navOverlay.classList.remove('close');
    }, 800);
  }

  menuItems.forEach((el) => {
    el.addEventListener('click', () => closeNav());
  })

  btn.addEventListener('click', (ev) => {
    if (ev.currentTarget.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navOverlay.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('open-menu')) {
      closeNav();
    }
  });

}
