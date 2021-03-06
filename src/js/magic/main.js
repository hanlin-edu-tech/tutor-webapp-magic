require.config({
    waitSeconds: 0,
    shim: {
        dialog: ["jquery"],
        jqueryCountDown: ["jquery"],
        w3: {
            exports: "w3"
        }
    },

    paths: {
        /* 銀河星際初始化 */
        eventClickLink: ["./event-click-link"],
        eventTotalAssets: ["./event-total-assets"],
        eventSlideAwardsShow: ["./event-slider-awards-show"],
        eventSliderAudioBar: ["./event-slider-audio-bar"],
        eventCountdown: ["./event-countdown"],
        eventUserStatus: ["./event-user-status"],

        /* 取回藥水與判定狀態 */
        eventChestGet: ["./chest/event-chest-get"],
        eventChestDetermine: ["./chest/event-chest-determine"],
        eventChestBtnOn: ["./chest/event-chest-btn-on"],
        eventChestStatusDo: ["./chest/event-chest-status-do"],

        /* 藥水 action */
        eventChestUpgrade: ["./chest/event-chest-upgrade"],
        eventChestInception: ["./chest/event-chest-inception"],
        eventChestReady: ["./chest/event-chest-ready"],
        eventChestOpenImmediately: ["./chest/event-chest-open-immediately"],
        eventChestOpen: ["./chest/event-chest-open"],
        eventChestCheck: ["./chest/event-chest-check"],

        eventAwardAreZero: ["./event-award-are-zero"],
        eventAwardGet: ["./event-award-get"],

        eventCountUp: ["./event-count-up"],
        eventBonusPopup: ["./event-bonus-popup"],
        eventOpenFinalPage: ["./event-open-final-page"],

        /* 雲端奇幻魔藥學 */
        eventTutorialInit: ["./tutorial/event-tutorial-init"],

        /* 雲端排行榜 */
        eventRankingPopup: ["./ranking/event-ranking-popup"],
        eventRankingTop: ["./ranking/event-ranking-top"],
        eventRankingAcademy: ["./ranking/event-ranking-academy"],
        eventRankingMy: ["./ranking/event-ranking-my"],
        eventRankingReward: ["./ranking/event-ranking-reward"],
        eventRankingHistory: ["./ranking/event-ranking-history"],

        /* 初始化 */
        eventGameBegin: ["./event-game-begin"],

        /* third party */
        jquery: ["../lib/jquery-3.3.1.min"],
        w3: ["../lib/w3"],
        sweetAlert: ["../lib/sweetalert2.all.min"],
        jqueryCountDown: ["../lib/jquery-time-countdown.min"],
        countUp: ["../lib/countUp.min"],
        babelPolyfill: ["../lib/polyfill.min"],
        cookie: ["../lib/js.cookie.min"],
        slider: ["../lib/bootstrap-slider.min"],

        /* 共用元件 */
        confirmPopup: ["../module-utils/confirm-popup"],
        ajax: ["../module-utils/ajax"],
        commonUtil: ["../module-utils/common-util"]
    },

    map: {
        "*": {
            jQuery: "jquery"
        }
    }
});

let requireLoad = require.load;
require.load = (context, moduleId, url) => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let timestamp = `${year}${month}${date}${hour}${minute}`;
    let appVersion = `appVersion=${timestamp}`;
    url = `${url}?${appVersion}`;
    requireLoad(context, moduleId, url);
};

require([], () => {
    /* 一開始沒有return function的 js 必須在這裡require */
    require(["babelPolyfill"]);
    require(["eventTutorialInit"]);
    require(["eventClickLink"]);
    require(["eventUserStatus"]);
    require(["eventBonusPopup"]);
    require(["eventSliderAudioBar"]);

    // 判定使用者裝置
    let determineDevice = () => {
        let userAgent = navigator.userAgent;
        let isMobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

        if (isMobile) {
            document.getElementById("remind-mask").style.fontSize = "26px";
        }
    };

    // 判定裝置方向
    let determineOrientation = () => {
        let remindMaskTarget = document.getElementById("remind-mask");
        if (window.innerWidth < window.innerHeight) {
            remindMaskTarget.style.display = "";
        } else {
            remindMaskTarget.style.display = "none";
        }
    };

    determineDevice();
    determineOrientation();
    window.addEventListener("resize", determineOrientation);
});

var isOldEventPage = new RegExp('^.*\/app\/magic\/$').test(window.location.href);
var isOldEventPageIndex = new RegExp('^.*\/app\/magic\/index\.html$').test(window.location.href);
if(isOldEventPage || isOldEventPageIndex){
    window.location.href = "/app/points-activity/"
}