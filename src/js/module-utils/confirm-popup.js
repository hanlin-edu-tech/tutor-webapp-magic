define(['jquery', 'sweetAlert'], ($, sweetAlert) => { // eslint-disable-line
  let constantStyle = {
    buttonsStyling: false,
    allowOutsideClick: false,
    heightAuto: false,
    animation: false,
    reverseButtons: true,
    onBeforeOpen: () => {
     
    }
  }

  let cloneConstantStyle = () => {
    let newStyle = {}
    let attr
    for (attr in constantStyle) {
      newStyle[attr] = constantStyle[attr]
    }
    return newStyle
  }

  let confirmPopup = {}
  confirmPopup.dialog = (popupHtml, {
    width = (window.matchMedia('(max-width: 800px)').matches) ? '68%' : '58%',
    customClass = 'confirm_message_box confirm-popup-default-height',
    background = 'rgba(73, 173, 177, 0.9)',
    title = '',
    confirmFn = () => {},
    cancelFn = () => {},
    onOpenFn = () => {},
    showConfirmButton = true,
    confirmButtonText = '確定',
    showCancelButton = true,
    cancelButtonText = '我再想想',
    confirmButtonClass = 'btn_iknow message_box_btn_style',
    cancelButtonClass = 'btn_iknow message_box_btn_style'
  } = {}) => {
    let dialogStyle = cloneConstantStyle()
    dialogStyle.width = width
    dialogStyle.customClass = `animated zoomInUp fast ${customClass}`
    dialogStyle.background = background
    dialogStyle.title = title ? `<span class="confirm-popup-title-font">${title}</span>` : ''
    dialogStyle.html = popupHtml
    dialogStyle.showCancelButton = showCancelButton
    dialogStyle.showConfirmButton = showConfirmButton
    dialogStyle.confirmButtonText = confirmButtonText
    dialogStyle.cancelButtonText = cancelButtonText
    dialogStyle.confirmButtonClass = confirmButtonClass
    dialogStyle.cancelButtonClass = cancelButtonClass
    dialogStyle.onOpen = () => {
      $('.swal2-header').remove()
      onOpenFn()
    }

    sweetAlert(dialogStyle)
      .then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        } else if (result.dismiss === sweetAlert.DismissReason.cancel) {
          cancelFn()
        }
      })
  }

  let newTutorialStyle = () => {
    let tutorialStyle = {}
    let attr
    for (attr in constantStyle) {
      tutorialStyle[attr] = constantStyle[attr]
    }
    tutorialStyle.position = 'bottom'
    tutorialStyle.customClass = 'animated slideInLeft fast tutorial_message_box row'
    tutorialStyle.background = 'rgba(73, 173, 177, 0.9)'
    tutorialStyle.width = '100%'
    tutorialStyle.confirmButtonClass = 'btn_iknow tutorial_message_box_btn'
    tutorialStyle.onBeforeOpen = () => {
      $('.tutorial_message_box .swal2-header').remove()
      $('.tutorial_message_box .swal2-content').addClass('col-10')
      $('.tutorial_message_box .swal2-actions').addClass('col-2')
    }
    return tutorialStyle
  }

  confirmPopup.tutorialPrompt = (content, {
    confirmFn = () => {},
    onOpenFn = () => {},
    confirmButtonText = '知道了',
    timer = 0
  } = {}) => {
    let tutorialStyle = newTutorialStyle()
    tutorialStyle.title = ''
    tutorialStyle.html = `<p>${content}</p>`
    tutorialStyle.confirmButtonText = confirmButtonText
    tutorialStyle.onOpen = onOpenFn

    if (timer > 0) {
      tutorialStyle.timer = timer
    }

    return sweetAlert(tutorialStyle)
      .then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        }
      })
  }

  confirmPopup.awardIsZeroDialog = (title, content, awardIsZeroFun, buttonText) => {
    let awardIsZeroDialogStyle = cloneConstantStyle()
    awardIsZeroDialogStyle.customClass = 'award-are-zero-confirm-popup-modal'
    awardIsZeroDialogStyle.title = `<span class="awards-are-zero-title">${title}</span>`
    awardIsZeroDialogStyle.html = `<div style="font-weight: bolder">${content}</div>`
    awardIsZeroDialogStyle.confirmButtonText = buttonText || '好的'
    awardIsZeroDialogStyle.onOpen = () => {
      $('.swal2-content').append(
        `
          <div class="shining-block">
            <div class="shining-coins"></div>
            <div class="shining-gems"></div>
          </div>
        `
      )
      for (let index = 1; index < 31; index++) {
        $('.shining-block .shining-coins')
          .append(`<img class="coins${index}" src="./img/magicImg/coinGif.gif">`)
      }
      for (let index = 1; index < 21; index++) {
        $('.shining-block .shining-gems')
          .append(`<img class="gems${index}" src="./img/magicImg/gemGif.gif">`)
      }
    }

    sweetAlert(awardIsZeroDialogStyle).then(result => {
      if (result.value && awardIsZeroFun) {
        awardIsZeroFun()
      }
    })
  }

  return confirmPopup
})
