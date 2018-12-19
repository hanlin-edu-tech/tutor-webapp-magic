define(['jquery', 'ajax', 'confirmPopup', 'eventChestCheck', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestCheck, eventAwardAreZero) => {
    return (chest, targets, afterOpenFn) => {
      let afterOpen = !afterOpenFn ? (finalCoins, finalGems) => {
        require(['eventCountUp'], eventCountUp => {
          targets.openBtn.css('display', 'none')
          targets.platformChest.remove()
          eventCountUp('ecoin', parseInt($('#ecoin').text()), finalCoins)
          eventCountUp('diamond', parseInt($('#diamond').text()), finalGems)
        })
      } : afterOpenFn

      ajax('POST', `/chest/open/${ chest.id }`)
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
          let awardImg = ''
          let popupHtml, gridOpenContainerClass = ''// eslint-disable-line
          let dialogAttr

          if (eventChestCheck(jsonData.message, jsonData.content)) {
            return
          } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
            return
          }

          if (gainAwardId) {
            gridOpenContainerClass = 'confirm-grid-img-container'
            awardImg = `<img class="open-award-gift" src="./img/award/${ gainAwardId }.png">`
          }

          popupHtml = `
            <div class="${ gridOpenContainerClass } open-award">
              <div class="content-block1 confirm-popup-title-font">
                恭喜你獲得了：
              </div>
              <div class="content-block2">
                <p class="common-font">
                  <img class="coins-img" src="./img/magicImg/coin.svg">
                  <span>${ gainCoins }</span>
                  <img class="gems-img" src="./img/magicImg/gem.svg">
                  <span>${ gainGems }</span>
                </p>
              </div>
              <div class="content-block3">
                <p>${ gainAward }</p>
                ${ awardImg }
              </div>
            </div>
          `

          if (gainAwardId && luckyBag === false) {
            dialogAttr = {
              customClass: 'confirm_message_box confirm-popup-middle-height',
              /* 導頁至領取㽪品 */
              confirmFn: () => {
                afterOpen(finalCoins, finalGems)
                $('#my_treasure .book').trigger('click')
              },

              cancelFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
              confirmButtonText: '前往我的寶藏確認',
              cancelButtonText: '太好了'
            }
          } else if (luckyBag === true) {
            dialogAttr = {
              customClass: 'confirm_message_box confirm-popup-middle-height',
              confirmFn: () => {
                ajax('POST', `/chest/award/luckyBag/${ chest.id }`,
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
                      <div class="${ gridOpenContainerClass } open-award">
                        <div class="content-block1 confirm-popup-title-font">
                          福袋打開囉，得到：
                        </div>
                        <div class="content-block2">
                          <p class="common-font">
                            <img class="coins-img" src="./img/magicImg/coin.svg">
                            <span>${ gainCoins }</span>
                            <img class="gems-img" src="./img/magicImg/gem.svg">
                            <span>${ gainGems }</span>
                          </p>
                        </div>
                        <div class="content-block3">
                          ${ awardImg }
                        </div>
                      </div>
                    `

                    confirmPopup.dialog(popupHtml, {
                      customClass: 'confirm_message_box confirm-popup-middle-height',
                      confirmFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
                      confirmButtonText: '太棒了！',
                      showCancelButton: false
                    })
                  })
              },
              confirmButtonText: '打開福袋',
              showCancelButton: false
            }
          } else {
            dialogAttr = {
              confirmFn: afterOpen.bind(afterOpen, finalCoins, finalGems),
              confirmButtonText: '太好了！',
              showCancelButton: false,
              onOpenFn: () => {
                let openContentBlock2Target = $('.open-award .content-block2')
                openContentBlock2Target.css({marginTop: '30px'})
                openContentBlock2Target.find('.coins-img, .gems-img').css({width: '50px'})
              }
            }
          }

          confirmPopup.dialog(popupHtml, dialogAttr)
        })
    }
  })
