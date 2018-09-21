define(['jquery'], $ => {// eslint-disable-line
  return (chest, targets) => {
    /* requireJs進來，click後綁定自己將參數(chest, targets)傳入 */
    /* 啟動按鈕 */
    require(['eventChestInception'], eventChestInception => {
      targets.startBtn.off('click')
      targets.startBtn.on('click', () => {
        eventChestInception(chest, targets)
      })
    })

    /* 立即開啟按鈕 */
    require(['eventChestOpenImmediately'], eventChestOpenImmediately => {
      targets.readyNowBtn.off('click')
      targets.readyNowBtn.on('click', eventChestOpenImmediately.ask.bind(eventChestOpenImmediately.ask, chest, targets))
    })

    /* 升級按鈕 */
    require(['eventChestUpgrade'], eventChestUpgrade => {
      targets.upgradeBtn.off('click')
      targets.upgradeBtn.on('click', eventChestUpgrade.ask.bind(eventChestUpgrade.ask, chest, targets))
    })

    /* 開啟藥水 */
    require(['eventChestOpen'], eventChestOpen => {
      targets.openBtn.off('click')
      targets.openBtn.on('click', (event) => {
        let currentTarget = event.currentTarget
        let isAllowSamePlatformReOpen
        event.preventDefault()

        isAllowSamePlatformReOpen = (new Date().getTime() - $(currentTarget).attr('data-lockedAt') > 5000)
        if (!$(currentTarget).attr('data-lockedAt') || isAllowSamePlatformReOpen) {
          eventChestOpen(chest, targets)
        }

        // 每次觸發按鈕時間，即增加時戳，防止連續點擊
        $(currentTarget).attr('data-lockedAt', new Date().getTime())
      })
    })
  }
})
