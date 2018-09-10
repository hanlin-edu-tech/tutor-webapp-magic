define(['jquery', 'ajax', 'confirmPopup', 'eventChestStatusDo', 'w3', 'eventChestInspection', 'eventAwardAreZero'], // eslint-disable-line
  ($, ajax, confirmPopup, eventChestStatusDo, w3, eventChestInspection, eventAwardAreZero) => {
    return (chest, targets) => {
      let content
      if (chest.level >= 2) {
        content = `
          <div class="start-confirm-grid-container">
            <div class="content-block1">
              <span>寶箱準備啟動中...</span>
            </div>
            <div class="content-block2">
              <span>目前寶箱等級為Lv${chest.level}，開啟這個寶箱可能獲得</span>
            </div>  
            <div class="img-block-left-btn">
              <img class="left-btn" src="https://d220xxmclrx033.cloudfront.net/event-space/img/previous.png">
            </div>
            <div class="img-block-right-btn">
              <img class="right-btn" src="https://d220xxmclrx033.cloudfront.net/event-space/img/next.png">
            </div>
            <div class="content-block4">
              <span>你確定要啟動這個寶箱嗎？</span>
            </div>
          </div>
        `
      } else {
        content = `
          <div>
            <h2 class="header-text">寶箱準備啟動中...</h2>
            <h3>你確定要啟動這個寶箱嗎？</h3>
          </div>
        `
      }

      let dialogAttr = {
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

              eventChestStatusDo.unLocking(chest, targets)
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

              $('.start-confirm-grid-container .right-btn').on('click', () => {
                slide.next()
              })

              $('.start-confirm-grid-container .left-btn').on('click', () => {
                slide.previous()
              })
            })
        }
      }

      confirmPopup.dialog(content, dialogAttr)
    }
  })
