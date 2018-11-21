define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  return async () => {
    let composeAcademyRankingInfo = rankingInfo => {
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
                <div class="myrank-count-time"></div>
              </div>
              <div class="section-school-rank">
                <div class="rank-option-title">你的學院目前為</div>
                <div class="row-school-rank">
                  <div class="rank-option-title">第</div>
                  <div class="school-rank">${ rankingInfo['academyRankOrder'] }</div>
                  <div class="rank-option-title">名</div>
                </div>
              </div>
              <div class="section-school-percent">
                <div class="rank-option-title">你目前為學院中</div>
                <div class="row-school-percent">
                  <div class="rank-option-title">第</div>
                  <div class="school-no">${ rankingInfo['academyRank'] }</div>
                  <div class="rank-option-title">名(</div>
                  <div class="school-percent">${ rankingInfo['academyRanPercent'] }</div>
                  <div class="rank-option-title">%)</div>
                </div>
              </div>
            </div>
            <div class="school-rank-sandglass">
              <div class="sandglass-cat">
                <div class="sandglass-school-pic">
                  <img class="no1-gift-pic" src="./img/magicImg/badge_cat.png">
                </div>
                <div class="sandglass-school-rank">1st</div>
                <div class="sandglass-school-content">
                  <img class="no1-gift-pic" src="./img/magicImg/sandglass-cat.png">
                  <div class="cat-progress"></div>
                </div>
                <div class="sandglass-school-score school-score-cat">${ rankingInfo['catSumPoints'] }</div>
              </div>
              <div class="sandglass-lion">
                <div class="sandglass-school-pic">
                  <img class="no1-gift-pic" src="./img/magicImg/badge_lion.png">
                </div>
                <div class="sandglass-school-rank">2nd</div>
                <div class="sandglass-school-content">
                  <img class="no1-gift-pic" src="./img/magicImg/sandglass-lion.png">
                  <div class="lion-progress"></div>
                </div>
                <div class="sandglass-school-score school-score-lion">${ rankingInfo['lionSumPoints'] }</div>
              </div>
              <div class="sandglass-rabbit">
                <div class="sandglass-school-pic">
                  <img class="no1-gift-pic" src="./img/magicImg/badge_rabbit.png">
                </div>
                <div class="sandglass-school-rank">3rd</div>
                <div class="sandglass-school-content">
                  <img class="no1-gift-pic" src="./img/magicImg/sandglass-rabbit.png">
                  <div class="rabbit-progress"></div>
                </div>
                <div class="sandglass-school-score school-score-rabbit">${ rankingInfo['rabbitSumPoints'] }</div>
              </div>
              <div class="sandglass-tiger">
                <div class="sandglass-school-pic">
                  <img class="no1-gift-pic" src="./img/magicImg/badge_tiger.png"></div>
                <div class="sandglass-school-rank">4th</div>
                <div class="sandglass-school-content">
                  <img class="no1-gift-pic" src="./img/magicImg/sandglass-tiger.png">
                  <div class="tiger-progress"></div>
                </div>
                <div class="sandglass-school-score school-score-tiger">${ rankingInfo['tigerSumPoints'] }</div>
              </div>
            </div>
            <div class="school-rank-no1-gift">
              <div class="container-no1-gift">
                <div class="no1-gift-title">第一名獎勵</div>
                <div class="no1-gift-list">
                  <div class="row-gift"><img class="no1-gift-pic" src="./img/magicImg/ecoin_box.png">
                    <div class="no1-gift-name">
                      <div class="no1-ecoin-title">e幣</div>
                      <div class="school-no1-ecoin">1500</div>
                    </div>
                  </div>
                  <div class="row-gift"><img class="no1-gift-pic" src="./img/magicImg/diamond_box_get.png">
                    <div class="no1-gift-name">
                      <div class="no1-diamond-title">寶石</div>
                      <div class="school-no1-diamond">50</div>
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
    return composeAcademyRankingInfo(rankingInfo)
  }
})

