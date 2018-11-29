define(['jquery', 'ajax', 'confirmPopup', 'jqueryCountDown'],
  ($, ajax, confirmPopup) => {// eslint-disable-line
    return () => {
      let composeRankingPopupHtml = (topRanking, academyRanking, history) => {
        return `
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
              ${ topRanking }
              ${ academyRanking }
              ${ history }
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
                      <li>(1)個人榮譽榜獎勵：結算排名在前 100 名符合資格之會員，可獲得以下獎勵：</li>
                        <li>
                        <table>
                          <tr>
                            <th>名次</th>
                            <th>獎勵</th>
                          </tr>
                          <tr>
                          <tr>
                            <td>1</td>
                            <td>寶石 200</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>寶石 100</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>寶石 80</td>
                          </tr>
                          <tr>
                            <td>4 ~ 20</td>
                            <td>寶石 60</td>
                          </tr>
                          <tr>
                            <td>21 ~ 100</td>
                            <td>寶石 50</td>
                          </tr>
                        </table>
                      </li>
                      <li>學院排行獎勵：經結算排名，為獎勵每一學院 ** 積分前20名的同學 **，將給予特別獎勵：</li>
                      <li>
                        <table class="table-school">
                          <tr>
                            <th>學院名次</th>
                            <th>獎勵</th>
                          </tr>
                          <tr>
                          <tr>
                            <td>1</td>
                            <td>e 幣 1500、寶石 50</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>e 幣 1000、寶石 25</td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>e 幣 500、寶石 10</td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>e 幣 300</td>
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
      }

      let dialogAttr = {
        customClass: `my_treasure_message_box modal-popup-rank-height`,
        background: '#a6937c',
        width: '800px',
        showCancelButton: false,
        confirmButtonText: '我知道了',
        confirmButtonClass: 'btn message_box_btn_style',
        onOpenFn: () => {
          $('.tab-content:not(.default)').hide()
          $('.nav-tab').on('click', event => {
            let currentTarget = $(event.currentTarget)
            let type = currentTarget.data('type')
            currentTarget.addClass('active')
              .siblings('.nav-tab')
              .removeClass('active')

            $(`.tab-content#${ type }`).show()
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

          let rankingCountDownTarget = $('#school-rank .myrank-count-time')
          if (rankingCountDownTarget) {
            rankingCountDownTarget.countDown({
              timeInSecond: rankingCountDownTarget.text(),
              displayTpl: '{hour}時 {minute}分 {second}秒',
              limit: 'hour'
            })
          }

          require(['eventRankingMy'], eventRankingMy => $('#personal-rank .btn-my-rank').on('click', eventRankingMy))
          require(['eventRankingReward'], eventRankReward => $('#personal-rank .btn-now-rank').on('click', eventRankReward))
        }
      }

      require(['eventRankingTop', 'eventRankingAcademy', 'eventRankingHistory'],
        (eventRankingTop, eventRankingAcademy, eventRankingHistory) => {
          Promise.all(
            [eventRankingTop(), eventRankingAcademy(), eventRankingHistory.retrieveRankingRewardHistory()]
          ).then(relativeRanking => {
            let topRanking = relativeRanking[0]
            let academyRanking = relativeRanking[1]
            let history = relativeRanking[2]
            confirmPopup.dialog(composeRankingPopupHtml(topRanking, academyRanking, history), dialogAttr)
          })
        })
    }
  })
