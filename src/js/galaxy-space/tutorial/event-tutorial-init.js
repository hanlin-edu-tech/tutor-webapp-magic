define(['jquery', 'ajax', 'confirmPopup', 'confirmTutorial'], ($, ajax, confirmPopup, confirmTutorial) => { // eslint-disable-line
  let chestId, user
  let platformTarget = $('#section_novice .potion.platform-GREEN')
  let greenTarget = $('#section_novice .col-3.GREEN')
  let upgradeBtn = greenTarget.find('.upgrade_btn')

  /********************* 新手村 *********************/
  /* 3-1 開始學習升級 */
  let step3_2 = () => {
    upgradeBtn.css({display: '', left: '27%'})
    upgradeBtn.one('click', () => {
      return ajax('POST', `/chest/upgrade/${chestId}`, {user: user})
        .then(jsonData => {
            console.log(jsonData)
            platformTarget.find('img').attr('src',
              'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png')
          }
        )
    })

    let content = '現在，點選「升級」按鈕進行升級'

    confirmTutorial.prompt(content, {})
  }

  /* 3-1 開始學習升級 */
  let step3_1 = () => {
    let content = `首先，我們先來學習<span class="highlight">如何升級</span>」吧！第一次升級是免費的唷，快來試試看～`

    confirmTutorial.prompt(content, {
      confirmFn: step3_2(),
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
