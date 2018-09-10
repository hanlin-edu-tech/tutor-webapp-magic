define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestInspection) => {
    let eventChestOpenImmediately = {}
    eventChestOpenImmediately.ask = (chest, targets) => {
      let seconds
      ajax('GET', `/chest/coolDownTime/${chest.id}`)
        .then(jsonData => {
          seconds = jsonData.content
          return ajax('GET', `/chest/condition/openImmediately`)
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
            <div>
              <h2 class="header-text">立即開啟寶箱需花費 ${spendGems} 個寶石</h2>
              <h3>確定要立即開啟寶箱嗎？</h3>
            </div>
          `
          confirmPopup.dialog(popupContent,
            {
              confirmFn: eventChestOpenImmediately.process.bind(eventChestOpenImmediately.process, chest, targets, spendGems)
            }
          )
        })
    }

    eventChestOpenImmediately.process = (chest, targets, spendGems) => {
      ajax('GET', `/chest/checkBalance?gems=${spendGems}`)
        .then(jsonData => {
          let insufficientMessage = jsonData.content
          if (insufficientMessage) {
            let title = 'Oooooops 餘額不足喔！'
            confirmPopup.ok(title, insufficientMessage)
            return $.Deferred().reject().promise()
          } else {
            return ajax('PUT', `/chest/open/immediately/${chest.id}`, {
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

          /* 倒數計時秒數設定為 1，讓寶箱變成 ready 狀態 */
          require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
            eventCountdown(0, chest, targets, eventChestReady)
          })
        })
    }

    return eventChestOpenImmediately
  })
