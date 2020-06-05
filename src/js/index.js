if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./js/sw.js')
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Service Worker Registered');
    });
}

const app = (function () {
  const CLASSES = {
    selected: 'selected',
    selectionDone: 'selectionDone', // This class can also be found in head.php
    icon: 'icon',
    today: 'today'
  };
  const SELECTOR = {
    selected: `.${CLASSES.selected}`,
    icon: `.${CLASSES.icon}`,
    loadingContainer: '.loadingContainer',
    today: `.${CLASSES.today}`
  };
  const $ = {};
  const _ = {
    api: {
      new: './api/new.php'
    }
  };

  function setElements() {
    $.loadingContainer = document.querySelector(SELECTOR.loadingContainer);
    $.icons = document.querySelectorAll(SELECTOR.icon);
    $.today = document.querySelector(SELECTOR.today);
  }

  function postReaction(data = {}) {
    // Default options are marked with *
    return fetch(_.api.new, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then((response) => response.json()); // parses response to JSON
  }

  function removeSelected() {
    // Remove possible added
    const $previusSelectedIcon = document.querySelector(SELECTOR.selected);

    if ($previusSelectedIcon) {
      $previusSelectedIcon.classList.remove(CLASSES.selected);
    }
  }

  /**
   * @param  {boolean} status
   */
  function loading(status) {
    if (status === true) {
      $.loadingContainer.removeAttribute('hidden');
    } else {
      $.loadingContainer.addAttribute('hidden');
    }
  }

  function onClickIcon(event) {
    loading(true);
    removeSelected();

    postReaction({
      type: event.target.dataset.type
    })
      .then((data) => {
        loading(false);
        // eslint-disable-next-line no-console
        console.log(data);
      });

    event.target.classList.add(CLASSES.selected);
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

const $app = document.querySelector('.app');

if ($app) {
  app.init();
}
