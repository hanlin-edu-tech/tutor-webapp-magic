define(['jquery', 'ajax', 'confirmPopup', 'eventChestCheck'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestCheck) => {
    let eventChestOpenImmediately = {}
    eventChestOpenImmediately.process = (chest, targets, spendGems) => {
      ajax('POST', `/chest/open/immediately/${chest.id}`,
        {
          spendGems: spendGems
        }
      ).then(jsonData => {
        if (eventChestCheck(jsonData.message, jsonData.content)) {
          return
        }

        let finalGems = jsonData.content.finalGems
        require(['eventCountUp'], eventCountUp => {
          eventCountUp('diamond', parseInt($('#diamond').text()), finalGems)
        })

        /* 倒數計時秒數設定為 1，讓藥水變成 ready 狀態 */
        require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
          eventCountdown(0, chest, targets, eventChestReady)
        })
      })
    }

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
            <div class="confirm-popup-title-font">立即開啟藥水需花費 ${spendGems} 個寶石</div>
            <p class="common-font">確定要立即開啟藥水嗎？</p>
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
