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
    eventSliderBar: ['./event-slider-bar'],

    /* 取回藥水與判定狀態 */
    eventChestGet: ['./event-chest-get'],
    eventChestDetermine: ['./event-chest-determine'],
    eventChestBtnOn: ['./event-chest-btn-on'],
    eventChestStatusDo: ['./event-chest-status-do'],

    /* 藥水 action */
    eventChestUpgrade: ['./event-chest-upgrade'],
    eventChestInception: ['./event-chest-inception'],
    eventChestReady: ['./event-chest-ready'],
    eventChestOpenImmediately: ['./event-chest-open-immediately'],
    eventChestOpen: ['./event-chest-open'],
    eventChestCheck: ['./event-chest-check'],

    eventAwardAreZero: ['./event-award-are-zero'],
    eventAwardGet: ['./event-award-get'],

    eventCountUp: ['./event-count-up'],
    eventBonusPopup: ['./event-bonus-popup'],
    eventOpenFinalPage: ['./event-open-final-page'],

    /* 雲端奇幻魔藥學 */
    eventTutorialInit: ['./tutorial/event-tutorial-init'],

    /* 初始化 */
    eventGameBegin: ['./event-game-begin'],

    /* third party */
    jquery: ['../lib/jquery-3.3.1.min'],
    w3: ['../lib/w3'],
    sweetAlert: ['../lib/sweetalert2.all.min'],
    jqueryCountDown: ['../lib/jquery-time-countdown.min'],
    countUp: ['../lib/countUp.min'],
    babelPolyfill: ['../lib/polyfill.min'],
    cookie: ['../lib/js.cookie.min'],
    slider: ['../lib/bootstrap-slider.min'],

    /* 共用元件 */
    confirmPopup: ['../module-utils/confirm-popup'],
    ajax: ['../module-utils/ajax']
  },

  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }

  // urlArgs: (id, url) => {
  //   /* 時間格式轉換為：yyyyMMddHHmm */
  //   let now = new Date()
  //   let year = now.getFullYear()
  //   let month = now.getMonth() + 1
  //   let date = now.getDate()
  //   let hour = now.getHours()
  //   let minute = now.getMinutes()
  //   let timestamp = `${year}${month}${date}${hour}${minute}`
  //   let appVersion = `appVersion=${timestamp}`
  //   return (url.indexOf('?') === -1 ? '?' : '&') + appVersion
  // }
})

var load = require.load
require.load = (context, moduleId, url) => {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let timestamp = `${year}${month}${date}${hour}${minute}`
  let appVersion = `appVersion=${timestamp}`
  url = `${url}?${appVersion}`
  load(context, moduleId, url)
}

require([], () => {
  /* 一開始沒有return function的 js 必須在這裡require */
  require(['babelPolyfill'])
  require(['eventTutorialInit'])
  require(['eventClickLink'])
  require(['eventUserStatus'])
  require(['eventBonusPopup'])
  require(['eventSliderBar'])

  // 判定使用者裝置
  let determineDevice = () => {
    let userAgent = navigator.userAgent
    let isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )

    if (isMobile) {
      document.getElementById('remind-mask').style.fontSize = '26px'
    }
  }

  // 判定裝置方向
  let determineOrientation = () => {
    let remindMaskTarget = document.getElementById('remind-mask')
    if (window.innerWidth < window.innerHeight) {
      remindMaskTarget.style.display = ''
    } else {
      remindMaskTarget.style.display = 'none'
    }
  }

  determineDevice()
  determineOrientation()
  window.addEventListener('resize', determineOrientation)
})
