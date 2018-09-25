define(['jquery', 'confirmPopup'], ($, confirmPopup) => { // eslint-disable-line
  return (message, checkResult) => {
    let isAbnormally = false
    if (message === 'Chest operate abnormally by user') {
      isAbnormally = true
      checkResult = `
        <div class="confirm-popup-title-font">Ｏooooops !!!</div>
        <p class="common-font">${checkResult}</p>
      `
      confirmPopup.dialog(checkResult, {
        confirmButtonText: '看所有課程',
        showCancelButton: false,
        confirmFn: () => {
          window.location = `https://www.ehanlin.com.tw/courses_map.html`
        }
      })
    }
    return isAbnormally
  }
})
