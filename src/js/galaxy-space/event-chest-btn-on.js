define(['jquery'], $ => {// eslint-disable-line
  return (chest, targets) => {
    /* requireJs進來，click後綁定自己將參數(chest, targets)傳入 */
    /* 啟動按鈕 */
    require(['eventChestStart'], eventChestStart => {
      targets.startBtn.off('click')
      targets.startBtn.on('click', eventChestStart.bind(eventChestStart, chest, targets))
    })

    /* 立即開啟按鈕 */
    require(['eventChestOpenImmediately'], eventChestOpenImmediately => {
      targets.openNowBtn.off('click')
      targets.openNowBtn.on('click', eventChestOpenImmediately.ask.bind(eventChestOpenImmediately.ask, chest, targets))
    })

    /* 升級按鈕 */
    require(['eventChestUpgrade'], eventChestUpgrade => {
      targets.upgradeBtn.off('click')
      targets.upgradeBtn.on('click', eventChestUpgrade.ask.bind(eventChestUpgrade.ask, chest, targets))
    })

    /* 開啟寶箱 */
    require(['eventChestOpen'], eventChestOpen => {
      targets.readyBtn.off('click')
      targets.readyBtn.on('click', (event) => {
        let currentTarget = event.currentTarget
        event.preventDefault()
        if (!$(currentTarget).attr('data-lockedAt') ||
          new Date().getTime() - $(currentTarget).attr('data-lockedAt') > 1000) {
          eventChestOpen(chest, targets)
        }
        $(currentTarget).attr('data-lockedAt', new Date().getTime())
      })
    })
  }
})
