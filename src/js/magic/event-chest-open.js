define(['jquery', 'ajax', 'confirmPopup', 'eventChestCheck', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestCheck, eventAwardAreZero) => {
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
          let gainAward = jsonDataContent.gainAward ? jsonDataContent.gainAward : ''
          let luckyBag = jsonDataContent.luckyBag
          let awardImg = '', // eslint-disable-line
            awardTitle = ''
          let popupHtml, openTextBlock3 = '', // eslint-disable-line
            openTextBlock4 = '', gridOpenContainerClass = ''
          let dialogAttr

          if (eventChestCheck(jsonData.message, jsonData.content)) {
            return
          } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
            return
          }

          if (gainAwardId) {
            gridOpenContainerClass = 'confirm-grid-img-container'
            awardImg = `<img class="open-award-gift" src="./img/magicImg/award/${gainAwardId}.png">`
          }

          popupHtml = `
            <div class="${gridOpenContainerClass} open-award">
              <div class="content-block1 confirm-popup-title-font">
                恭喜你獲得了：
              </div>
              <div class="content-block2 confirm-popup-title-font">
                <img class="coins-img" src="./img/magicImg/coin.svg">
                <span>${gainCoins}</span>
                <img class="gems-img" src="./img/magicImg/gem.svg">
                <span>${gainGems}</span>
              </div>
              <div class="content-block3">
                <p>${gainAward}</p>
                ${awardImg}
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

                    if (eventChestCheck(jsonData.message, jsonData.content)) {
                      return
                    }

                    gainCoins = jsonContent.coins
                    gainGems = jsonContent.gems
                    finalCoins = jsonContent.finalCoins
                    finalGems = jsonContent.finalGems

                    popupHtml = `
                      <div class="${gridOpenContainerClass} open-award">
                        <div class="content-block1 confirm-popup-title-font">
                          福袋打開囉，得到：
                        </div>
                        <div class="content-block2 confirm-popup-title-font">
                          <img class="coins-img" src="./img/magicImg/coin.svg">
                          <span>${gainCoins}</span>
                          <img class="gems-img" src="./img/magicImg/gem.svg">
                          <span>${gainGems}</span>
                        </div>
                        <div class="content-block3">
                          <p>gainAward</p>
                          ${awardImg}
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
              confirmBtnText: '太好了！',
              showCancelButton: false
            }
          }

          dialogAttr.customClass = 'confirm_message_box confirm-popup-middle-height'
          confirmPopup.dialog(popupHtml, dialogAttr)
        })
    }
  })
