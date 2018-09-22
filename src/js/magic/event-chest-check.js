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
        confirmButtonText: '我瞭解了',
        showCancelButton: false,
        confirmFn: () => {
          window.location.reload()
        }
      })
    }
    return isAbnormally
  }
})
