define(['jquery', 'confirmPopup'], ($, confirmPopup) => { // eslint-disable-line
  return (message, checkResult) => {
    let isAbnormally = false
    let confirmFn
    if (message === 'Chest operate abnormally by user') {
      isAbnormally = true
      checkResult = `
        <div class="confirm-popup-title-font">Ｏooooops !!!</div>
        <p class="common-font">${checkResult}</p>
      `

      if (checkResult.indexOf('不是雲端奇幻魔藥學的正式學員') >= 0) {
        confirmFn = () => {
          window.location = `https://www.ehanlin.com.tw/courses_map.html`
        }
      } else {
        confirmFn = () => {
          window.location.reload()
        }
      }

      confirmPopup.dialog(checkResult, {
        confirmButtonText: '好的',
        showCancelButton: false,
        confirmFn: confirmFn
      })
    }
    return isAbnormally
  }
})
