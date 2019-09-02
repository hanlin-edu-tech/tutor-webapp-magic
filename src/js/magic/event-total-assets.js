define(['jquery', 'ajax', 'eventCountUp'], ($, ajax, eventCountUp) => {// eslint-disable-line
  ajax('GET', `http://localhost:9090/currencyBank/totalAssets`)
    .then(jsonData => {
      let content = jsonData.content
      let finalCoins = content.coins
      let finalGems = content.gems
      let academy = content.academy

      eventCountUp('ecoin', 0, finalCoins)
      eventCountUp('diamond', 0, finalGems)

      let badgeTarget = $('#badge.col-4')
      badgeTarget.empty()
      badgeTarget.append(`<img src="./img/magicImg/badge_${academy.badge}.png">`)
    })
})
