define(['jquery', 'sweetAlert'], ($, sweetAlert) => { // eslint-disable-line
  let commonStyle = {
    position: 'bottom',
    customClass: 'tutorial-message-box row',
    background: 'rgba(73, 173, 177, 0.9)',
    width: '100%',
    buttonsStyling: false,
    allowOutsideClick: false
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
    confirmBtnText = '知道了'
  } = {}) => {
    let dialogStyle = cloneCommonStyle(commonStyle)
    dialogStyle.title = ''
    dialogStyle.html = `<p>${content}</p>`
    dialogStyle.confirmButtonText = confirmBtnText
    dialogStyle.confirmButtonClass = 'btn_iknow'
    dialogStyle.onOpen = () => {
      $('.tutorial-message-box .swal2-header').remove()
      $('.tutorial-message-box .swal2-content').addClass('col-9')
      $('.tutorial-message-box .swal2-actions').addClass('col-3')
      onOpenFn()
    }

    return sweetAlert(dialogStyle)
      .then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        }
      })
  }

  return confirmTutorial
})
