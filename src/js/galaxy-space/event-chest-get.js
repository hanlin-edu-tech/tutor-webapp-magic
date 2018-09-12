define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return () => ajax('GET', `/chest/`)
    .then((jsonData) => {
      let chests
      let isUnlockingChestExisted = false

      chests = jsonData.content
      $(`#section_middle_part .potion_colum img[class^=chest]`).remove()

      for (let index in chests) {
        let chest = chests[index]
        let targets = {}

        targets.platform = $(`#section_middle_part .potion.platform-${chest.colorPlatform}`)

        targets.platform
          .append(`<img src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${chest.level}.png">`)

        targets.countdown = $(`.col-3.${chest.colorPlatform} .count_time`)
        targets.startBtn = $(`.col-3.${chest.colorPlatform} .mix_btn`)
        targets.upgradeBtn = $(`.col-3.${chest.colorPlatform} .upgrade_btn`)
        targets.readyBtn = $(`.col-3.${chest.colorPlatform} .mix_finish`)
        targets.openNowBtn = $(`.col-3.${chest.colorPlatform} .now_finish`)
        targets.platformChest = $(`.col-3.${chest.colorPlatform} .LV${chest.level}`)

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
