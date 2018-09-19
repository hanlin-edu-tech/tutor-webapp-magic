define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection'], ($, ajax, confirmPopup, eventChestInspection) => {// eslint-disable-line
  let eventChestUpgrade = {}

  eventChestUpgrade.composeLevelUpResult = jsonDataContent => {
    let result = jsonDataContent[0]
    let upLevel = parseInt(result.memo.upLevel)
    result.html = `<div class="confirm-grid-upgrade-container">
        <div class="image-block1">
          <img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${upLevel}_box.png">
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

  eventChestUpgrade.process = (chest) => {
    let upLevel = chest.level + 1
    let loadingTarget = $('#loading')
    loadingTarget.css('display', '')
    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let levelInfo = jsonData.content.content
        let coins = levelInfo.coins
        let gems = levelInfo.gems
        return ajax('GET', `/chest/checkBalance?coins=${coins}&gems=${gems}`, null)
      })
      .then(jsonData => {
        let insufficientMessage = jsonData.content
        if (insufficientMessage) {
          confirmPopup.dialog(insufficientMessage, {
            title: 'Oooooops 餘額不足喔！',
            confirmButtonText: '我瞭解了'
          })
          loadingTarget.css('display', 'none')
          return $.Deferred().reject().promise()
        } else {
          return ajax('POST', `/currencyBank/chest/levelUp/${chest.id}`)
        }
      })
      .then(jsonData => {
        if (eventChestInspection(jsonData.message, jsonData.content)) {
          return
        }

        let result = eventChestUpgrade.composeLevelUpResult(jsonData.content)

        confirmPopup.dialog(result.html,
          {
            confirmFn: () => {
              let originalCoins = parseInt($('#coins').text())
              let originalGems = parseInt($('#gems').text())
              let spendCoins = result.coins
              let spendGems = result.gems
              let finalCoins = originalCoins - spendCoins
              let finalGems = originalGems - spendGems

              require(['eventChestGet', 'eventCountUp'], (eventChestGet, eventCountUp) => {
                eventChestGet()
                eventCountUp('coins', originalCoins, finalCoins)
                eventCountUp('gems', originalGems, finalGems)
              })
            },
            cancelBtnText: '太棒了！',
            showCancelButton: false
          })
      })
      .done(() => {
        loadingTarget.css('display', 'none')
      })
  }

  eventChestUpgrade.ask = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let needCoins = data['coins']
        let needGems = data['gems']
        let popupHtml = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-silhouette" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${upLevel}.png">
            </div>
            <div class="content-block1 confirm-popup-title-font">
              <span>Lv${chest.level} -> Lv${upLevel}</span>
            </div>
            <div class="content-block2">
              <p>  
                你確定要花費 
                <span class="highlight"> ${needCoins} 個 e 幣、 ${needGems} 個寶石</span>
                升級至 Lv${upLevel} 藥水嗎？
              </p>
            </div>
      
          </div>
        `
        confirmPopup.dialog(popupHtml,
          {
            confirmFn: eventChestUpgrade.process.bind(eventChestUpgrade.process, chest)
          })
      })
  }

  return eventChestUpgrade
})