define(['jquery', 'ajax', 'eventCountUp'], ($, ajax, eventCountUp) => {// eslint-disable-line
  ajax('GET', `/currencyBank/totalAssets`)
    .then(data => {
      let finalCoins = data.content.coins
      let finalGems = data.content.gems

      eventCountUp('coins', 0, finalCoins)
      eventCountUp('gems', 0, finalGems)
    })
})
