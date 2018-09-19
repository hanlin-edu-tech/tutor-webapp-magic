define(['jquery', 'ajax', 'confirmPopup', 'eventChestInspection', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestInspection, eventAwardAreZero) => {
    return (chest, targets, afterOpenFn) => {
      let afterOpen = !afterOpenFn ? (finalCoins, finalGems) => {
        require(['eventCountUp'], eventCountUp => {
          targets.openBtn.css('display', 'none')
          targets.platformChest.remove()
          eventCountUp('coins', parseInt($('#coins').text()), finalCoins)
          eventCountUp('gems', parseInt($('#gems').text()), finalGems)
        })
      } : afterOpenFn

      ajax('POST', `/chest/open/${chest.id}`)
        .then((jsonData) => {
          let jsonDataContent = jsonData.content
          let finalCoins = jsonDataContent.finalCoins
          let finalGems = jsonDataContent.finalGems
          /* 獲得禮物內容 */
          let gainCoins = jsonDataContent.coins ? jsonDataContent.coins : 0
          let gainGems = jsonDataContent.gems ? jsonDataContent.gems : 0
          let gainAwardId = jsonDataContent.gainAwardId
          let gainAward = jsonDataContent.gainAward
          let luckyBag = jsonDataContent.luckyBag
          let awardImg = '', // eslint-disable-line
            awardTitle = ''
          let popupHtml, openTextBlock3 = '', // eslint-disable-line
            openTextBlock4 = ''
          let dialogAttr

          if (eventChestInspection(jsonData.message, jsonData.content)) {
            return
          } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
            return
          }

          if (gainAwardId) {
            awardTitle = gainAward
            awardImg = `<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`
            openTextBlock3 = `
              <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
              <span>${gainCoins}</span>
              <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
              <span>${gainGems}</span>
            `
            openTextBlock4 = awardImg
          } else {
            openTextBlock4 = `
              <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
              <span class="coins-lg">${gainCoins}</span>
              <br/>
              <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
              <span class="gems-lg">${gainGems}</span>
            `
          }

          popupHtml = `
            <div class="open-confirm-grid-container">
              <div class="open-text-block1">
              </div>
              <div class="open-text-block2 confirm-popup-title-font gif-title">恭喜你獲得了
                ${awardTitle}
              </div>
              <div class="open-text-block3">
                <p>${openTextBlock3}</p>
              </div>
              <div class="open-text-block4">
                <p>${openTextBlock4}</p>
              </div>
            </div>
          `

          if (gainAwardId && luckyBag === false) {
            dialogAttr = {
              /* 導頁至領取㽪品 */
              confirmFn: () => {
                afterOpen(finalCoins, finalGems)
                window.open('/Events/winner_info.html?id=space', 'winner_info')
              },

              cancelFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
              confirmBtnText: '回填領獎',
              cancelBtnText: '太好了'
            }
          } else if (luckyBag === true) {
            dialogAttr = {
              confirmFn: () => {
                ajax('POST', `/chest/award/luckyBag/${chest.id}`,
                  {
                    awardId: gainAwardId,
                    chestId: chest.id,
                    level: chest.level
                  })
                  .then(jsonData => {
                    let jsonContent = jsonData.content
                    let gainCoins, gainGems, finalCoins, finalGems, title

                    if (eventChestInspection(jsonData.message, jsonData.content)) {
                      return
                    }

                    gainCoins = jsonContent.coins
                    gainGems = jsonContent.gems
                    finalCoins = jsonContent.finalCoins
                    finalGems = jsonContent.finalGems

                    popupHtml = `
                      <div class="confirm-grid-gif-img-container lucky-bag-height">
                        <div class="header-block1 lucky-bag confirm-popup-title-font">
                          <span>福袋打開囉，得到 </span>
                          <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
                          <span>${gainCoins}</span>
                          <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
                          <span>${gainGems}</span>
                        </div>
                        <div class="content-block1 ">
                          <img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">
                        </div>
                      </div> 
                    `

                    confirmPopup.dialog(popupHtml, {
                      confirmFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
                      confirmButtonText: '太棒了！'
                    })
                  })
              },
              confirmBtnText: '打開福袋'
            }
          } else {
            dialogAttr = {
              confirmFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
              confirmBtnText: '太好了',
              showCancelButton: false
            }
          }

          dialogAttr.customClass = 'confirm_message_box confirm-popup-middle-height'
          confirmPopup.dialog(popupHtml, dialogAttr)
        })
    }
  })