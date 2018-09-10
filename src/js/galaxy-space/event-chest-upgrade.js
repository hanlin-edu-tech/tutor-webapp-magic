define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection'], ($, ajax, confirmPopup, eventChestInspection) => {// eslint-disable-line
  let eventChestUpgrade = {}
  eventChestUpgrade.ask = (chest, targets) => {
    let upLevel = chest.level + 1

    ajax('GET', `/chest/condition/level${upLevel}`, null)
      .then(jsonData => {
        let data = jsonData.content.content
        let needCoins = data['coins']
        let needGems = data['gems']
        let content = `
          <div class="confirm-grid-upgrade-container">
            <div class="image-block1">
              <img class="image-block1-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/chest${upLevel}.png">
            </div>
            <div class="content-block1">
              <span>Lv${chest.level} -> Lv${upLevel}</span>
            </div>
            <div class="content-block2">
              你確定要花費 <span class="confirm-popup-info"> ${needCoins}
              <span class="confirm-popup-warning">個 e 幣</span>、 ${needGems} <span class="confirm-popup-warning">個 寶石 </span></span>
              升級至 Lv${upLevel} 寶箱嗎？
            </div>
            <div class="content-block3">請注意： 高等的寶箱有更好的寶藏等著你，但升級寶箱有一定失敗的機率喔!</div>
          </div>
        `
        confirmPopup.dialog(content,
          {
            confirmFn: eventChestUpgrade.process.bind(eventChestUpgrade.process, chest)
          })
      })
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
          let title = 'Oooooops 餘額不足喔！'
          confirmPopup.ok(title, insufficientMessage)
          loadingTarget.css('display', 'none')
          return $.Deferred().reject().promise()
        } else {
          return ajax('PUT', `/currencyBank/chest/levelUp/${chest.id}`)
        }
      })
      .then(jsonData => {
        if (eventChestInspection(jsonData.message, jsonData.content)) {
          return
        }

        let result = eventChestUpgrade.determineLevelUpSuccess(jsonData.content)
        confirmPopup.levelUpImage(result.text, result.gif, () => {
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
        })
      })
      .done(() => {
        loadingTarget.css('display', 'none')
      })
  }

  eventChestUpgrade.determineLevelUpSuccess = (content) => {
    let result = content[0]
    let upLevel = parseInt(result.memo.upLevel)
    if (result && result.memo.levelUpSuccess === 'true') {
      result.text = '升級成功'
      result.gif = `<img class="confirm-popup-chest-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/upgradeStatus/upgradeSuccess${upLevel}.gif">`
    } else {
      if (window.matchMedia('(max-width: 550px)').matches) {
        result.text = '升級失敗'
      } else {
        result.text = `<img class="confirm-popup-chest-level-up-failed" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/level-up-failed.gif">`
      }

      result.gif = `<img class="confirm-popup-chest-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/upgradeStatus/upgradeFail${upLevel - 1}.gif">`
    }
    return result
  }

  return eventChestUpgrade
})
