require.config({
  shim: {
    dialog: ['jquery'],
    jqueryCountDown: ['jquery'],
    w3: {
      exports: 'w3'
    }
  },

  paths: {
    /* 銀河星際初始化 */
    eventClickLink: ['./event-click-link'],
    eventTotalAssets: ['./event-total-assets'],
    eventSlideShow: ['./event-slide-show'],
    eventCountdown: ['./event-countdown'],
    eventUserStatus: ['./event-user-status'],

    /* 取回寶箱與判定狀態 */
    eventChestGet: ['./event-chest-get'],
    eventChestDetermine: ['./event-chest-determine'],
    eventChestBtnOn: ['./event-chest-btn-on'],
    eventChestStatusDo: ['./event-chest-status-do'],

    /* 寶箱 action */
    eventChestUpgrade: ['./event-chest-upgrade'],
    eventChestStart: ['./event-chest-start'],
    eventChestReady: ['./event-chest-ready'],
    eventChestOpenImmediately: ['./event-chest-open-immediately'],
    eventChestOpen: ['./event-chest-open'],
    eventChestInspection: ['./event-chest-inspection'],

    eventAwardAreZero: ['./event-award-are-zero'],
    eventAwardGet: ['./event-award-get'],

    eventCountUp: ['./event-count-up'],
    eventBonusPopup: ['./event-bonus-popup'],
    eventOpenFinalPage: ['./event-open-final-page'],
    /* third party */
    jquery: ['../lib/jquery-3.3.1.min'],
    w3: ['../lib/w3'],
    swal: ['../lib/sweetalert2'],
    jqueryCountDown: ['../lib/jquery-time-countdown.min'],
    countUp: ['../lib/countUp.min'],
    bluebird: ['../lib/bluebird.min'],
    cookie: ['../lib/js.cookie.min'],

    /* 共用元件 */
    confirmPopup: ['../module-utils/confirm-popup'],
    ajax: ['../module-utils/ajax']
  },

  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }
})

require(['jquery', 'ajax'], () => {
  /* 一開始沒有return function的 js 必須在這裡require */
  require(['bluebird'], function (Promise) {
    window.Promise = Promise
  })
  require(['eventClickLink'])
  require(['eventSlideShow'])
  require(['eventUserStatus'])
  require(['eventTotalAssets'])
  require(['eventAwardGet'], (eventAwardGet) => {
    eventAwardGet()
  })
  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })
  require(['eventBonusPopup'])
  require(['eventOpenFinalPage'])
})
