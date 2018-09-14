define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return () => ajax('GET', `/chest/`)
    .then((jsonData) => {
      let chests = jsonData.content
      let isUnlockingChestExisted = false

      $(`#section_middle_part .potion img`).remove()

      for (let index in chests) {
        let chest = chests[index]
        let targets = {}
        let currentChest

        targets.platform = $(`#section_middle_part .potion.platform-${chest.colorPlatform}`)
        targets.platform
          .append(`<img class="LV${chest.level}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${chest.level}.png">`)

        currentChest = $(`#section_middle_part .col-3.${chest.colorPlatform}`)
        targets.countdown = currentChest.find('.count_time')
        targets.startBtn = currentChest.find('.mix_btn')
        targets.upgradeBtn = currentChest.find('.upgrade_btn')
        targets.openBtn = currentChest.find('.mix_finish')
        targets.readyNowBtn = currentChest.find('.now_finish')
        targets.platformChest = currentChest.find(`.potion.platform-${chest.colorPlatform} .LV${chest.level}`)

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
