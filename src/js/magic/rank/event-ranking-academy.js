define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  return async () => {
    let composeAcademyRankingInfo = (rankingInfo, perSandglass) => {
      let userBelongAcademy = ''
      if (rankingInfo['flag'] === 'QUALIFIED') {
        userBelongAcademy = `
          <div class="section-school-rank">
            <div class="rank-option-title">你的學院目前為</div>
            <div class="row-school-rank">
              <div class="rank-option-title">第</div>
              <div class="school-rank">${ rankingInfo['academySumRank'] }</div>
              <div class="rank-option-title">名</div>
            </div>
          </div>
          <div class="section-school-percent">
            <div class="rank-option-title">你在 ${ rankingInfo['academyBadgeName'] }</div>
            <div class="row-school-percent">
              <div class="rank-option-title">第</div>
              <div class="school-no">${ rankingInfo['academyRank'] }</div>
              <div class="rank-option-title">名(</div>
              <div class="school-percent">${ rankingInfo['academySumPointsPercent'] }</div>
              <div class="rank-option-title">)</div>
            </div>
          </div>
        `
      }

      return `
        <div class="tab-content" id="school-rank">
          <div class="container-school-rank">
            <div class="school-rank-option">
              <div class="count-date">
                <div class="rank-option-title">本次結算時間</div>
                <div class="myrank-count-date">${ rankingInfo['rankingEndTime'] }</div>
              </div>
              <div class="count-time">
                <div class="rank-option-title">距離結算還有</div>
                <div class="myrank-count-time">${ rankingInfo['remainingSeconds']}</div>
              </div>
              ${ userBelongAcademy }
            </div>
            <div class="school-rank-sandglass">
              ${ perSandglass }
            </div>
            <div class="school-rank-no1-gift">
              <div class="container-no1-gift">
                <div class="no1-gift-title">第1名獎勵</div>
                <div class="no1-gift-list">
                  <div class="row-gift">
                    <img class="no1-gift-pic" src="./img/magicImg/ecoin_box.png">
                    <div class="no1-gift-name">
                      <div class="no1-ecoin-title">e幣</div>
                      <div class="school-no1-ecoin">${ rankingInfo['coins'] }</div>
                    </div>
                  </div>
                  <div class="row-gift">
                    <img class="no1-gift-pic" src="./img/magicImg/diamond_box_get.png">
                    <div class="no1-gift-name">
                      <div class="no1-diamond-title">寶石</div>
                      <div class="school-no1-diamond">${ rankingInfo['gems'] }</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      `
    }

    let jsonData = await ajax('GET', `/chest/rank/academyRanking/specificUser`)
    let rankingInfo = jsonData.content
    let perAcademyRankingsInfo = rankingInfo['perAcademyRankingsInfo']
    let perSandglass = ''
    const SANDGLASS_LIMIT = 80
    for (let i = 0; i < perAcademyRankingsInfo.length; i++) {
      let perAcademyRanking = perAcademyRankingsInfo[i]
      let perAcademyBadge = perAcademyRanking['academyBadge']
      let sandglassHeight = SANDGLASS_LIMIT * (perAcademyRanking['academySumPoints'] / rankingInfo ['allPoints'])
      perSandglass += `
        <div class="sandglass-${ perAcademyBadge }">
          <div class="sandglass-school-pic">
            <img class="no1-gift-pic" src="./img/magicImg/badge_${ perAcademyBadge }.png">
          </div>
          <div class="sandglass-school-rank">${ perAcademyRanking['academyBadgeName'] }</div>
          <div class="sandglass-school-content">
            <img class="no1-gift-pic" src="./img/magicImg/sandglass-${ perAcademyBadge }.png">
            <div class="${ perAcademyBadge }-progress" style="height: ${ sandglassHeight }%"></div>
          </div>
          <div class="sandglass-school-score school-score-cat">${ perAcademyRanking['academySumPoints'] }</div>
        </div>    
      `
    }

    return composeAcademyRankingInfo(rankingInfo, perSandglass)
  }
})

