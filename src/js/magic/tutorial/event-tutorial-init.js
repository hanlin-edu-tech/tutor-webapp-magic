define(['jquery', 'ajax', 'sweetAlert', 'confirmPopup'],
  ($, ajax, sweetAlert, confirmPopup) => { // eslint-disable-line
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
    let save = progressiveStep => {
      ajax('POST', `/chest/novice/`, {
          progressiveStep: progressiveStep
        }
      ).then(() => {

      })
    }

    let exitRemind = () => {
      // 監聽使用者離開視窗之事件
      window.onbeforeunload = event => {
        event.returnValue = true
      }
    }

    /**
     * 使用者上次未完成新手教學，接續前次進度，並從 step_1 重新開始
     */
    let comebackExecFunction = progressiveStep => {
      switch (progressiveStep) {
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
        .then(
          jsonData => {
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

              switch (chest.status) {
                case 'LOCKED': {
                  if (chest.level === 1 && progressiveStep === 'STEP2_1') {
                    step2_1()
                  } else if (chest.level === 1) {
                    step1_1()
                  } else {
                    step3_4()
                  }
                  break
                }
                case 'UNLOCKING': {
                  require(['eventChestStatusDo'], eventChestStatusDo => {
                    eventChestStatusDo.unLocking(chest, noviceTargets, step4_3)
                  })
                  step4_3()
                  break
                }
                case 'READY': {
                  noviceTargets.openBtn.removeAttr('style')
                  step4_4()
                  break
                }
                default: {

                }
              }
            } else {
              comebackExecFunction(progressiveStep)
            }

            exitRemind()
          }
        )
    }

    /** ******************* 新手村 *********************/
    /* 6_1 功能介紹 */
    let step6_1 = () => {
      let functionDescTarget = $('.function_description')
      let progressiveStep = 'STEP6_1'
      save(progressiveStep)

      functionDescTarget.removeAttr('style')
      functionDescTarget.find('.finish_novice_btn').one('click', () => {
        ajax('POST', `/chest/novice/`, {
          progressiveStep: 'COMPLETED'
        }).then(() => {
            functionDescTarget.fadeOut()
            require(['eventGameBegin'])
          }
        )
      })
    }

    /** *** step 5 選擇學院完成 *****/
    /* 5_2 正式成為魔藥學學員 */
    let step5_2 = () => {
      let popupHtml = `
        <p class="common-font left-align">每一個人都需要為學院盡一份心力！
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
        <div class="confirm-grid-academy-container" xmlns="http://www.w3.org/1999/html">
          <article>
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
          </article>
          <article>
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
          </article>
          <article>
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
          </article>
          <article>
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
          </article>
        </div>
        <p class="confirm-popup-small-font">※ 請注意，一但選擇後即無法更改喔！</p>
      `

      let academyName = ''
      let badge = ''
      let progressiveStep = 'STEP5_1'
      save(progressiveStep)

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

    /** *** step 4 調配藥水完成 *****/
    /* 4_5_1 新手教學獎勵：縮短前 10 瓶藥水調配時間 */
    let step4_5_1 = () => {
      let popupHtml = `<p class="common-font left-align">別急別急，我還要送你一份大禮物！
        童話鎮鎮長有特別交代，要贈送每位勇士一份大禮物！他們是怎麼教的...劈霹啪滋酷酷唷～哎呀！被你聽到咒語了，
        千萬不要傳出去！要是被我發現你跟別人說，我就我就我就..把水晶球通通沒收(ΦωΦ)總之，
        <span class="highlight">我將你們前10個水晶球的啟動時間大大地縮短了啦！
        完成新手教學之後趕快前往『我的課程』練題拿藥水吧！</span>
        <br/>白毛我那個以前在當老師的那位叫孔子同事說：「三人行，必有我師焉」，團隊的合作比單打獨鬥更容易獲得勝利，
        馬上前往下一步，選擇你想選擇的學院當和裡面的勇士們一起當夥伴吧！</p>
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
      let popupHtml
      let progressiveStep = 'STEP4_5'
      save(progressiveStep)

      noviceTargets.openBtn.css('display', 'none')
      if (noviceTargets.platformChest)
        noviceTargets.platformChest.remove()

      popupHtml = `<p class="common-font left-align">咳咳！白毛長老我幾百年來難得講那麼多話，
        你不要睡著了呀～總之，新手教學即將完成了，你已經算很棒了啦，也已經學會如何將水晶球打開，
        每一個水晶球的調配時間都是固定的，越好的藥水調配的時間就會越長。
        <br/><span class="highlight">Lv1: 1小時；Lv2: 2小時；Lv3: 4小時；</span>
        <br/><span class="highlight">Lv4: 8小時；Lv5: 12小時；Lv6: 24小時</span>
        <br/>請特別記得，每一種資源和寶藏的數量都是有限的，在這裡每一位集訓的勇士們都要靠自己的力量自給自足，
        總之總之，每天固定時間回來關心水晶球，將會是你獲得更好的物資的關鍵！
        </p>
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
      太好了！現在可以打開水晶球看看調配出什麼寶藏了！總之，點選『調配完成』確認結果吧！
      `

      /* 調配藥水完成，獲得獎勵 (按下調配完成，儲存進度) */
      require(['eventChestOpen'], eventChestOpen => {
        noviceTargets.openBtn.addClass('press_animation')
        noviceTargets.openBtn.off('click')
        noviceTargets.openBtn.one('click', event => {
          let currentTarget
          let allowSamePlatformReOpen
          let audioButtonTarget

          event.preventDefault()

          audioButtonTarget = document.getElementById('audio_button')
          audioButtonTarget.play()

          currentTarget = event.currentTarget
          allowSamePlatformReOpen = (new Date().getTime() - $(currentTarget).attr('data-lockedAt') > 5000)
          if (!$(currentTarget).attr('data-lockedAt') || allowSamePlatformReOpen) {
            let progressiveStep = 'STEP4_5'
            save(progressiveStep)
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
      ajax('POST', `/chest/open/immediately/${chestId}`,
        {
          spendGems: 0
        }).then(() => {
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
      let popupHtml
      // 儲存進度
      popupHtml = `啟動後成功產生化學反應通常需要一些時間，你也可以
        <span class="highlight">花費寶石點選『立即完成』加快反應時間</span>
        。總之，為了可以盡快教會你，就再給你一次免費的機會吧！馬上點選『立即完成』按鈕試試看～`

      noviceTargets.startBtn.css('display', 'none')
      noviceTargets.readyNowBtn.removeAttr('style')
      noviceTargets.readyNowBtn.addClass('press_animation')

      /* 立即完成調配藥水 */
      noviceTargets.readyNowBtn.one('click', () => {
        let audioButtonTarget = document.getElementById('audio_button')
        audioButtonTarget.play()
        step4_3_2()
      })

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 4-2 確認調配藥水 */
    let step4_2 = () => {
      let popupHtml = `現在，點選『啟動』來喚起水晶球中的提煉元素彼此產品化學反應吧！`

      require(['eventChestInception'], eventChestInception => {
        noviceTargets.startBtn.css({display: '', left: '27%'})
        noviceTargets.startBtn.addClass('press_animation')
        noviceTargets.startBtn.off('click')
        noviceTargets.startBtn.one('click', () => {
          let audioButtonTarget = document.getElementById('audio_button')
          audioButtonTarget.play()
          eventChestInception(noviceTargets.chestInstance, noviceTargets, step4_3)
        })
      })

      confirmPopup.tutorialPrompt(popupHtml)
    }

    /* 4-1 學習調配藥水 */
    let step4_1 = () => {
      let popupHtml = `
      欸欸欸！別急著走啊～學會升級不夠，你還要學怎麼打開水晶球啊～
      這年頭的孩子怎麼這樣，寶藏都不想拿了，長老我要自己吃掉了哼(ˋдˊ)
      總之，我現在要教了，你們要認真聽阿！
      `

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step4_2,
        confirmButtonText: '馬上學'
      })
    }
    /*****************************/

    /** *** step 3 升級教學完成 *****/
    /* 3-4 了解升級成本 */
    let step3_4 = () => {
      let popupHtml = `升級成功後，比較高等的水晶球就會取代原本水晶球的位置。想獲得越好的寶藏，
      就要越努力的升級水晶球喔～你也很期待其他等級的藥水是用哪些童話提煉出來的吧～總之，
      每次升級都需要一定數量的資源（e幣、寶石），請在特訓中認真收集吧`

      platformTarget.find('img').attr('src', `./img/magicImg/LV2.png`)
      noviceTargets.upgradeBtn.css({display: 'none'})

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step4_1
      })
    }

    /* 3-3 成功升級 */
    let step3_3 = () => {
      let delay = millisecond => {
        return new Promise(resolve => {
          setTimeout(resolve, millisecond)
        })
      }

      ajax('POST', `/chest/upgrade/${chestId}`, {
        originalLevel: 1
      }).then(async jsonData => {
          let upLevel = jsonData.content['upLevel']
          let potionTarget = platformTarget.find('img')
          let audioLevelUpTarget

          require(['eventChestCheck'], eventChestCheck => {
            if (eventChestCheck(jsonData.message, jsonData.content)) {
              return
            }
          })

          // 更新藥水目前等級
          noviceTargets.chestInstance.level = upLevel

          /* 升級音效 */
          audioLevelUpTarget = document.getElementById('audio_level_up')
          audioLevelUpTarget.play()

          potionTarget.addClass('upgrade_animation')
          await delay(1500)

          potionTarget.attr('src',
            `./img/magicImg/LV${upLevel}.png`)

          potionTarget.removeClass('upgrade_animation')
          await delay(500)

          let popupHtml = `
              <div class="confirm-grid-upgrade-container swal2-popup-auto">
                <div class="image-block1">
                    <img src="./img/magicImg/LV2_box.png">
                </div>
                <div class="content-block1 confirm-popup-title-font">
                    <span>升級成功</span>
                </div>
                <div class="content-block2">
                  <p class="small-font">噠啦啦啦啦...猜不到吧！Lv2水晶球就是用大野狼耳朵從上往下數來第87根毛髮、
                  豬大哥、豬二哥驚嚇時哭出來的第2滴眼淚和豬小弟家的第66個紅色磚頭提煉出來的，
                  是個代表勇氣的水晶球呀！總之，恭喜你啦，成功升級到Lv2水晶球，
                  調配出厲害寶藏的機率又提高一點了呢，希望你也多了一些勇氣喔！
                  </p>
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
          <div class="confirm-grid-upgrade-container swal2-popup-auto">
            <div class="image-block1">
              <img class="image-silhouette" src="./img/magicImg/LV2.png">
            </div>
            <div class="content-block1 confirm-popup-title-font">
              <span>藥水升級</span>
            </div>
            <div class="content-block2">
              <p class="small-font">
                <span class="highlight">升級Lv1水晶球需要花費300個e幣</span>
                ，不過，因為這是你第一次升級，白毛長老我就施點魔法讓你
                <span class="highlight">這次免費升級</span>
                吧！你問我為什麼會魔法？總之，知道得越多，對你的特訓一點幫助也沒用，
                小孩子不要問那麼多！不如猜猜Lv2水晶球是用什麼童話元素提煉出來的吧！
              </p>
            </div>
          </div>
        `

        let audioButtonTarget = document.getElementById('audio_button')
        audioButtonTarget.play()

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

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step3_2,
        confirmButtonText: '沒問題'
      })
    }
    /*****************************/

    /** *** step 2 獲取藥水完成 *****/
    /* 2-3 了解藥水獲得方式 */
    let step2_3 = () => {
      let popupHtml = `總之總之，就是這樣沒錯啦！白毛長老長到這把歲數，說謊的次數比你看過的巨人還少。大部分的水晶球都可以
        <span class="highlight">透過 練習名師派卷、自我評量</span>，
        獲得，偶爾在其他活動中也有機會贈送喔！特訓的越勤勞，就有機會取得越高級的水晶球，獲得更好的寶藏喔～`

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step3_1
      })
    }

    /* 2-2 知悉調配藥水的重要性 */
    let step2_2 = () => {
      let popupHtml = `特訓是需要很多體力和資源的，童話鎮的鎮長深深了解了這一點，所以提煉了很多水晶球送給各位勇士。
      總之，我們可以從裡面調配出大部分特訓需要的物品，如果你夠幸運，調配出厲害的寶藏，那個寶藏就直接歸你啦！
      `

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmButtonText: '真的嗎',
        confirmFn: step2_3
      })
    }

    /* 2-1 獲取藥水 */
    let step2_1 = () => {
      let popupHtml
      let progressiveStep = 'STEP2_1'
      save(progressiveStep)

      popupHtml = `要放好喔！水晶球極其珍貴又容易破，長老我每次收到的時候都很緊張，年紀大了實在很...(咳咳，長老你講重點），喔對，反正就是你收到水晶球時會放在這裡，
                 <span class="highlight">基本上，1次所能擁有的數量上限是4個，超過的話就沒辦法再放進來了！</span>
                 總之，定時回來打開他是很重要的喔～`

      confirmPopup.tutorialPrompt(popupHtml, {
        confirmFn: step2_2
      })
    }
    /*****************************/

    /** *** step 1 初次進入新手教學 *****/
    /* 1_1 發放藥水 */
    let step1_1 = () => {
      let popupHtml = `
        <p class="common-font-m left-align">
        嗨！我是住在雲端鎮深山那位人人尊敬、人人喜歡、人人...(咳咳，長老你講太多廢話了啦)，
        好的，總之我是白毛長老，今年我們要養精蓄銳幫隔壁的童話鎮對抗笨笨的巨人族、保衛家園。
        總之總之，話不多說，我們就馬上開始吧！準備好了嗎？總之我就先送你一個
        <span class="highlight">Lv1的小木偶水晶球</span>
        ，這可是童話鎮為了感謝我們特別提煉的物資來源哦！
        </p>
        <img class="confirm-popup-common-img-small" src="./img/magicImg/LV1.png">
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

    /** *** step 0 判別使用者是否已完成新手教學 *****/
    /* 0-1 新手教學開始 */
    let step0_1 = () => {
      $('#section_middle_part').css({display: 'none'})
      $('#section_novice').removeAttr('style')

      require(['eventSlideAwardsShow'], eventSlideAwardsShow => {
        let isNovice = true
        eventSlideAwardsShow(isNovice)
      })

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
              你上次就這樣走了，真是傷透了白毛長老的心 ╥﹏╥
              你還有新手教學尚未完成喔！每一位新夥伴都需要完成新手教學，才能完全擁有水晶球的所有權限喔！
              趕快跟著我一起學習如何打開水晶球收集資源吧！
              </p>
            `

            confirmPopup.tutorialPrompt(popupHtml, {
              confirmButtonText: '好的',
              confirmFn: retrieveNoviceChest.bind(retrieveNoviceChest, progressiveStep)
            })
          } else { /* 尚未開始新手教學 */
            retrieveNoviceChest()
          }
        })
    }

    step0_1()
  })
