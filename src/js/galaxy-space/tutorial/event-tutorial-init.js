define(['jquery', 'ajax', 'confirmPopup', 'confirmTutorial'], ($, ajax, confirmPopup, confirmTutorial) => { // eslint-disable-line
  let chestId, user
  let platformTarget = $('#section_novice .potion.platform-GREEN')
  let greenTarget = $('#section_novice .col-3.GREEN')
  let upgradeBtn = greenTarget.find('.upgrade_btn')

  /********************* 新手村 *********************/
  /* 完成升級教學 */
  let step3_4 = () => {
    upgradeBtn.css({display: 'none'})
    let content = `恭喜你升級成功了！想獲得越好的寶藏，就要越努力的升級魔法藥水哦！
      當然，每次升級魔法藥水都需要一定數量的資源 (e 幣、 寶石)。`

    confirmTutorial.prompt(content, {
      //confirmFn: step3_2(),
    })
  }

  /* 升級成功 */
  let step3_3 = () => {
    ajax('POST', `/chest/upgrade/${chestId}`, {user: user})
      .then(jsonData => {
          platformTarget.find('img').attr('src',
            'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png')

          setTimeout(() => {
            let content = `<div class="confirm-grid-upgrade-container">
                <div class="image-block1">
                    <img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png">
                </div>
                <div class="content-block1">
                    <span>升級成功</span>
                </div>
                <div class="content-block2">
                    <p>恭喜你！恭喜你成功升級至 <span class="highlight">Lv2 魔法藥水</span>，調配出厲害的寶藏的機率又提高了一點啦！</p>
                </div>
              </div>
            `

            confirmPopup.dialog(content,
              {
                confirmFn: step3_4,
                cancelBtnText: '太棒了！',
                isShowCancelButton: false
              })
          }, 3000)
        }
      )
  }

  /* 3-1 開始學習升級 */
  let step3_2 = () => {
    upgradeBtn.css({display: '', left: '27%'})
    upgradeBtn.one('click', () => {
      let content = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-silhouette" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png">
            </div>
            <div class="content-block1 confirm-popup-title-font">
              <span>藥水升級 Lv1 -> Lv2</span>
            </div>
            <div class="content-block2">
              <p>
                升級這個藥水需要花費 
                <span class="highlight">100 個 e 幣、0 個寶石 </span>
                ，由於這次是你第一次升級，本次費用<span class="highlight">完全免費哦！</span>
             </p>
            </div>
          </div>
        `
      confirmPopup.dialog(content,
        {
          confirmFn: step3_3,
          cancelBtnText: '馬上升級',
          isShowCancelButton: false
        })
    })

    let content = '現在，點選「升級」按鈕進行升級'

    confirmTutorial.prompt(content, {
      timer: 2000
    })
  }

  /* 3-1 開始學習升級 */
  let step3_1 = () => {
    let content = `首先，我們先來學習<span class="highlight">如何升級</span>」吧！第一次升級是免費的唷，快來試試看～`

    confirmTutorial.prompt(content, {
      confirmFn: step3_2,
      confirmBtnText: '沒問題'
    })
  }

  /* 2-3 藥水的獲得方式 */
  let step2_3 = () => {
    let content = `當然是真的！ 大部分的藥水你都可以透過
        <span class="highlight">練習名師派卷、自我評量獲得</span>，
        練習得越多，就有機會取得更高級的藥水，調配出更好的寶藏!`

    confirmTutorial.prompt(content, {
      confirmFn: step3_1
    })
  }

  /* 2-2 調配藥水的重要性 */
  let step2_2 = () => {
    let content = `調配藥水是雲端魔法師非常重要的課程，藥水可以調配出生活中大部分的物品，幸運的話還能調配出寶藏喔！`

    confirmTutorial.prompt(content, {
      confirmBtnText: '真的嗎',
      confirmFn: step2_3
    })
  }

  /* 2-1 獲得藥水提示 */
  let step2_1 = () => {
    platformTarget
      .append(`<img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV1.png" 
                        data-chest-tutorial-id="${chestId}">`)

    let content = `太好了！你獲得了 1 個 Lv1 魔法藥水。未來當你獲得藥水時，就會幫你存放在這裡喔！
                 <span class="highlight">基本上，1 次所能擁有的藥水數量上限是 4 個，超過的話是沒辦法再放進來的！</span>
                 因此，定時回來調配藥水是很重要的！`

    confirmTutorial.prompt(content, {
      confirmFn: step2_2
    })
  }

  ajax('GET', `/chest/novice/`)
    .then(jsonData => {
      let chest = jsonData.content
      if (chest) {
        chestId = chest.id
        user = chest.user
        confirmPopup.generalImage('嗨！我是傳奇魔法師',
          '<img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV1.png">',
          step2_1, '領取')
      }
    })
})
