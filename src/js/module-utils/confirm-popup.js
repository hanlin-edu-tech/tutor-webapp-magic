define(['jquery', 'sweetAlert'], ($, sweetAlert) => { // eslint-disable-line
  let constantStyle = {
    buttonsStyling: false,
    allowOutsideClick: false,
    heightAuto: false,
    reverseButtons: true,
    onBeforeOpen: () => {
      $('html').css({height: '100vh'})
    }
  }

  let cloneConstantStyle = function (commonStyle) {
    let newStyle = {}
    let attr
    for (attr in commonStyle) {
      newStyle[attr] = commonStyle[attr]
    }
    return newStyle
  }

  let confirmPopup = {}
  confirmPopup.dialog = (content, {
    width = '55%',
    customClass = 'confirm_message_box confirm-popup-default-height',
    background = 'rgba(73, 173, 177, 0.9)',
    title = '',
    confirmFn = () => {},
    cancelFn = () => {},
    onOpenFn = () => {},
    showConfirmButton = true,
    confirmBtnText = '確定',
    showCancelButton = true,
    cancelBtnText = '我再想想',
    confirmButtonClass = 'btn_iknow message_box_btn_style',
    cancelButtonClass = 'btn_iknow message_box_btn_style'
  } = {}) => {
    let dialogStyle = cloneConstantStyle(constantStyle)
    dialogStyle.width = width
    dialogStyle.customClass = customClass
    dialogStyle.background = background
    dialogStyle.title = title
    dialogStyle.html = content
    dialogStyle.showCancelButton = showCancelButton
    dialogStyle.showConfirmButton = showConfirmButton
    dialogStyle.confirmButtonText = confirmBtnText
    dialogStyle.cancelButtonText = cancelBtnText
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

  confirmPopup.baseImage = buttonText => {
    let gifStyle = cloneConstantStyle(constantStyle)
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
    gifStyle.customClass = 'confirm_message_box level-up-modal'
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
    let okStyle = cloneConstantStyle(constantStyle)
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
    let awardIsZeroDialogStyle = cloneConstantStyle(constantStyle)
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
