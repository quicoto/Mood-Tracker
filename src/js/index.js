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
    icon: 'icon',
    today: 'today'
  };
  const SELECTOR = {
    selected: `.${CLASSES.selected}`,
    icon: `.${CLASSES.icon}`,
    loadingContainer: '.loadingContainer',
    notifyMe: '.notifyMe',
    today: `.${CLASSES.today}`
  };
  const $ = {};
  const _ = {
    api: {
      new: './api/new.php'
    },
    notifications: {
      hourOfDay: 21,
      interval: 2700000
    }
  };

  function setElements() {
    $.loadingContainer = document.querySelector(SELECTOR.loadingContainer);
    $.icons = document.querySelectorAll(SELECTOR.icon);
    $.today = document.querySelector(SELECTOR.today);
    $.notifyMe = document.querySelector(SELECTOR.notifyMe);
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
      $.loadingContainer.setAttribute('hidden', 'true');
    }
  }

  function onClickIcon(event) {
    event.preventDefault();
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
  }


  function pushNotification() {
    const now = new Date();
    if (now.getHours() !== _.notifications.hourOfDay) return false;

    const notification = new Notification('How are you feeling today?');

    return notification;
  }

  function addNotifications() {
    if (('Notification' in window)) {
      // Let's check whether notification permissions have already been granted
      if (Notification.permission === 'granted') {
        window.setInterval(pushNotification, _.notifications.interval);
      }

      // Otherwise, we need to ask the user for permission
      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === 'granted') {
            window.setInterval(pushNotification, _.notifications.interval);
          }
        });
      }
    }
  }

  function addEventListeners() {
    $.icons.forEach(($icon) => {
      $icon.addEventListener('click', onClickIcon);
    });
    $.notifyMe.addEventListener('click', addNotifications);
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
