define(['jquery', 'confirmPopup'], ($, confirmPopup) => { // eslint-disable-line
  return (message, checkResult) => {
    let isAbnormally = false
    if (message === 'Chest operate abnormally by user') {
      isAbnormally = true
      confirmPopup.dialog(checkResult, {
        title: 'Oooooops！',
        confirmButtonText: '我瞭解了',
        confirmFn: () => {
          window.location.reload()
        }
      })
    }
    return isAbnormally
  }
})
