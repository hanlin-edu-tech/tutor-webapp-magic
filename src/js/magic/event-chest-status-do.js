define(['jquery', 'ajax'], ($, ajax) => {// eslint-disable-line
  return {
    locked: (chest, targets, isUnlockingChestExisted) => {
      if (isUnlockingChestExisted) {
        if (chest.level !== 6) {
          targets.upgradeBtn.css({display: '', left: '27%'})
        }
      } else if (chest.level === 6) {
        targets.startBtn.css({display: '', left: '27%'})
      } else {
        targets.startBtn.removeAttr('style')
        targets.upgradeBtn.removeAttr('style')
      }
    },

    unLocking: (chest, targets, beginInceptionFn) => {
      targets.platformChest.attr('data-status', 'UNLOCKING')

      ajax('GET', `/chest/coolDownTime/${chest.id}`)
        .then(data => {
          let seconds = data.content
          if (beginInceptionFn) {
            beginInceptionFn()
          } else {
            $('.mix_btn').css('display', 'none')
            $('.upgrade_btn').css('left', '27%')

            targets.startBtn.css('display', 'none')
            targets.upgradeBtn.css('display', 'none')
            targets.openBtn.css('display', 'none')
            targets.readyNowBtn.removeAttr('style')
            targets.platformChest.css('filter', 'url("#grayscale")')
          }

          require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
            eventCountdown(seconds, chest, targets, eventChestReady)
          })
        })
    },

    ready: (chest, targets) => {
      targets.countdown.css('display', 'none')
      targets.startBtn.css('display', 'none')
      targets.upgradeBtn.css('display', 'none')
      targets.readyNowBtn.css('display', 'none')
      targets.openBtn.removeAttr('style')
      targets.platformChest.removeAttr('style')
      targets.platformChest.attr('data-status', 'READY')
      targets.platformChest.addClass('finish_animation')
      // targets.platformChest.attr('src', `https://d220xxmclrx033.cloudfront.net/event-space/img/chest/readyChest${chest.level}.png`)
    }
  }
})
