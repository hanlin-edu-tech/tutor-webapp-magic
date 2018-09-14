define(['jquery', 'sweetAlert'], ($, sweetAlert) => { // eslint-disable-line
  let commonStyle = {
    customClass: 'confirm-message-box',
    background: 'rgba(73, 173, 177, 0.9)',
    width: '72%',
    buttonsStyling: false,
    confirmButtonClass: 'btn_iknow confirm-message-box-btn',
    cancelButtonClass: 'btn_iknow confirm-message-box-btn',
    allowOutsideClick: false,
    heightAuto: false,
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

  let confirmPopup = {}
  confirmPopup.dialog = (content, {
    customClass = '',
    width = '',
    confirmFn = () => {},
    cancelFn = () => {},
    onOpenFn = () => {},
    confirmBtnText = '確定',
    cancelBtnText = '我再想想',
    isShowCancelButton = true
  } = {}) => {
    let dialogStyle = cloneCommonStyle(commonStyle)
    dialogStyle.customClass = customClass ? customClass : dialogStyle.customClass
    dialogStyle.width = width ? width : dialogStyle.width
    dialogStyle.title = ''
    dialogStyle.html = `${content}`
    dialogStyle.showCancelButton = isShowCancelButton
    dialogStyle.confirmButtonText = confirmBtnText
    dialogStyle.cancelButtonText = cancelBtnText
    dialogStyle.reverseButtons = true
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

  confirmPopup.baseImage = buttonText => {
    let gifStyle = cloneCommonStyle(commonStyle)
    gifStyle.title = ''
    gifStyle.confirmButtonText = buttonText || '我瞭解了'
    gifStyle.onOpen = () => {
      $('.swal2-header').remove()
    }
    return gifStyle
  }

  confirmPopup.luckyBagImage = (title, content, gifImageFn, buttonText) => {
    let gifStyle = confirmPopup.baseImage(buttonText)
    gifStyle.html = `
      <div class="confirm-grid-gif-img-container lucky-bag-height">
        <div class="header-block1">${title}</div>
        <div class="content-block1 ">${content}</div>
      </div> 
    `
    sweetAlert(gifStyle).then((result) => {
      if (result.value && gifImageFn) {
        gifImageFn()
      }
    })
  }

  confirmPopup.levelUpImage = (title, content, gifImageFn, buttonText) => {
    let gifStyle = confirmPopup.baseImage(buttonText)
    gifStyle.customClass = 'level-up-modal'
    gifStyle.html =
      `
        <div class="confirm-grid-gif-img-container level-up-height">
          <div class="header-block1">${title}</div>
          <div class="content-block1 ">${content}</div>
        </div> 
      `
    sweetAlert(gifStyle).then((result) => {
      if (result.value && gifImageFn) {
        gifImageFn()
      }
    })
  }

  confirmPopup.generalImage = (title, content, gifImageFn, buttonText) => {
    let gifStyle = confirmPopup.baseImage(buttonText)
    gifStyle.customClass = 'confirm-message-box level-up-modal'
    gifStyle.html =
      `
        <div class="confirm-grid-gif-img-container level-up-height">
          <div class="header-block1">${title}</div>
          <div class="content-block1 ">${content}</div>
        </div> 
      `
    sweetAlert(gifStyle).then((result) => {
      if (result.value && gifImageFn) {
        gifImageFn()
      }
    })
  }

  confirmPopup.ok = (title, content, okFn, buttonText) => {
    let okStyle = cloneCommonStyle(commonStyle)
    okStyle.title = `<span style="color: #217dbb;">${title}</span>`
    okStyle.html = `<div style="font-weight: bolder">${content}</div>`
    okStyle.confirmButtonText = buttonText || '我瞭解了'

    sweetAlert(okStyle).then((result) => {
      if (result.value && okFn) {
        okFn()
      }
    })
  }

  confirmPopup.awardIsZeroDialog = (title, content, awardIsZeroFun, buttonText) => {
    let awardIsZeroDialogStyle = cloneCommonStyle(commonStyle)
    awardIsZeroDialogStyle.customClass = 'awards-are-zero-confirm-popup-modal'
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
          .append(`<img class="coins${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/coinGif.gif">`)
      }
      for (let index = 1; index < 21; index++) {
        $('.shining-block .shining-gems')
          .append(`<img class="gems${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/gemGif.gif">`)
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
