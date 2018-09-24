define(['jquery', 'ajax', 'cookie', 'sweetAlert', 'confirmPopup'],
  ($, ajax, Cookie, sweetAlert, confirmPopup) => { // eslint-disable-line
    let chestId, user
    let noviceTargets = {}
    let platformTarget = $('#section_novice .potion.platform-GREEN')
    let greenTarget = $('#section_novice .col-3.GREEN')
    noviceTargets.platform = platformTarget
    noviceTargets.countdown = greenTarget.find('.count_time')
    noviceTargets.startBtn = greenTarget.find('.mix_btn')
    noviceTargets.upgradeBtn = greenTarget.find('.upgrade_btn')
    noviceTargets.openBtn = greenTarget.find('.mix_finish')
    noviceTargets.readyNowBtn = greenTarget.find('.now_finish')
    let saveCookie = progressiveStep => {
      Cookie.set('progressiveStep', progressiveStep, {
        expire: 1
      })
    }

    let exitRemind = () => {
      // 監聽使用者離開視窗之事件
      window.onbeforeunload = event => {
        ajax('PATCH', `/chest/novice/`, {
          progressiveStep: Cookie.get('progressiveStep')
        })
          .then(() => {

          })
        event.returnValue = false
      }
    }

    /**
     * 使用者上次未完成新手教學，接續前次進度，並從 step_1 重新開始
     */
    let comebackExecFunction = progressiveStep => {
      switch (progressiveStep) {
        case 'STEP2_1': {
          step2_1()
          break
        }
        case 'STEP3_1': {
          step3_1()
          break
        }
        case 'STEP3_4': {
          step3_4()
          break
        }
        case 'STEP4_1': {
          step4_1()
          break
        }
        case 'STEP4_3': {
          step4_3()
          break
        }
        case 'STEP4_4': {
          noviceTargets.openBtn.removeAttr('style')
          step4_4()
          break
        }
        case 'STEP4_5': {
          step4_5()
          break
        }
        case 'STEP5_1': {
          step5_1()
          break
        }
        case 'STEP6_1': {
          step6_1()
          break
        }
        default: {
          step1_1()
          break
        }
      }
    }

    let retrieveNoviceChest = progressiveStep => {
      ajax('GET', `/chest/?isNoviceExisted=true`)
        .then((jsonData) => {
          let chests = jsonData.content

          $('#section_middle_part .potion img, #section_novice .potion img').remove()

          if (chests.length > 0) {
            let chest = chests[0]
            chestId = chest.id
            user = chest.user
            noviceTargets.chestInstance = chest
            noviceTargets.platform
              .append(`<img src="./img/magicImg/LV${chest.level}.png" 
                        data-chest-tutorial-id="${chestId}">`)

            noviceTargets.platformChest = greenTarget.find(`.potion.platform-${chest.colorPlatform} img`)
          }

          comebackExecFunction(progressiveStep)
          exitRemind()
        })
    }

    /********************* 新手村 *********************/
    /* 6_1 功能介紹 */
    let step6_1 = () => {
      let functionDescTarget = $('.function_description')
      let progressiveStep = 'STEP6_1'
      saveCookie(progressiveStep)

      functionDescTarget.removeAttr('style')
      functionDescTarget.find('.finish_novice_btn').one('click', () => {
        ajax('PATCH', `/chest/novice/`, {
          progressiveStep: 'COMPLETED'
        })
        functionDescTarget.fadeOut()
        require(['eventGameBegin'])
      })
    }

    /***** step 5 選擇學院完成 *****/
    /* 5_2 正式成為魔藥學學員 */
    let step5_2 = () => {

      let popupHtml = `
        <p class="left-align">每一個人都需要為學院盡一份心力！
          未來將會有許多團體戰需要你們一起完成喔～
          <span class="highlight">最後最後，我們來了解其他重要的功能吧～！</span>
        </p>
      `

      confirmPopup.dialog(popupHtml,
        {
          width: '70%',
          confirmFn: step6_1,
          customClass: 'confirm_message_box',
          showCancelButton: false
        })
    }

    /* 5_1 註冊學院 */
    let step5_1 = () => {
      let popupHtml = `
        <div class="confirm-grid-academy-container">
          <div class="academy">
            <img src="./img/magicImg/badge_cat.png">
            <p><span class="highlight">貝斯坦特</span></p>
            <p class="left-align">
              來自在神秘異域國度，嬌小的身軀有著無比敏捷與聰慧的力量。
              <span class="highlight">唯有精明機智的人才能把握良機</span>
            </p>
          </div>
          <div class="register">
            <button class="btn message_box_btn_style" data-academy="貝斯坦特" data-badge="cat">選我</button>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_lion.png">
            <p><span class="highlight">格里芬恩</span></p>
            <p class="left-align">
              出身於藏寶豐富的草原，有著沉穩的性格和強烈的正義感。
              <span class="highlight">耐心和毅力引領我們走向王者之路</span>
            </p>           
          </div>
          <div class="register">
            <button class="btn message_box_btn_style" data-academy="格里芬恩" data-badge="lion">選我</button>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_rabbit.png">
            <p><span class="highlight">加卡洛普</span></p>
            <p class="left-align">
              來自繁花盛開的大地，舉止文雅，判斷力強，是幸運的象徵。
              <span class="highlight">迅速果斷的判斷力是成功的必要條件。</span>
            </p>
          </div>
          <div class="register">
            <button class="btn message_box_btn_style" data-academy="加卡洛普" data-badge="rabbit">選我</button>
          </div>
          <div class="academy">
            <img src="./img/magicImg/badge_tiger.png">
            <p><span class="highlight">克拉托斯</span></p>
            <p class="left-align">
              生活在荒蕪的叢林之中，雖來去無蹤但無所畏懼、英勇無比。
              <span class="highlight">前方即使荊棘滿地，也要勇往直前！</span>
            </p>
          </div>
          <div class="register">
            <button class="btn message_box_btn_style" data-academy="克拉托斯" data-badge="tiger">選我</button>
          </div>
        </div>
        <p class="confirm-popup-small-font">※ 請注意，一但選擇後即無法更改喔！</p>
      `

      let academyName = ''
      let badge = ''
      let progressiveStep = 'STEP5_1'
      saveCookie(progressiveStep)

      confirmPopup.dialog(popupHtml,
        {
          width: '90%',
          customClass: 'my_treasure_message_box confirm-popup-academy-height',
          background: '#a6937c',
          showConfirmButton: false,
          showCancelButton: false,
          onOpenFn: () => {
            $('.confirm-grid-academy-container .register button').one('click', event => {
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
              .then(jsonData => {
                let content = jsonData.content
                if (content) {
                  $('#badge.col-4').append(`<img src="./img/magicImg/badge_${badge}.png">`)
                }
                step5_2()
              })
          }
        })
    }
    /*****************************/

    /***** step 4 調配藥水完成 *****/
    /* 4_5_1 新手教學獎勵：縮短前 10 瓶藥水調配時間 */
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
          confirmButtonText: '下一步',
          showCancelButton: false
        })
    }

    /* 4_5 了解調配藥水所需時間 */
    let step4_5 = () => {
      noviceTargets.openBtn.css('display', 'none')
      noviceTargets.platformChest.remove()

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
          width: '80%',
          customClass: 'confirm_message_box confirm-popup-middle-height',
          confirmFn: step4_5_1,
          confirmButtonText: '好的',
          showCancelButton: false
        })
    }

    /* 4-4 完成藥水調配 */
    let step4_4 = () => {
      let popupHtml = `
        太好了！現在可以打開藥水看看調配出什麼東西囉！
        點選<span class="highlight">「調配完成」</span>確認結果吧！～
      `

      /* 調配藥水完成，獲得獎勵 (按下調配完成，儲存進度) */
      require(['eventChestOpen'], eventChestOpen => {
        noviceTargets.openBtn.addClass('press_animation')
        noviceTargets.openBtn.off('click')
        noviceTargets.openBtn.one('click', event => {
          let currentTarget = event.currentTarget
          let allowSamePlatformReOpen

          event.preventDefault()

          allowSamePlatformReOpen = (new Date().getTime() - $(currentTarget).attr('data-lockedAt') > 5000)
          if (!$(currentTarget).attr('data-lockedAt') || allowSamePlatformReOpen) {
            let progressiveStep = 'STEP4_5'
            saveCookie(progressiveStep)
            eventChestOpen(noviceTargets.chestInstance, noviceTargets, step4_5)
          }

          // 每次觸發按鈕時間，即增加時戳，防止連續點擊
          $(currentTarget).attr('data-lockedAt', new Date().getTime())
        })
      })

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 4-3-2 成功調配藥水 */
    let step4_3_2 = () => {
      ajax('PATCH', `/chest/open/immediately/${chestId}`, {
        spendGems: 0
      })
        .then(() => {
            let seconds = 0
            /* 倒數計時秒數設定為 0，讓藥水變成 ready 狀態 */
            require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
              let noviceObj = {
                isNovice: true,
                noviceExecFn: step4_4
              }
              eventCountdown(seconds, noviceTargets.chestInstance, noviceTargets, eventChestReady, noviceObj)
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

      noviceTargets.startBtn.css('display', 'none')
      noviceTargets.readyNowBtn.removeAttr('style')
      noviceTargets.readyNowBtn.addClass('press_animation')

      /* 立即完成調配藥水 (按下立即完成，儲存進度) */
      noviceTargets.readyNowBtn.one('click', () => {
        let progressiveStep = 'STEP4_4'
        saveCookie(progressiveStep)
        step4_3_2()
      })

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 4-2 確認調配藥水 */
    let step4_2 = () => {
      let popupHtml = `現在，點選<span class="highlight">「調配」</span>來烹煮藥水吧！`

      require(['eventChestInception'], eventChestInception => {
        noviceTargets.startBtn.css({display: '', left: '27%'})
        noviceTargets.startBtn.addClass('press_animation')
        noviceTargets.startBtn.off('click')
        noviceTargets.startBtn.one('click', () => {
          let progressiveStep = 'STEP4_3'
          saveCookie(progressiveStep)
          eventChestInception(noviceTargets.chestInstance, noviceTargets, step4_3)
        })
      })

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 4-1 學習調配藥水 */
    let step4_1 = () => {
      let popupHtml = `
        學會升級還不夠喔！
        你必須學會<span class="highlight">「調配藥水」</span>才能成為真正的魔法師。
      `
      let progressiveStep = 'STEP4_1'
      saveCookie(progressiveStep)

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step4_2,
        confirmButtonText: '馬上學'
      })
    }
    /*****************************/

    /***** step 3 升級教學完成 *****/
    /* 3-4 了解升級成本 */
    let step3_4 = () => {
      let popupHtml = `恭喜你升級成功了！想獲得越好的寶藏，就要越努力的升級魔法藥水哦！
      當然，<span class="highlight">每次升級魔法藥水都需要一定數量的資源 (e幣、寶石)</span>。`

      noviceTargets.upgradeBtn.css({display: 'none'})

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step4_1,
      })
    }

    /* 3-3 成功升級 */
    let step3_3 = () => {
      let delay = millisecond => {
        return new Promise(resolve => {
          setTimeout(resolve, millisecond)
        })
      }

      /* 如果升級過程離開，就直接跳到 3_4 */
      let progressiveStep = 'STEP3_4'
      saveCookie(progressiveStep)

      ajax('POST', `/chest/upgrade/${chestId}`, {user: user})
        .then(async jsonData => {
            let upLevel = jsonData.content['upLevel']
            let potionTarget = platformTarget.find('img')

            // 更新寶箱目前等級
            noviceTargets.chestInstance.level = upLevel

            potionTarget.addClass('upgrade_animation')
            await delay(2000)

            potionTarget.attr('src',
              `./img/magicImg/LV${upLevel}.png`)

            potionTarget.removeClass('upgrade_animation')
            await delay(500)

            let popupHtml = `
              <div class="confirm-grid-upgrade-container">
                <div class="image-block1">
                    <img src="./img/magicImg/LV2_box.png">
                </div>
                <div class="content-block1 confirm-popup-title-font">
                    <span>升級成功</span>
                </div>
                <div class="content-block2">
                  <p>恭喜你！成功升級至 <span class="highlight">Lv2 魔法藥水</span>，調配出厲害的寶藏的機率又提高了一點啦！</p>
                </div>
              </div>
            `

            confirmPopup.dialog(popupHtml,
              {
                confirmFn: step3_4,
                confirmButtonText: '太棒了！',
                showCancelButton: false
              })
          }
        )
    }

    /* 3-2 確認升級 */
    let step3_2 = () => {
      noviceTargets.upgradeBtn.css({display: '', left: '27%'})
      noviceTargets.upgradeBtn.addClass('press_animation')
      noviceTargets.upgradeBtn.off('click')
      noviceTargets.upgradeBtn.one('click', () => {
        let popupHtml = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-silhouette" src="./img/magicImg/LV2.png">
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
            confirmButtonText: '馬上升級',
            showCancelButton: false
          })
      })

      let popupHtml = '現在，點選<span class="highlight">「升級」</span>按鈕進行升級。'

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 3-1 學習升級 */
    let step3_1 = () => {
      let popupHtml = `
        首先，我們先來學習<span class="highlight">「如何升級」</span>吧！
        第一次升級是免費的唷，快來試試看～
      `
      let progressiveStep = 'STEP3_1'
      saveCookie(progressiveStep)

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step3_2,
        confirmButtonText: '沒問題'
      })
    }
    /*****************************/

    /***** step 2 獲取藥水完成 *****/
    /* 2-3 了解藥水獲得方式 */
    let step2_3 = () => {
      let popupHtml = `當然是真的！大部分的藥水你都可以透過
        <span class="highlight">練習名師派卷、自我評量獲得</span>，
        練習得越多，就有機會取得更高級的藥水，調配出更好的寶藏！`

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step3_1
      })
    }

    /* 2-2 知悉調配藥水的重要性 */
    let step2_2 = () => {
      let popupHtml = `調配藥水是雲端魔法師非常重要的課程，藥水可以調配出生活中大部分的物品，
        <span class="highlight">幸運的話還能調配出寶藏喔！</span>
      `

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmButtonText: '真的嗎',
        confirmFn: step2_3
      })
    }

    /* 2-1 獲取藥水 */
    let step2_1 = () => {
      let popupHtml = `太好了！你獲得了 1 個 Lv1 魔法藥水。未來當你獲得藥水時，就會幫你存放在這裡喔！
                 <span class="highlight">基本上，1 次所能擁有的藥水數量上限是 4 個，超過的話是沒辦法再放進來的！</span>
                 因此，定時回來調配藥水是很重要的！`
      let progressiveStep = 'STEP2_1'
      saveCookie(progressiveStep)

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step2_2
      })
    }
    /*****************************/

    /***** step 1 初次進入新手教學 *****/
    /* 1_1 發放寶箱 */
    let step1_1 = () => {
      let popupHtml, progressiveStep = 'STEP1_1'
      saveCookie(progressiveStep)

      popupHtml = `
        <p class="common-font left-align">
          嗨！我是傳奇魔法師 Albi，
          初次見面你好 這學期我們要學習<span class="highlight">奇幻魔藥學哦！</span>
          準備好了嗎？首先就讓我送你一個<span class="highlight"> Lv1 魔法藥水 </span>當作見面禮吧！
        </p>
        <img src="./img/magicImg/LV1.png">
      `

      confirmPopup.dialog(popupHtml,
        {
          width: '70%',
          confirmFn: step2_1,
          customClass: 'confirm_message_box confirm-popup-middle-height',
          confirmButtonText: '領取',
          showCancelButton: false
        })
    }

    /***** step 0 判別使用者是否已完成新手教學 *****/
    /* 0-1 新手教學開始 */
    let step0_1 = () => {
      $('#section_middle_part').css({display: 'none'})
      $('#section_novice').removeAttr('style')

      ajax('GET', `/chest/novice/`)
        .then(jsonData => {
          let progressiveStep = jsonData.content

          /* 完成新手教學 */
          if (progressiveStep === 'COMPLETED') {
            require(['eventGameBegin'])
          } else if (progressiveStep !== 'INITIAL') { /* 使用者前次新手教學過程中，離開網頁 */
            let popupHtml = `
              <span class="confirm-popup-title-font left-align">歡迎回來！</span>
              <p class="common-font left-align">
              <span class="highlight">你還有新手教學尚未完成喔！</span>
              每一位魔法學院的新夥伴調都配需要升完級成新手教學，
              趕快和 Albi 繼續學習如何調配奇幻魔藥吧～！
              </p>
            `

            confirmPopup.tutorialPrompt(popupHtml, {
              confirmButtonText: '好的',
              confirmFn: retrieveNoviceChest.bind(retrieveNoviceChest, progressiveStep)
            })
          } else { /* 尚未開始新手教學 */
            retrieveNoviceChest(step1_1)
          }
        })
    }

    step0_1()
  })
