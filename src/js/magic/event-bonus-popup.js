define(['jquery', 'cookie', 'ajax', 'confirmPopup'], ($, Cookie, ajax, confirmPopup) => { // eslint-disable-line
  let isBonusPopupImg = Cookie.get('isBonusPopupImg')
  let bonusPopupTarget = $('#bonus-popup')
  let nearActivityTarget = $('#near_activity .cat')

  bonusPopupTarget.hide()
  nearActivityTarget.on('click', () => {
    let eventEmptyHtml = `<div class="confirm-popup-title-font">活動尚未開始喔！</div>`
    confirmPopup.dialog(eventEmptyHtml, {
      confirmButtonText: '好的',
      showCancelButton: false
    })
  })

  ajax('GET', `/currencyMission/admin/eventRule`)
    .then(jsonData => {
      let image = jsonData.content
      if (image) {
        bonusPopupTarget.on('click', event => {
          $(event.currentTarget).fadeOut()
        })
        nearActivityTarget.off('click')
        nearActivityTarget.on('click', () => {
          let existedBonusImage = bonusPopupTarget.css('background-image')
          if (existedBonusImage === 'none') {
            bonusPopupTarget.css({'background-image': `url(${ image })`})
          }
          bonusPopupTarget.fadeIn()
        })

        if (!isBonusPopupImg) {
          bonusPopupTarget.css({'background-image': `url(${ image })`})
          bonusPopupTarget.fadeIn()
          Cookie.set('isBonusPopupImg', true, {
            expire: 1
          })
        } else {

        }
      }
    })
})
