const myModule = (function () {
  const CLASSES = {
    animateClick: 'animateClick',
    selectionDone: 'selectionDone',
    icon: 'icon',
    today: 'today'
  };
  const SELECTOR = {
    animateClick: `.${CLASSES.animateClick}`,
    icon: `.${CLASSES.icon}`,
    today: `.${CLASSES.today}`
  };
  const $ = {};

  function setElements() {
    $.icons = document.querySelectorAll(SELECTOR.icon);
    $.today = document.querySelector(SELECTOR.today);
  }

  function onClickIcon(event) {
    // Remove possible added
    const $previusSelectedIcon = document.querySelector(SELECTOR.animateClick);

    if ($previusSelectedIcon) {
      $previusSelectedIcon.classList.remove(CLASSES.animateClick);
    }

    event.target.classList.add(CLASSES.animateClick);
    document.body.classList.add(CLASSES.selectionDone);
  }

  function addEventListeners() {
    $.icons.forEach(($icon) => {
      $icon.addEventListener('click', onClickIcon);
    });
  }

  function setToday() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $.today.innerText = new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function init() {
    setElements();
    addEventListeners();
    setToday();
  }

  return {
    init
  };
}());

myModule.init();
