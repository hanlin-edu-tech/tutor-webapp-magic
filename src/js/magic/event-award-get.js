define(['jquery', 'ajax', 'w3', 'eventAwardAreZero', 'confirmPopup', 'commonUtil'],
  ($, ajax, w3, eventAwardAreZero, confirmPopup, commonUtil) => { // eslint-disable-line
    return () => {
      let audioOpenAwardEventTarget = document.getElementById('audio_open_award_event')
      audioOpenAwardEventTarget.play()

      let popupHtml = `
          <div class="confirm-grid-awards-treasure-container">
            <div class="content-block1 confirm-popup-title-font">
                <span>目前擁有</span>
            </div>
            <div class="content-block2">
              <button class="waiting-btn waiting" type="button">待領取</button>
              <button class="sending-btn" type="button">出貨中</button>
              <button class="all-award-btn" type="button">所有寶藏</button>
            </div>
            <div class="img-block-left-btn">
                <img class="left-btn" src="./img/magicImg/previous.svg">
            </div>
            <div class="img-block-right-btn">
                <img class="right-btn" src="./img/magicImg/next.svg">
            </div>
            <div class="content-block4">
              <span class="sending-desc">在點選領取按鈕後，約 7-14 天工作天為你寄出寶藏喔！</span>
            </div>
          </div>
        `

      let getAwardsOnOpenFunc = async (awardsType, textDesc) => {
        ajax('GET', `/chest/award/`)
          .then(data => {
            let awardsQuantity = data.content
            let showAwards
            let awardsCount
            let awardIdx
            let awardImgs = ''
            let awardBlock = ''
            let displayLimit = commonUtil.determineAwardCountDisplay()

            let composeAwardBlock = (awardIdx, limit, awardId, awardImg) => {
              switch (awardIdx % limit) {
                case (limit - 1):
                  awardImgs += awardImg
                  awardBlock += `<div class="img-block-award">${awardImgs}</div>`
                  awardImgs = ''
                  break

                default:
                  awardImgs += awardImg
              }
            }
            
            switch (awardsType) {
              case 'remainingAwards' : {
                showAwards = awardsQuantity.remainingAwards
                break
              }
              case 'exitAwards': {
                showAwards = awardsQuantity.exitAwards
                break
              }
              case 'allAwards': {
                showAwards = awardsQuantity.allAwards
                break
              }
              default: {
                confirmPopup.dialog('<p class="common-font">系統忙碌中...請稍候！</p>', {
                  showCancelButton: false
                })
                return
              }
            }

            awardsCount = Object.keys(showAwards).length
            awardIdx = 0
            for (let awardId in showAwards) {
              let awardImg = `
                <div class="start-show-award">
                  <img class="img-award${awardIdx}" data-award-id="${awardId}" src="./img/award/${awardId}.png">
                  <hr style="margin: 7px"/>
                  <p>${textDesc}:${showAwards[awardId]}個</p>
                </div>
              `

              if (awardIdx === awardsCount - 1) {
                awardImgs += awardImg
                awardBlock += `<div class="img-block-award">${awardImgs}</div>`
              } else {
                composeAwardBlock(awardIdx, displayLimit, awardId, awardImg)
              }

              awardIdx++
            }

            $('.img-block-left-btn').after(awardBlock)

            let slide = w3.slideshow('.img-block-award', 0)

            $('.confirm-grid-awards-treasure-container .right-btn').on('click', () => {
              slide.next()
            })

            $('.confirm-grid-awards-treasure-container .left-btn').on('click', () => {
              slide.previous()
            })
          })
      }

      let dialog = {
        customClass: 'my_treasure_message_box confirm-popup-large-height',
        background: '#a6937c',
        width: '85%',
        confirmButtonText: '領取獎品',
        confirmFn: () => {
          ajax('GET', `/chest/award/calculateDaysDuringLastTime`)
            .then(jsonData => {
                let betweenDays = jsonData.content
                const month = 30
                if (betweenDays < month && betweenDays !== -1) {
                  let disableReceiveAward = `
                    <div class="confirm-popup-title-font">還不能領取寶藏喔 !!!</div>
                    <p class="common-font">一個月只能領取寶藏 1 次，距離下次領獎還有 ${month - betweenDays} 天</p>
                  `
                  confirmPopup.dialog(disableReceiveAward, {
                    confirmButtonText: '好的',
                    showCancelButton: false,
                  })
                } else {
                  window.location.href = '/Events/winner_info.html?id=magic'
                }
              }
            )
        },
        cancelButtonText: '回活動頁',
        cancelButtonClass: 'btn message_box_btn_style',
        confirmButtonClass: 'btn message_box_btn_style',
        onOpenFn: () => {
          let waitingBtnTarget = $('.waiting-btn')
          let sendingBtnTarget = $('.sending-btn')
          let allAwardBtnTarget = $('.all-award-btn')
          let receiveAwardsBtnTarget = $('.swal2-confirm.btn.message_box_btn_style')
          let initialEmptyAwardsInfo = () => {
            $('.img-block-award').remove()
            $('.content-block4').hide()
          }

          waitingBtnTarget.on('click', event => {
            let textDesc = '尚未領取'
            let awardType = 'remainingAwards'
            initialEmptyAwardsInfo()

            $(event.currentTarget).addClass('waiting')
            sendingBtnTarget.removeClass('sending')
            allAwardBtnTarget.removeClass('all-award')
            receiveAwardsBtnTarget.show()
            getAwardsOnOpenFunc(awardType, textDesc)
          })

          sendingBtnTarget.on('click', event => {
            let textDesc = '本次寄送'
            let awardType = 'exitAwards'
            initialEmptyAwardsInfo()

            $(event.currentTarget).addClass('sending')
            waitingBtnTarget.removeClass('waiting')
            allAwardBtnTarget.removeClass('all-award')
            $('.content-block4').show()
            receiveAwardsBtnTarget.hide()
            getAwardsOnOpenFunc(awardType, textDesc)
          })

          allAwardBtnTarget.on('click', event => {
            let textDesc = '已獲得'
            let awardType = 'allAwards'
            initialEmptyAwardsInfo()

            $(event.currentTarget).addClass('all-award')
            waitingBtnTarget.removeClass('waiting')
            sendingBtnTarget.removeClass('sending')
            receiveAwardsBtnTarget.hide()
            getAwardsOnOpenFunc(awardType, textDesc)
          })

          waitingBtnTarget.trigger('click')
        }
      }

      confirmPopup.dialog(popupHtml, dialog)
    }
  })
