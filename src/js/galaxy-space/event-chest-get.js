define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return () => ajax('GET', `/chest/`)
    .then((jsonData) => {
      let chests
      let isUnlockingChestExisted = false

      chests = jsonData.content
      $(`.platform img[class^=chest]`).remove()

      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`.platform-${chest.colorPlatform}`)
        targets.platform
          .append(`<img class="chest${chest.level}" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/chest${chest.level}.png">`)

        targets.countdown = $(`.platform-${chest.colorPlatform} .countdown`)
        targets.startBtn = $(`.platform-${chest.colorPlatform} .start-btn`)
        targets.upgradeBtn = $(`.platform-${chest.colorPlatform} .upgrade-btn`)
        targets.readyBtn = $(`.platform-${chest.colorPlatform} .ready-btn`)
        targets.openNowBtn = $(`.platform-${chest.colorPlatform} .open-now-btn`)
        targets.platformChest = $(`.platform-${chest.colorPlatform} .chest${chest.level}`)

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
