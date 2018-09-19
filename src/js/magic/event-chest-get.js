define(['jquery', 'ajax', 'eventChestBtnOn'], ($, ajax, eventChestBtnOn) => {// eslint-disable-line
  return (noviceObj = {}) => {
    let uri = noviceObj.isNovice ? `/chest/?isNoviceExisted=true` : `/chest/`

    ajax('GET', uri)
      .then((jsonData) => {
        let chests = jsonData.content
        $('#section_middle_part .potion img, #section_novice .potion img').remove()

        for (let index in chests) {
          let chest = chests[index]
          let isUnlockingChestExisted = false
          let chestRelativeOperation = noviceObj.isNovice ? $(`#section_novice .col-3.${chest.colorPlatform}`)
            : $(`#section_middle_part .col-3.${chest.colorPlatform}`)
          let platformTarget = noviceObj.isNovice ? $(`#section_novice .potion.platform-${chest.colorPlatform}`)
            : $(`#section_middle_part .potion.platform-${chest.colorPlatform}`)

          let targets = {
            platform: platformTarget,
            countdown: chestRelativeOperation.find('.count_time'),
            startBtn: chestRelativeOperation.find('.mix_btn'),
            upgradeBtn: chestRelativeOperation.find('.upgrade_btn'),
            openBtn: chestRelativeOperation.find('.mix_finish'),
            readyNowBtn: chestRelativeOperation.find('.now_finish'),
          }

          targets.chestInstance = chest
          targets.platform
            .append(`<img class="LV${chest.level}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/magicImg/LV${chest.level}.png">`)

          targets.platformChest = chestRelativeOperation.find(`.potion.platform-${chest.colorPlatform} img`)

          console.log(targets)

          if (chest.status === 'UNLOCKING') {
            isUnlockingChestExisted = true
          }

          require(['eventChestDetermine'], eventChestDetermine => {
            eventChestDetermine(chest, targets, isUnlockingChestExisted)
          })

          eventChestBtnOn(chest, targets)
          if (noviceObj.isNovice) {
            noviceObj.noviceExecFn()
          }
        }
      })
  }
})
