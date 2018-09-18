define(['jquery', 'ajax', 'confirmPopup', 'eventChestStatusDo', 'w3', 'eventChestInspection', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestStatusDo, w3, eventChestInspection, eventAwardAreZero) => {
    return (chest, targets, beginInceptionFn) => {
      let popupHtml
      if (chest.level >= 2) {
        popupHtml = `
          <div class="confirm-grid-start-container">
            <div class="content-block1 confirm-popup-title-font">
              <span>開始調配藥水</span>
            </div>
            <div class="content-block2">
              <p>目前藥水等級為 <span class="highlight">Lv${chest.level}</span>，成功調配此魔法藥水可能獲得</p>
            </div>
            <div class="img-block-left-btn">
              <img class="left-btn" src="https://d220xxmclrx033.cloudfront.net/event-space/img/previous.png">
            </div>
            <div class="img-block-right-btn">
              <img class="right-btn" src="https://d220xxmclrx033.cloudfront.net/event-space/img/next.png">
            </div>
            <div class="content-block4">
              <p>你確定要啟動這個藥水嗎？</p>
            </div>
          </div>
        `
      } else {
        popupHtml = `
          <div>
            <h2 class="confirm-popup-title-font">藥水準備啟動中...</h2>
            <p>你確定要啟動這個藥水嗎？</p>
          </div>
        `
      }

      let dialogAttr = {
        customClass: 'my_treasure_message_box modal-popup-start-height',
        background: '#a6937c',
        width: '85%',
        confirmButtonClass: 'btn message_box_btn_style',
        cancelButtonClass: 'btn message_box_btn_style',
        confirmFn: () => {
          let statusInfo = {
            status: 'UNLOCKING'
          }
          ajax('POST', `/chest/inception/${chest.id}`, statusInfo)
            .then(jsonData => {
              if (eventChestInspection(jsonData.message, jsonData.content)) {
                return
              } else if (eventAwardAreZero(jsonData.message, jsonData.content)) {
                return
              }

              eventChestStatusDo.unLocking(chest, targets, beginInceptionFn)
            })
        },

        onOpenFn: () => {
          if (chest.level < 2) return

          ajax('GET', `/chest/showAwardsWhenStart/chest${chest.level}`)
            .then(data => {
              let awardsQuantity = data.content
              let limit = 0
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

              if (window.matchMedia('(max-width: 500px)').matches) {
                limit = 1
              } else if (window.matchMedia('(max-width: 950px)').matches) {
                limit = 3
              } else {
                limit = 5
              }

              awardsCount = Object.keys(awardsQuantity).length
              awardIndex = 0
              for (let awardId in awardsQuantity) {
                let awardImage = `<div class="start-show-award">
                  <img class="img-award${awardIndex}" data-award-id="${awardId}" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${awardId}.png">
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
                    .addClass('zero-quantity')

                  $(element)
                    .parent('div.start-show-award')
                    .append('<img class="award-zero" src="https://d220xxmclrx033.cloudfront.net/event-space/img/soldout.png">')
                }
              })

              let slide = w3.slideshow('.img-block-award', 0)

              $('.confirm-grid-start-container .right-btn').on('click', () => {
                slide.next()
              })

              $('.confirm-grid-start-container .left-btn').on('click', () => {
                slide.previous()
              })
            })
        }
      }

      confirmPopup.dialog(popupHtml, dialogAttr)
    }
  })
