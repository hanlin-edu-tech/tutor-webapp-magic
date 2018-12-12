define(['jquery', 'ajax', 'w3', 'eventAwardAreZero', 'confirmPopup'],
  ($, ajax, w3, eventAwardAreZero, confirmPopup) => { // eslint-disable-line
    return () => {
      // let audioOpenAwardEventTarget = document.getElementById('audio_open_award_event')
      // audioOpenAwardEventTarget.play()

      let popupHtml = `
          <div class="confirm-grid-inception-container">
              <div class="content-block1 confirm-popup-title-font">
                  <span>目前擁有</span>
              </div>
              <div class="content-block2">
                  <div>
                    <button class="waiting-btn waiting" type="button">待領取</button>
                  </div>
                  <div>
                    <button class="sending-btn" type="button">出貨中</button>
                  </div>
                  <div>
                    <button class="all-award-btn" type="button">所有寶藏</button>
                  </div>
              </div>
              <div class="img-block-left-btn">
                  <img class="left-btn" src="./img/magicImg/previous.svg">
              </div>
              <div class="img-block-right-btn">
                  <img class="right-btn" src="./img/magicImg/next.svg">
              </div>
          </div>
        `

      let getAwardsOnOpenFunc = (awardQuantity, textDesc, textDescSec) => {
        ajax('GET', `/chest/award/`)
          .then(data => {
            let awardsQuantity = data.content
            let showAwards
            let limit = 0
            let awardsCount
            let awardIdx
            let awardImgs = ''
            let awardBlock = ''

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

            if (window.matchMedia('(max-width: 500px)').matches) {
              limit = 1
            } else if (window.matchMedia('(max-width: 950px)').matches) {
              limit = 3
            } else {
              limit = 5
            }

            if (awardQuantity === 'remainingAwards') {
              showAwards = awardsQuantity.remainingAwards
            } else if (awardQuantity === 'existAwards') {
              showAwards = awardsQuantity.existAwards
            } else if (awardQuantity === 'allAwards') {
              showAwards = awardsQuantity.allAwards
            }

            awardsCount = Object.keys(showAwards).length
            awardIdx = 0
            for (let awardId in showAwards) {
              let awardImg = `
                <div class="start-show-award">
                  <img class="img-award${awardIdx}" data-award-id="${awardId}" src="./img/award/${awardId}.png">
                  <hr style="margin: 7px"/>
                  <p>${textDesc}:${showAwards[awardId]}個</p>${textDescSec}
                </div>
              `

              if (awardIdx === awardsCount - 1) {
                awardImgs += awardImg
                awardBlock += `<div class="img-block-award">${awardImgs}</div>`
              } else {
                composeAwardBlock(awardIdx, limit, awardId, awardImg)
              }

              awardIdx++
            }

            $('.img-block-left-btn').after(awardBlock)

            let slide = w3.slideshow('.img-block-award', 0)

            $('.confirm-grid-inception-container .right-btn').on('click', () => {
              slide.next()
            })

            $('.confirm-grid-inception-container .left-btn').on('click', () => {
              slide.previous()
            })
          })
      }

      let dialog = {
        customClass: 'my_treasure_message_box modal-popup-inception-height',
        background: '#a6937c',
        width: '85%',
        confirmButtonText: '尚未開放領取',
        showCancelButton: false,
        confirmButtonClass: 'btn message_box_btn_style',
        onOpenFn: () => {
          $('.waiting-btn').on('click', () => {
            $('.img-block-award').remove()
            $('.sending-desc').remove()
            let textDesc = '尚未領取'
            let awardQuantity = 'remainingAwards'
            $('.waiting-btn').addClass('waiting')
            $('.sending-btn').removeClass('sending')
            $('.all-award-btn').removeClass('all-award')
            $('.swal2-confirm.btn.message_box_btn_style').show()
            getAwardsOnOpenFunc(awardQuantity, textDesc, '')
          })

          $('.sending-btn').on('click', () => {
            $('.img-block-award').remove()
            $('.sending-desc').remove()
            let textDesc = '本次寄送'
            let awardQuantity = 'existAwards'
            $('.waiting-btn').removeClass('waiting')
            $('.sending-btn').addClass('sending')
            $('.all-award-btn').removeClass('all-award')
            $('.swal2-confirm.btn.message_box_btn_style').hide()
            $('.swal2-actions').append(
              `<div class="sending-desc">在點選領取按鈕後，約7-14天工作天為你寄出寶藏喔！</div>`)
            getAwardsOnOpenFunc(awardQuantity, textDesc, '')
          })

          $('.all-award-btn').on('click', () => {
            $('.img-block-award').remove()
            $('.sending-desc').remove()
            let textDesc = '已獲得'
            let textDescSec = '已領取?個'
            let awardQuantity = 'allAwards'
            $('.waiting-btn').removeClass('waiting')
            $('.sending-btn').removeClass('sending')
            $('.all-award-btn').addClass('all-award')
            $('.swal2-confirm.btn.message_box_btn_style').hide()
            getAwardsOnOpenFunc(awardQuantity, textDesc, textDescSec)
          })

          $('.waiting-btn').trigger('click')
        }
      }

      confirmPopup.dialog(popupHtml, dialog)
    }
  })
