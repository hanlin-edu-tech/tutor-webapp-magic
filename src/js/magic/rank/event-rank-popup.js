define(['jquery', 'ajax', 'confirmPopup'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    let popupHtml = `
      <div class="rank-grid-container">
        <div class="content-block1">
          <div class="title">實力排行</div>
        </div>
        <div class="content-block2">
          <ul class="nav-list">
            <li class="nav-tab active" data-type="personal-rank">個人榮譽榜</li>
            <li class="nav-tab" data-type="school-rank">學院排行榜</li>
            <li class="nav-tab" data-type="history-record">歷史紀錄</li>
            <li class="nav-tab" data-type="active-explain">排行說明</li>
          </ul>
        </div>
        <div class="content-block3">
          <div class="tab-content default" id="personal-rank">
            <div class="container-rank">
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
                    <div class="crown"><img src="./img/magicImg/crown.png"></div>
                    <img class="head-pic"
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                  </div>
                  <div class="person-info">
                    <div class="name-no1"></div>
                    <div class="score">
                      <div class="list-title">積分：</div>
                      <div class="score-no1"></div>
                    </div>
                  </div>
                </div>
                <div class="rank rank-no2">
                  <div class="ranking">
                    <div class="bg-circle2">
                      <div class="number">2nd</div>
                    </div>
                  </div>
                  <div class="pic-no2"><img class="head-pic"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                  </div>
                  <div class="person-info">
                    <div class="name-no2"></div>
                    <div class="score">
                      <div class="list-title">積分：</div>
                      <div class="score-no2"></div>
                    </div>
                  </div>
                </div>
                <div class="rank rank-no3">
                  <div class="ranking">
                    <div class="bg-circle3">
                      <div class="number">3rd</div>
                    </div>
                  </div>
                  <div class="pic-no3"><img class="head-pic"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPI5YJuAZV9Ie979IQa-LoX5z4OLMwsnG3X9jzDguKiyYc6Aap">
                  </div>
                  <div class="person-info">
                    <div class="name-no3"></div>
                    <div class="score">
                      <div class="list-title">積分：</div>
                      <div class="score-no3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="school-rank">
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
          </div>
          <div class="tab-content" id="history-record">
            <div class="container-history">
              <div class="content-option">
                <div class="tab-option btn-my-rank history-active" data-type="history-my-rank">個人排行</div>
                <div class="tab-option btn-school-rank" data-type="history-school-rank">學院榮譽</div>
              </div>
              <div class="content-history-list">
                <div class="tab-option-content history-my-rank default">
                  <div class="content-history-my">
                    <ul class="row-item">
                      <li>入榜時間</li>
                      <li>獲得名次</li>
                      <li>獲得獎勵</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                    <ul class="row-my-list">
                      <li class="my-enter-time">2018.10.10</li>
                      <li class="my-rank">20</li>
                      <li class="my-get-gift">寶石100</li>
                    </ul>
                  </div>
                </div>
                <div class="tab-option-content history-school-rank">
                  <div class="content-history-school">
                    <ul class="row-item">
                      <li>入榜時間</li>
                      <li>學院名次</li>
                      <li>學院內名次</li>
                      <li>獲得獎勵</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                    <ul class="row-school-list">
                      <li class="school-enter-time">2018.10.10</li>
                      <li class="school-rank">3</li>
                      <li class="school-in-rank">20</li>
                      <li class="school-get-gift">e幣1200、寶石100</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="active-explain">
            <div class="container-explain">
              <div class="content-explain">
                <ul>1.積分說明：
                  <li>(1)個人榮譽榜積分計算:各個測驗項目及難度，皆會有對應的點數，此點數將換算為排行榜的積分。於結算時間內，有調配或升級過任一等級魔法藥水瓶之正式會員並有達到一定的積分方能入榜。</li>
                  <li>(2)學院排行榜積分計算:學院排行將以該學院中每人所獲得積分加總再以學院包含人數平均作為最後積分。</li>
                </ul>
                <ul>2.結算時間說明：
                  <li>每週一中午12點01分~隔週一中午12點為一個週期，排行榜每1小時更新1次，獎勵發放以結算時間(中午12點)當下所達排名為準。</li>
                </ul>
                <ul>3.獎勵發放時間：
                  <li>結算當天中午12點為最終排名，獎勵將於16:00前系統自動歸戶，歸戶後請至活動頁領取對應獎勵。</li>
                </ul>
                <ul>4.排行榜獎勵：
                  <li>(1)個人榮譽榜獎勵：結算排名在前20%符合資格之會員，可獲得以下獎勵</li>
                  <li>
                    <table>
                      <tr>
                        <th>名次</th>
                        <th>獎勵</th>
                        <th>備註</th>
                      </tr>
                      <tr>
                      <tr>
                        <td>1</td>
                        <td>Lv3藥水*1個、超多寶石の福袋*1個</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Lv2藥水*1個、超多寶石の福袋*1個</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Lv2藥水*1個、很多寶石の福袋*1個</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>前3%</td>
                        <td>Lv1藥水*1個、有點多寶石の福袋*1個</td>
                        <td>此區間自第4名起算</td>
                      </tr>
                      <tr>
                        <td>前10%</td>
                        <td>一般多寶石の福袋*1個</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>前20%</td>
                        <td>一點點寶石の福袋*1個</td>
                        <td></td>
                      </tr>
                      </tr>
                    </table>
                  </li>
                  <li>(2)學院排行榜獎勵：經結算排名，除第一名學院中貢獻排名前6%的學員可獲得對應獎勵外，為獎勵有為了各學院努力付出之學員，將給予其他學院貢獻排名前2%之學院特別獎勵：</li>
                  <li>
                    <table class="table-school">
                      <tr>
                        <th>學院名次</th>
                        <th>獎勵</th>
                      </tr>
                      <tr>
                      <tr>
                        <td>1</td>
                        <td>Lv2藥水*1、超多e幣の福袋*1</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Lv1藥水*1、很多e幣の福袋*1</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>一般量e幣の福袋*1</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>一點點e幣の福袋*1</td>
                      </tr>
                      </tr>
                    </table>
                  </li>
                </ul>
                <ul>5.注意事項：
                  <li>翰林雲端學院官方保有活動辦法最終解釋權。若有未盡事宜，在公平合理的原則下，官方有權修改或增減相關事項，若遇到不可抗力或作弊情事無法防堵，翰林雲端學院有權取消參賽及領獎資格並提早結束比賽。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    let dialogAttr = {
      customClass: `my_treasure_message_box modal-popup-rank-height`,
      background: '#a6937c',
      width: '800px',
      onOpenFn: () => {
        $('.tab-content:not(.default)').hide()
        $('.nav-tab').on('click', event => {
          let currentTarget = $(event.currentTarget)
          let type = currentTarget.data('type')
          currentTarget.addClass('active')
            .siblings('.nav-tab')
            .removeClass('active')

          $(`.tab-content#${type}`).show()
            .siblings('.tab-content')
            .hide()
        })

        $('.tab-option-content:not(.default)').hide()
        $('.tab-option').on('click', () => {
          let currentTarget = $(event.currentTarget)
          let type = currentTarget.data('type')
          currentTarget.addClass('history-active')
            .siblings('.tab-option')
            .removeClass('history-active')

          $('.tab-option-content.' + type).show()
            .siblings('.tab-option-content')
            .hide()
        })

        require(['eventRankTopRanking'])
        require(['eventRankMyRanking'], eventRankMyRanking => $('.btn-my-rank').on('click', eventRankMyRanking))
        require(['eventRankReward'], eventRankReward => $('.btn-now-rank').on('click', eventRankReward))
      }
    }

    confirmPopup.dialog(popupHtml, dialogAttr)
  })