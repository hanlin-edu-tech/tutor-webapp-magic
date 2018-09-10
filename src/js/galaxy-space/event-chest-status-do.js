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

    unLocking: (chest, targets) => {
      $(`.platform-${chest.colorPlatform} .chest${chest.level}`).attr('data-status', 'UNLOCKING')

      ajax('GET', `/chest/coolDownTime/${chest.id}`)
        .then(data => {
          let seconds = data.content
          $('.start-btn').css('display', 'none')
          $('.upgrade-btn').css('left', '27%')

          targets.startBtn.css('display', 'none')
          targets.upgradeBtn.css('display', 'none')
          targets.readyBtn.css('display', 'none')
          targets.openNowBtn.removeAttr('style')
          targets.platformChest.css('filter', 'url("#grayscale")')

          require(['eventCountdown', 'eventChestReady'], (eventCountdown, eventChestReady) => {
            eventCountdown(seconds, chest, targets, eventChestReady)
          })
        })
    },

    ready: (chest, targets) => {
      targets.countdown.css('display', 'none')
      targets.startBtn.css('display', 'none')
      targets.upgradeBtn.css('display', 'none')
      targets.openNowBtn.css('display', 'none')
      targets.readyBtn.removeAttr('style')
      targets.platformChest.removeAttr('style')
      targets.platformChest.attr('data-status', 'READY')
      targets.platformChest.attr('src', `https://d220xxmclrx033.cloudfront.net/event-space/img/chest/readyChest${chest.level}.png`)
    }
  }
})
