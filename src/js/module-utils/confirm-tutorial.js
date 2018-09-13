define(['jquery', 'sweetAlert'], ($, sweetAlert) => { // eslint-disable-line
  let commonStyle = {
    position: 'bottom',
    customClass: 'tutorial-message-box row',
    background: 'rgba(73, 173, 177, 0.9)',
    width: '100%',
    allowOutsideClick: false,
    heightAuto: false,
    buttonsStyling: false,
    confirmButtonClass: 'btn_iknow tutorial-message-box-btn-padding',
    onBeforeOpen: () => {
      $('html').css({height: '100vh'})
    }
  }

  let cloneCommonStyle = function (commonStyle) {
    let newStyle = {}
    let attr
    for (attr in commonStyle) {
      newStyle[attr] = commonStyle[attr]
    }
    return newStyle
  }

  let confirmTutorial = {}
  confirmTutorial.prompt = (content, {
    confirmFn = () => {},
    onOpenFn = () => {},
    confirmBtnText = '知道了',
    timer = 0
  } = {}) => {
    let promptStyle = cloneCommonStyle(commonStyle)
    promptStyle.title = ''
    promptStyle.html = `<p>${content}</p>`
    promptStyle.confirmButtonText = confirmBtnText
    promptStyle.onOpen = () => {
      $('.tutorial-message-box .swal2-header').remove()
      $('.tutorial-message-box .swal2-content').addClass('col-9')
      $('.tutorial-message-box .swal2-actions').addClass('col-3')
      onOpenFn()
    }

    if (timer > 0) {
      promptStyle.timer = timer
    }

    return sweetAlert(promptStyle)
      .then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        }
      })
  }

  return confirmTutorial
})
