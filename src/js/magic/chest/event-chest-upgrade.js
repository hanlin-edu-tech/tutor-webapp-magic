define(['jquery', 'ajax', 'confirmPopup', 'eventChestCheck'], ($, ajax, confirmPopup, eventChestCheck) => {// eslint-disable-line
  let eventChestUpgrade = {}
  let delay = millisecond => {
    return new Promise(resolve => {
      setTimeout(resolve, millisecond)
    })
  }

  eventChestUpgrade.composeLevelUpResult = jsonDataContent => {
    let result = jsonDataContent[0]
    let upLevel = parseInt(result.memo.upLevel)
    result.html = `<div class="confirm-grid-upgrade-container">
        <div class="image-block1">
          <img src="./img/magicImg/LV${upLevel}_box.png">
        </div>
        <div class="content-block1 confirm-popup-title-font">
          <span>升級成功</span>
        </div>
        <div class="content-block2">
          <p>恭喜你！恭喜你成功升級至 <span class="highlight">LV ${upLevel} 魔法藥水</span></p>
        </div>
      </div>
    `
    return result
  }

  eventChestUpgrade.process = (chest, targets, spendCoins, spendGems) => {
    let upLevel = chest.level + 1
    ajax('POST', `/currencyBank/chest/levelUp/${chest.id}`, {
      spendCoins: spendCoins,
      spendGems: spendGems,
      originalLevel: chest.level
    }).then(async jsonData => {
      let audioLevelUpTarget
      if (eventChestCheck(jsonData.message, jsonData.content)) {
        return
      }

      targets.platformChest.addClass('upgrade_animation')

      /* 升級音效 */
      audioLevelUpTarget = document.getElementById('audio_level_up')
      audioLevelUpTarget.play()

      await delay(1500)

      targets.platformChest.attr('src',
        `./img/magicImg/LV${upLevel}.png`)

      targets.platformChest.removeClass('upgrade_animation')
      await delay(500)

      let result = eventChestUpgrade.composeLevelUpResult(jsonData.content)
      confirmPopup.dialog(result.html,
        {
          confirmFn: () => {
            let originalCoins = parseInt($('#ecoin').text())
            let originalGems = parseInt($('#diamond').text())
            let spendCoins = result.coins
            let spendGems = result.gems
            let finalCoins = originalCoins - spendCoins
            let finalGems = originalGems - spendGems

            require(['eventCountUp'], eventCountUp => {
              eventCountUp('ecoin', originalCoins, finalCoins)
              eventCountUp('diamond', originalGems, finalGems)
            })
          },
          confirmButtonText: '太棒了！',
          showCancelButton: false,
          afterAnimationFn: () => {
            require(['eventChestGet'], eventChestGet => {
              eventChestGet()
            })
          }
        })
    })
  }

  eventChestUpgrade.ask = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let spendCoins = parseInt(data['coins'])
        let spendGems = parseInt(data['gems'])
        let popupHtml = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-silhouette" src="./img/magicImg/LV${upLevel}.png">
            </div>
            <div class="content-block1 confirm-popup-title-font">
              <span>Lv${chest.level} -> Lv${upLevel}</span>
            </div>
            <div class="content-block2">
              <p>  
                你確定要花費 
                <span class="highlight"> ${spendCoins} 個 e 幣、 ${spendGems} 個寶石</span>
                升級至 Lv${upLevel} 藥水嗎？
              </p>
            </div>
      
          </div>
        `
        confirmPopup.dialog(popupHtml,
          {
            confirmFn: eventChestUpgrade.process.bind(eventChestUpgrade.process, chest, targets, spendCoins, spendGems),
            confirmButtonText: '馬上升級'
          })
      })
  }
  return eventChestUpgrade
})
