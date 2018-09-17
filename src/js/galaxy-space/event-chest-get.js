define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return (targets, isNovice = false) => ajax('GET', `/chest/`)
    .then((jsonData) => {
      let chests = jsonData.content
      let isUnlockingChestExisted = false

      $('#section_middle_part .potion img, #section_novice .potion img').remove()

      for (let index in chests) {
        let chest = chests[index]
        let chestRelativeOperation = $(`#section_middle_part .col-3.${chest.colorPlatform}`)
        let execTargets = isNovice ? targets :
          {
            platform: $(`#section_middle_part .potion.platform-${chest.colorPlatform}`),
            countdown: chestRelativeOperation.find('.count_time'),
            startBtn: chestRelativeOperation.find('.mix_btn'),
            upgradeBtn: chestRelativeOperation.find('.upgrade_btn'),
            openBtn: chestRelativeOperation.find('.mix_finish'),
            readyNowBtn: chestRelativeOperation.find('.now_finish'),
          }

        execTargets.platform
          .append(`<img class="LV${chest.level}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${chest.level}.png">`)
        execTargets.platformChest = chestRelativeOperation.find(`.potion.platform-${chest.colorPlatform} .LV${chest.level}`)

        if (chest.status === 'UNLOCKING') {
          isUnlockingChestExisted = true
        }

        require(['eventChestDetermine'], eventChestDetermine => {
          eventChestDetermine(chest, execTargets, isUnlockingChestExisted)
        })

        eventChestBtnOn(chest, execTargets)
        if(execTargets.execAnotherFn) {
          execTargets.execAnotherFn()
        }
      }
    })
})
