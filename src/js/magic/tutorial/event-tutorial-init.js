define(['jquery', 'ajax', 'sweetAlert', 'confirmPopup', 'confirmTutorial', 'eventGameStart'],
  ($, ajax, sweetAlert, confirmPopup, confirmTutorial, eventGameStart) => { // eslint-disable-line
    let chest, chestId, user
    let targets = {}
    let platformTarget = $('#section_novice .potion.platform-GREEN')
    let greenTarget = $('#section_novice .col-3.GREEN')
    targets.platform = platformTarget
    targets.countdown = greenTarget.find('.count_time')
    targets.startBtn = greenTarget.find('.mix_btn')
    targets.upgradeBtn = greenTarget.find('.upgrade_btn')
    targets.openBtn = greenTarget.find('.mix_finish')
    targets.readyNowBtn = greenTarget.find('.now_finish')

    /********************* 新手村 *********************/
    let step6 = () => {

    }


    /***** step 5 選擇學院完成 *****/
    /* 正式成為魔藥學學員 */
    let step5_2 = () => {
      let popupHtml = `<p>每一個人都需要為學院盡一份心力！
        未來將會有許多團體戰需要你們一起完成喔～最後最後，我們來了解其他重要的功能吧~！
        </p>
      `

      confirmPopup.dialog(popupHtml,
        {
          width: '70%',
          confirmFn: step5_1,
          customClass: 'confirm_message_box',
          showCancelButton: false
        })
    }

    /* 註冊學院 */
    let step5_1 = () => {
      let popupHtml = `
        <div class="confirm-grid-academy-container">
          <div class="academy">
            <img src="./img/magicImg/badge_cat.png">
            <p>
              <span class="highlight">學院名稱</span><br/>學院介紹
            </p>
            <br/>
            <btn class="btn message_box_btn_style" data-academy="tigerName" data-badge="tiger">選我</btn>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_lion.png">
              <p>
              <span class="highlight">學院名稱</span><br/>學院介紹
            </p>
            <br/>
            <btn class="btn message_box_btn_style" data-academy="tigerName" data-badge="tiger">選我</btn>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_rabbit.png">
            <p>
              <span class="highlight">學院名稱</span><br/>學院介紹
            </p>
            <br/>
            <btn class="btn message_box_btn_style" data-academy="tigerName" data-badge="tiger">選我</btn>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_tiger.png">
            <p>
              <span class="highlight">學院名稱</span><br/>學院介紹
            </p>
            <br/>
            <btn class="btn message_box_btn_style" data-academy="tigerName" data-badge="tiger">選我</btn>
          </div>
        </div>
      `

      let academyName = ''
      let badge = ''
      confirmPopup.dialog(popupHtml,
        {
          width: '90%',
          customClass: 'my_treasure_message_box confirm-popup-middle-height',
          background: '#a6937c',
          showConfirmButton: false,
          showCancelButton: false,
          onOpenFn: () => {
            $('.confirm-popup-middle-height div.academy .btn').one('click', event => {
              let currentTarget = event.currentTarget
              academyName = $(currentTarget).data('academy')
              badge = $(currentTarget).data('badge')
              sweetAlert.clickConfirm()
            })
          },
          confirmFn: () => {
            ajax('POST', `/currencyBank/totalAssets/academy`, {
              academyName: academyName,
              badge: badge
            })
              .then(() => {
                  step5_2()
                }
              )
          }
        })
    }
    /*****************************/

    /***** step 4 調配藥水完成 *****/
    /* 新手教學獎勵：縮短前 10 瓶藥水調配時間 */
    let step4_5_1 = () => {
      let popupHtml = `<p class="common-font left-align">別急別急，我還要送你一份大禮物！
        劈劈啪滋酷酷唷～為了讓魔法學員們更快學會魔藥學，
        <span class="highlight">我將你們前 10 瓶藥水的調配時間大大的縮短了喔！
        完成新手教學之後趕快前往「我的課程」練題拿寶箱吧！</span>
        成為魔法師的第一步驟就是拜師學藝，前往下一步，選擇你想選擇的學院吧！</p>
      `

      confirmPopup.dialog(popupHtml,
        {
          width: '70%',
          confirmFn: step5_1,
          customClass: 'confirm_message_box confirm-popup-middle-height',
          confirmBtnText: '下一步',
          showCancelButton: false
        })
    }

    /* 了解調配藥水所需時間 */
    let step4_5 = () => {
      let popupHtml = `<p class="common-font left-align">嘿嘿，別睡著了！新手教學即將完成囉～
        你已經很棒了，也學會了如何調配藥水，每一個藥水的調配時間都是固定的，
        越好的藥水調配時間就會越長： 
        <br/><span class="highlight">Lv1: 1小時；Lv2: 2小時；Lv3: 4小時；</span>
        <br/><span class="highlight">Lv4: 8小時；Lv5: 12小時；Lv6: 24小時</span>
        <br/>記得每一個寶藏是有限的，每個雲端魔法學徒都有可能是你的競爭對手，
        每天固定時間回來參加，將會是你獲勝的關鍵！</p>
      `

      confirmPopup.dialog(popupHtml,
        {
          width: '75%',
          customClass: 'confirm_message_box confirm-popup-middle-height',
          confirmFn: step4_5_1,
          confirmBtnText: '好的',
          showCancelButton: false
        })
    }

    /* 4-4 完成調配 */
    let step4_4 = () => {
      let popupHtml = `太好了！現在可以打開藥水看看調配出什麼東西囉！
        點選<span class="highlight">「調配完成」</span>確認結果吧！～
      `

      /* 開啟藥水 */
      require(['eventChestOpen'], eventChestOpen => {
        targets.openBtn.off('click')
        targets.openBtn.one('click', event => {
          let currentTarget = event.currentTarget
          let allowSamePlatformReOpen
          event.preventDefault()

          allowSamePlatformReOpen = (new Date().getTime() - $(currentTarget).attr('data-lockedAt') > 5000)
          if (!$(currentTarget).attr('data-lockedAt') || allowSamePlatformReOpen) {
            eventChestOpen(chest, targets, step4_5)
          }

          // 每次觸發按鈕時間，即增加時戳，防止連續點擊
          $(currentTarget).attr('data-lockedAt', new Date().getTime())
        })
      })

      confirmTutorial.prompt(popupHtml)
    }

    /* 4-3-2 成功調配藥水 */
    let step4_3_2 = () => {
      let isNovice = true
      ajax('PATCH', `/chest/open/immediately/${chestId}`, {
        spendGems: 0
      })
        .then(() => {
            let seconds = 0
            /* 倒數計時秒數設定為 1，讓藥水變成 ready 狀態 */
            require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
              targets.execAnotherFn = step4_4
              eventCountdown(seconds, chest, targets, eventChestReady, isNovice)
            })
          }
        )
    }

    /* 4-3 等待調配藥水之時間，且學習立即完成藥水之調配 */
    let step4_3 = () => {
      let popupHtml = `通常製作藥水都是需要一些時間的唷！
        <span class="highlight">你也可以花費寶石「立即完成」直接結束倒數！</span>
        為了可以盡快教會你，就再給你一次免費的機會吧！
        馬上點選按鈕試試看～`

      targets.readyNowBtn.removeAttr('style')
      targets.startBtn.css('display', 'none')
      targets.readyNowBtn.one('click', step4_3_2)

      confirmTutorial.prompt(popupHtml)
    }

    /* 4-2 確認調配藥水 */
    let step4_2 = () => {
      let popupHtml = `現在，點選<span class="highlight">「調配」</span>來烹煮藥水吧！`

      targets.startBtn.css({display: '', left: '27%'})
      require(['eventChestStart'], eventChestStart => {
        targets.startBtn.off('click')
        targets.startBtn.one('click', eventChestStart.bind(eventChestStart, chest, targets, step4_3))
      })

      confirmTutorial.prompt(popupHtml)
    }

    /* 4-1 學習調配藥水 */
    let step4_1 = () => {
      let popupHtml = `學會升級還不夠喔！
      你必須學會<span class="highlight">「調配藥水」</span>才能成為真正的魔法師。
    `

      confirmTutorial.prompt(popupHtml, {
        confirmFn: step4_2,
        confirmBtnText: '馬上學'
      })
    }
    /*****************************/

    /***** step 3 升級教學完成 *****/
    /* 3-4 了解升級成本 */
    let step3_4 = () => {
      targets.upgradeBtn.css({display: 'none'})
      let popupHtml = `恭喜你升級成功了！想獲得越好的寶藏，就要越努力的升級魔法藥水哦！
      當然，<span class="highlight">每次升級魔法藥水都需要一定數量的資源 (e幣、寶石)</span>。`

      confirmTutorial.prompt(popupHtml, {
        confirmFn: step4_1,
      })
    }

    /* 3-3 成功升級 */
    let step3_3 = () => {
      ajax('POST', `/chest/upgrade/${chestId}`, {user: user})
        .then(jsonData => {
            platformTarget.find('img').attr('src',
              'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png')

            // 更新寶箱目前等級
            chest.level = jsonData.content['upLevel']

            setTimeout(() => {
              let popupHtml = `<div class="confirm-grid-upgrade-container">
                  <div class="image-block1">
                      <img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png">
                  </div>
                  <div class="content-block1 confirm-popup-title-font">
                      <span>升級成功</span>
                  </div>
                  <div class="content-block2">
                    <p>恭喜你！恭喜你成功升級至 <span class="highlight">Lv2 魔法藥水</span>，調配出厲害的寶藏的機率又提高了一點啦！</p>
                  </div>
                </div>
              `

              confirmPopup.dialog(popupHtml,
                {
                  confirmFn: step3_4,
                  cancelBtnText: '太棒了！',
                  showCancelButton: false
                })
            }, 3000)
          }
        )
    }

    /* 3-2 確認升級 */
    let step3_2 = () => {
      targets.upgradeBtn.css({display: '', left: '27%'})
      targets.upgradeBtn.off('click')
      targets.upgradeBtn.one('click', () => {
        let popupHtml = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-silhouette" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV2.png">
            </div>
            <div class="content-block1 confirm-popup-title-font">
              <span>藥水升級</span>
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
        confirmPopup.dialog(popupHtml,
          {
            confirmFn: step3_3,
            cancelBtnText: '馬上升級',
            showCancelButton: false
          })
      })

      let popupHtml = '現在，點選<span class="highlight">「升級」</span>按鈕進行升級。'

      confirmTutorial.prompt(popupHtml)
    }

    /* 3-1 學習升級 */
    let step3_1 = () => {
      let popupHtml = `首先，我們先來學習<span class="highlight">「如何升級」</span>吧！
      第一次升級是免費的唷，快來試試看～
    `

      confirmTutorial.prompt(popupHtml, {
        confirmFn: step3_2,
        confirmBtnText: '沒問題'
      })
    }
    /*****************************/

    /***** step 2 獲取藥水完成 *****/
    /* 2-3 了解藥水獲得方式 */
    let step2_3 = () => {
      let popupHtml = `當然是真的！大部分的藥水你都可以透過
        <span class="highlight">練習名師派卷、自我評量獲得</span>，
        練習得越多，就有機會取得更高級的藥水，調配出更好的寶藏！`

      confirmTutorial.prompt(popupHtml, {
        confirmFn: step3_1
      })
    }

    /* 2-2 知悉調配藥水的重要性 */
    let step2_2 = () => {
      let popupHtml = `調配藥水是雲端魔法師非常重要的課程，藥水可以調配出生活中大部分的物品，幸運的話還能調配出寶藏喔！`

      confirmTutorial.prompt(popupHtml, {
        confirmBtnText: '真的嗎',
        confirmFn: step2_3
      })
    }

    /* 2-1 獲取藥水 */
    let step2_1 = () => {
      platformTarget
        .append(`<img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV1.png" 
                        data-chest-tutorial-id="${chestId}">`)

      let popupHtml = `太好了！你獲得了 1 個 Lv1 魔法藥水。未來當你獲得藥水時，就會幫你存放在這裡喔！
                 <span class="highlight">基本上，1 次所能擁有的藥水數量上限是 4 個，超過的話是沒辦法再放進來的！</span>
                 因此，定時回來調配藥水是很重要的！`

      confirmTutorial.prompt(popupHtml, {
        confirmFn: step2_2
      })
    }
    /*****************************/

    /* 1-1 初次見面 */
    let step1_1 = () => {
      ajax('GET', `/chest/novice/`)
        .then(jsonData => {
          chest = jsonData.content
          if (chest) {
            chestId = chest.id
            user = chest.user
            $('#section_middle_part').css({display: 'none'})
            $('#section_novice').removeAttr('style')
            let popupHtml = `<p class="common-font left-align">
              嗨！我是傳奇魔法師 Albi，
              初次見面你好 這學期我們要學習<span class="highlight">奇幻魔藥學哦！</span>
              準備好了嗎？首先就讓我送你一個<span class="highlight"> Lv1 魔法藥水 </span>當作見面禮吧！
              </p>
              <img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV1.png">
            `

            // 監聽使用者離開視窗之事件
            window.onbeforeunload = function (event) {
              event.returnValue = false
            }

            confirmPopup.dialog(popupHtml,
              {
                width: '70%',
                confirmFn: step2_1,
                customClass: 'confirm_message_box confirm-popup-middle-height',
                confirmBtnText: '領取',
                showCancelButton: false
              })
          } else {
            eventGameStart()
          }
        })
    }

    step1_1()
  })
