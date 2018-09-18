define(['jquery', 'cookie', 'ajax'], ($, Cookie, ajax) => { // eslint-disable-line
  let isBonusPopupImg = Cookie.get('isBonusPopupImg')
  let bonusPopupTarget = $('#bonus-popup')

  let popupHandler = (image) => {
    bonusPopupTarget.css('background-image', `url(${image})`)
    bonusPopupTarget.addClass('bonus-popup-show')

    $('#bonus-popup').on('click', event => {
      $(event.currentTarget).remove()
    })

    Cookie.set('isBonusPopupImg', true, {
      expire: 1
    })
  }

  let generalPopup = () => {
    ajax('GET', `/chest/condition/popup`)
      .then(jsonData => {
        let popup = jsonData.content
        let image = popup.content.image
        if (!image) {
          return
        }
        popupHandler(image)
      })
  }

  if (!isBonusPopupImg) {
    ajax('GET', `/currencyMission/admin/eventRule`)
      .then(jsonData => {
        let image = jsonData.content
        if (!image) {
          generalPopup()
        } else {
          popupHandler(image)
        }
      })
  } else {
    Cookie.remove('isBonusPopupImg')
  }
})
