define(['jquery', 'ajax', 'w3', 'eventAwardAreZero', 'confirmPopup'], ($, ajax, w3, eventAwardAreZero, confirmPopup) => { // eslint-disable-line
  return () => {
    $('#my_treasure .book_title').on('click', () => {
      let popupHtml = `
          <div class="confirm-grid-inception-container">
            <div class="content-block1 confirm-popup-title-font">
              <span>目前擁有</span>
            </div>
            <div class="content-block2">
            </div>
            <div class="img-block-left-btn">
              <img class="left-btn" src="./img/magicImg/previous.svg">
            </div>
            <div class="img-block-right-btn">
              <img class="right-btn" src="./img/magicImg/next.svg">
            </div>
          </div>
        `
      let dialog = {
        customClass: 'my_treasure_message_box modal-popup-inception-height',
        background: '#a6937c',
        width: '85%',
        showConfirmButton: true,
        confirmBtnText: '確定',
        showCancelButton: false,
        cancelBtnText: '',
        confirmButtonClass: 'btn message_box_btn_style',
        cancelButtonClass: 'btn message_box_btn_style',
        confirmFn: () => {},
        onOpenFn: () => {
          ajax('GET', `/chest/award/`)
            .then(data => {
              let awardsQuantity = data.content
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

              awardsCount = Object.keys(awardsQuantity).length
              awardIdx = 0
              for (let awardId in awardsQuantity) {
                let awardImg = `<div class="start-show-award">
                  <img class="img-award${awardIdx}" data-award-id="${awardId}" src="./img/award/${awardId}.png">
                  <div>${awardsQuantity[awardId]}個</div>
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
      }
      confirmPopup.dialog(popupHtml, dialog)
    })
  }
})
