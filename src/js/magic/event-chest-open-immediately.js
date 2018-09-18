define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestInspection) => {
    let eventChestOpenImmediately = {}
    eventChestOpenImmediately.process = (chest, targets, spendGems) => {
      ajax('GET', `http://localhost:8080/chest/checkBalance?gems=${spendGems}`)
        .then(jsonData => {
          let insufficientMessage = jsonData.content
          if (insufficientMessage) {
            confirmPopup.dialog(insufficientMessage, {
              title: 'Oooooops 餘額不足喔！',
              confirmButtonText: '我瞭解了'
            })
            return $.Deferred().reject().promise()
          } else {
            return ajax('PATCH', `http://localhost:8080/chest/open/immediately/${chest.id}`, {
              spendGems: spendGems
            })
          }
        })
        .then(jsonData => {
          if (eventChestInspection(jsonData.message, jsonData.content)) {
            return
          }

          let finalGems = jsonData.content.finalGems
          require(['eventCountUp'], eventCountUp => {
            eventCountUp('gems', parseInt($('#gems').text()), finalGems)
          })

          /* 倒數計時秒數設定為 1，讓藥水變成 ready 狀態 */
          require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
            eventCountdown(0, chest, targets, eventChestReady)
          })
        })
    }

    eventChestOpenImmediately.ask = (chest, targets) => {
      let seconds
      ajax('GET', `http://localhost:8080/chest/coolDownTime/${chest.id}`)
        .then(jsonData => {
          seconds = jsonData.content
          return ajax('GET', `http://localhost:8080/chest/condition/openImmediately`)
        })
        .then(jsonData => {
          let openImmediatelyData = jsonData.content
          let openImmediatelyInfo = openImmediatelyData['content']
          let secondsCycle = parseInt(openImmediatelyInfo.secondsCycle)
          let spendGems = openImmediatelyInfo.spendGems
          let cycles = Math.ceil(seconds / secondsCycle)
          let popupContent

          spendGems = spendGems * cycles
          popupContent = `
            <p>
              <div class="confirm-popup-title-font">立即開啟藥水需花費 ${spendGems} 個寶石</div>
              <h3>確定要立即開啟藥水嗎？</h3>
            </p>
          `
          confirmPopup.dialog(popupContent,
            {
              confirmFn: eventChestOpenImmediately.process.bind(eventChestOpenImmediately.process, chest, targets, spendGems)
            }
          )
        })
    }

    return eventChestOpenImmediately
  })
