define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  return async () => {
    let composeTopRankingInfo = rankingInfo => {
      return `
        <div class="tab-content default" id="personal-rank">
          <div class="container-rank" >
            <div class="content-option">
              <div class="btn-my-rank">我的排行</div>
              <div class="btn-now-rank">目前獎勵</div>
            </div>
            <div class="content-no123">
              <div class="rank rank-no1">
                <div class="ranking">
                  <div class="bg-circle1">
                    <div class="number">1st</div>
                  </div>
                </div>
                <div class="pic-no1">
                  <div class="crown">
                    <img src="./img/magicImg/crown.png">
                  </div>
                  <img class="head-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                </div>
                <div class="person-info">
                  <div class="name-no1">${rankingInfo[0]['userName']}</div>
                  <div class="score">
                    <div class="list-title">積分：</div>
                    <div class="score-no1">${rankingInfo[0]['sumPoints']}</div>
                  </div>
                </div>
              </div>
              <div class="rank rank-no2">
                <div class="ranking">
                  <div class="bg-circle2">
                    <div class="number">2nd</div>
                  </div>
                </div>
                <div class="pic-no2">
                  <img class="head-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                </div>
                <div class="person-info">
                  <div class="name-no2">${rankingInfo[1]['userName']}</div>
                  <div class="score">
                    <div class="list-title">積分：</div>
                    <div class="score-no2">${rankingInfo[1]['sumPoints']}</div>
                  </div>
                </div>
              </div>
              <div class="rank rank-no3">
                <div class="ranking">
                  <div class="bg-circle3">
                    <div class="number">3rd</div>
                  </div>
                </div>
                <div class="pic-no3">
                  <img class="head-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                </div>
                <div class="person-info">
                  <div class="name-no3">${rankingInfo[2]['userName']}</div>
                  <div class="score">
                    <div class="list-title">積分：</div>
                    <div class="score-no3">${rankingInfo[2]['sumPoints']}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }

    let jsonData = await ajax('GET', `/chest/rank/top`)
    let rankingInfo = jsonData.content
    return composeTopRankingInfo(rankingInfo)
      // .then(jsonData => {
      //
      //   let i
      //   for (i = 0; i < top3ranking.length; i++) {
      //     let specificRankingInfo = top3ranking[i]
      //     let rankTargets = $('.rank')
      //     $(rankTargets[i]).find('div[class^=name-no]').text(specificRankingInfo['userName'])
      //     $(rankTargets[i]).find('div[class^=score-no]').text(specificRankingInfo['sumPoints'])
      //   }
      // })
  }
})
