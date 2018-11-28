define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  return async () => {
    let composeTopRankingInfo = rankingList => {
      return `
        <div class="tab-content default" id="personal-rank">
          <div class="container-rank" >
            <div class="content-option">
              <div class="btn-my-rank">我的排行</div>
              <div class="btn-now-rank">目前獎勵</div>
            </div>
            <div class="content-no123">
              ${ rankingList }
            </div>
          </div>
        </div>
      `
    }

    let jsonData = await ajax('GET', `/chest/rank/top`)
    let topRankings = jsonData.content
    let rankingList = topRankings.length > 0 ? '' : '<p>積分排名統計中</p>'
    for (let i = 0; i < topRankings.length; i++) {
      let topRanking = topRankings[i]
      let rank = i + 1
      rankingList += `
        <div class="rank rank-no${ rank }">
          <div class="ranking">
            <div class="bg-circle1">
              <div class="number">${ rank }st</div>
            </div>
          </div>
          <div class="pic-no1">
            <div class="crown">
              <img src="./img/magicImg/crown.png">
            </div>
            <img class="head-pic" src="${ topRanking['userAvatar'] }">
          </div>
          <div class="person-info">
            <div class="name-no1">${ topRanking['userName'] }</div>
            <div class="score">
              <div class="list-title">積分：</div>
              <div class="score-no1">${ topRanking['sumPoints'] }</div>
            </div>
          </div>
        </div>
      `
    }
    return composeTopRankingInfo(rankingList)
  }
})
