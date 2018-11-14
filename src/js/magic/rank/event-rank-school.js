define(['jquery', 'ajax'], ($, ajax) => { // eslint-disable-line
  return () => {
    console.log('GG')
    let schoolRankTarget = $('#school-rank')
    let content = `
      <div class="container-school-rank">
        <div class="school-rank-option">
          <div class="count-date">
            <div class="rank-option-title">本次結算時間</div>
            <div class="myrank-count-date">2018.10.29</div>
          </div>
          <div class="count-time">
            <div class="rank-option-title">距離結算還有</div>
            <div class="myrank-count-time">08天07時41分</div>
          </div>
          <div class="section-school-rank">
            <div class="rank-option-title">你的學院目前為</div>
            <div class="row-school-rank">
              <div class="rank-option-title">第</div>
              <div class="school-rank">三</div>
              <div class="rank-option-title">名</div>
            </div>
          </div>
          <div class="section-school-percent">
            <div class="rank-option-title">你目前為學院中</div>
            <div class="row-school-percent">
              <div class="rank-option-title">第</div>
              <div class="school-no">133</div>
              <div class="rank-option-title">名(</div>
              <div class="school-percent">33</div>
              <div class="rank-option-title">%)</div>
            </div>
          </div>
        </div>
        <div class="school-rank-sandglass"></div>
        <div class="school-rank-no1-gift">
          <div class="container-no1-gift">
            <div class="no1-gift-title">第一名獎勵</div>
            <div class="no1-gift-list">
              <div class="row-gift"><img class="no1-gift-pic" src="./img/magicImg/ecoin_box.png">
                <div class="no1-gift-name">
                  <div class="no1-ecoin-title">e幣</div>
                  <div class="school-no1-ecoin">1800</div>
                </div>
              </div>
              <div class="row-gift"><img class="no1-gift-pic" src="./img/magicImg/diamond_box_get.png">
                <div class="no1-gift-name">
                  <div class="no1-diamond-title">寶石</div>
                  <div class="school-no1-diamond">1500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    schoolRankTarget.append(content)
    schoolRankTarget.css({display: ''})
  }
})
