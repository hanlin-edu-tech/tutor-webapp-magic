define(['jquery', 'ajax', 'confirmPopup', 'commonUtil',
    'eventChestStatusDo', 'w3', 'eventChestCheck', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, commonUtil, eventChestStatusDo, w3, eventChestCheck, eventAwardAreZero) => {
    return (chest, targets, beginInceptionFn) => {
      let popupHtml, classHeight = '', width = ''
      if (chest.level >= 2) {
        classHeight = 'modal-popup-inception-height'
        width = '93%'
        popupHtml = `
          <div class="confirm-grid-inception-container">
            <div class="content-block1 confirm-popup-title-font">
              <span>開始啟動水晶球</span>
            </div>
            <div class="content-block2">
              <p>目前水晶球等級為 <span class="highlight">Lv${chest.level}</span>，成功啟動此水晶球可能獲得</p>
            </div>
            <div class="img-block-left-btn">
              <img class="left-btn" src="./img/magicImg/previous.svg">
            </div>
            <div class="img-block-right-btn">
              <img class="right-btn" src="./img/magicImg/next.svg">
            </div>
            <div class="content-block4">
              <p>你確定要啟動這個水晶球嗎</p>
            </div>
          </div>
        `
      } else {
        popupHtml = `
          <div>
            <div class="confirm-popup-title-font">藥水準備啟動中...</div>
            <p class="common-font">你確定要啟動這個藥水嗎？</p>
          </div>
        `
      }

      let dialogAttr = {
        customClass: `my_treasure_message_box ${classHeight}`,
        background: '#a6937c',
        width: width,
        confirmButtonClass: 'btn message_box_btn_style',
        cancelButtonClass: 'btn message_box_btn_style',
        showCancelButton: !targets.chestInstance['novice'],
        confirmFn: () => {
          ajax('POST', `/chest/inception/${chest.id}`,
            {
              status: 'UNLOCKING'
            }
          ).then(jsonData => {
            if (eventChestCheck(jsonData.message, jsonData.content)) {
              return
            } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
              return
            }

            eventChestStatusDo.unLocking(chest, targets, beginInceptionFn)
          })
        },

        onOpenFn: () => {
          if (chest.level < 2) return

          ajax('GET', `/chest/showAwardsWhenStart/${chest.level}`)
            .then(data => {
              let awardsQuantity = data.content
              let limit = commonUtil.determineAwardCountDisplay()
              let awardsCount
              let quantity
              let awardIndex
              let awardId
              let awardImages = ''
              let awardBlock = ''

              let composeAwardBlock = (awardIndex, limit, awardId, awardImage) => {
                switch (awardIndex % limit) {
                  case (limit - 1):
                    awardImages += awardImage
                    awardBlock += `<div class="img-block-award">${awardImages}</div>`
                    awardImages = ''
                    break

                  default:
                    awardImages += awardImage
                }
              }

              awardsCount = Object.keys(awardsQuantity).length
              awardIndex = 0
              for (let awardId in awardsQuantity) {
                let awardImage = `
                  <div class="start-show-award">
                    <img class="img-award${awardIndex}" data-award-id="${awardId}" src="./img/award/${awardId}.png">
                  </div>
                `

                if (awardIndex === awardsCount - 1) {
                  awardImages += awardImage
                  awardBlock += `<div class="img-block-award">${awardImages}</div>`
                } else {
                  composeAwardBlock(awardIndex, limit, awardId, awardImage)
                }

                awardIndex++
              }

              $('.img-block-left-btn').after(awardBlock)

              $('img[class^=img-award]').each((index, element) => {
                awardId = $(element).attr('data-award-id')
                quantity = awardsQuantity[awardId]

                /* 如果禮物為 0，在禮物圖附加上送完的註記 */
                if (quantity === 0) {
                  $(element)
                    .parent('div.start-show-award')
                    .append('<img class="award-zero" src="./img/magicImg/soldout.png">')
                }
              })

              let slide = w3.slideshow('.img-block-award', 0)

              $('.confirm-grid-inception-container .right-btn').on('click', () => {
                slide.next()
              })

              $('.confirm-grid-inception-container .left-btn').on('click', () => {
                slide.previous()
              })
            })
        }
      }

      confirmPopup.dialog(popupHtml, dialogAttr)
    }
  })
