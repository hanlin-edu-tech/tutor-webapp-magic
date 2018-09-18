define(['jquery', 'ajax', 'eventCountUp'], ($, ajax, eventCountUp) => {// eslint-disable-line
  ajax('GET', `http://localhost:9090/currencyBank/totalAssets`)
    .then(data => {
      let finalCoins = data.content.coins
      let finalGems = data.content.gems

      eventCountUp('ecoin', 0, finalCoins)
      eventCountUp('diamond', 0, finalGems)
    })
})
