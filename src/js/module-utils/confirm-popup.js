define(['jquery', 'swal'], ($, swal) => { // eslint-disable-line
  let commonStyle = {
    background: 'url(https://d220xxmclrx033.cloudfront.net/event-space/img/popup/confirm.png) repeat center center / contain',
    width: '100%',
    customClass: 'confirm-popup-modal',
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

  let confirmPopup = {}
  confirmPopup.dialog = (content, {
    confirmFn = () => {},
    cancelFn = () => {},
    onOpenFn = () => {},
    confirmBtnText = '確定',
    cancelBtnText = '我再想想',
    isShowCancelButton = true
  } = {}) => {
    let dialogStyle = cloneCommonStyle(commonStyle)
    dialogStyle.title = ''
    dialogStyle.html = content
    dialogStyle.showCancelButton = isShowCancelButton
    dialogStyle.confirmButtonText = confirmBtnText
    dialogStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-dialog'
    dialogStyle.cancelButtonText = cancelBtnText
    dialogStyle.cancelButtonClass = 'confirm-popup-btn confirm-popup-btn-cancel'
    dialogStyle.reverseButtons = true
    dialogStyle.onOpen = () => {
      $('.swal2-header').remove()
      onOpenFn()
    }

    return swal(dialogStyle)
      .then((result) => {
        if (result.value && confirmFn) {
          confirmFn()
        } else if (result.dismiss === swal.DismissReason.cancel) {
          cancelFn()
        }
      })
  }

  confirmPopup.image = buttonText => {
    let gifStyle = cloneCommonStyle(commonStyle)
    gifStyle.title = ''
    gifStyle.confirmButtonText = buttonText || '我瞭解了'
    gifStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-gif'
    gifStyle.onOpen = () => {
      $('.swal2-header').remove()
    }
    return gifStyle
  }

  confirmPopup.luckyBagImage = (title, content, gifImageFn, buttonText) => {
    let gifStyle = confirmPopup.image(buttonText)
    gifStyle.html = `
      <div class="confirm-grid-gif-container lucky-bag-height">
        <div class="header-block1">${title}</div>
        <div class="content-block1 ">${content}</div>
      </div> 
    `
    return swal(gifStyle).then((result) => {
      if (result.value && gifImageFn) {
        gifImageFn()
      }
    })
  }

  confirmPopup.levelUpImage = (title, content, gifImageFn, buttonText) => {
    let gifStyle = confirmPopup.image(buttonText)
    gifStyle.customClass = 'level-up-modal'
    gifStyle.html =
      `
        <div class="confirm-grid-gif-container level-up-height">
          <div class="header-block1">${title}</div>
          <div class="content-block1 ">${content}</div>
        </div> 
      `
    return swal(gifStyle).then((result) => {
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
    okStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-ok'

    return swal(okStyle).then((result) => {
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
    awardIsZeroDialogStyle.confirmButtonClass = 'confirm-popup-btn confirm-popup-btn-awardZero'
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
    return swal(awardIsZeroDialogStyle).then(result => {
      if (result.value && awardIsZeroFun) {
        awardIsZeroFun()
      }
    })
  }

  return confirmPopup
})
