define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  ajax('GET', `http://localhost:8080/chest/ranking/top`)
    .then(jsonData => {
      let top3ranking = jsonData.content
      let i
      for (i = 0; i < top3ranking.length; i++) {
        let specificRankingInfo = top3ranking[i]
        let rankTargets = $('.rank')
        $(rankTargets[i]).find('div[class^=name-no]').text(specificRankingInfo['userName'])
        $(rankTargets[i]).find('div[class^=score-no]').text(specificRankingInfo['sumPoints'])
      }
    })
})
