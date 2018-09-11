define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return () => ajax('GET', `/chest/`)
    .then((jsonData) => {
      let chests
      let isUnlockingChestExisted = false

      chests = jsonData.content
      $(`.potion_colum img[class^=chest]`).remove()

      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`.potion.platform-${chest.colorPlatform}`)

        targets.platform
          .append(`<img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${chest.level}.png" alt="Responsive image">`)

        targets.countdown = $(`.platform-${chest.colorPlatform} .count_time`)
        targets.startBtn = $(`.platform-${chest.colorPlatform} .start-btn`)
        targets.upgradeBtn = $(`.platform-${chest.colorPlatform} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${chest.colorPlatform} .ready-btn`)
        targets.openNowBtn = $(`.platform-${chest.colorPlatform} .open-now-btn`)
        targets.platformChest = $(`.platform-${chest.colorPlatform} .LV${chest.level}`)

        if (chest.status === 'UNLOCKING') {
          isUnlockingChestExisted = true
        }

        require(['eventChestDetermine'], eventChestDetermine => {
          eventChestDetermine(chest, targets, isUnlockingChestExisted)
        })

        eventChestBtnOn(chest, targets)
      }
    })
})
