define(['jquery', 'ajax', 'confirmPopup', 'jqueryCountDown'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let composeSpecificUserInfo = (specificRanking, rankingDifference) => {
        return `
          <div class="student-info-login">
            <div class="section-student-pic">
              <div class="student-img"><img src="./img/magicImg/badge_cat.png"></div>
              <div class="student-name">${ specificRanking['userName'] }</div>
            </div>
            <div class="section-student-info">
              <div class="row-my-rank">
                <div class="my-info-list">我的名次</div>
                <div class="my-rank">${ specificRanking['sumPointsRank'] }</div>
              </div>
              <div class="row-my-score">
                <div class="my-info-list">我的積分</div>
                <div class="my-score">${ specificRanking['sumPoints'] }</div>
              </div>
              <div class="row-my-score-move">
              <div class="my-info-list">名次變化</div>
              <div class="my-score-move">${ rankingDifference }</div>
            </div>
            </div>
          </div>
        `
      }

      let composeRankingInfo = rankingInfo => {
        let specificRankingsRange = rankingInfo['specificRankingsRange']
        let rankInfo, rankItem = ''
        let specificUserInfo = `
          <div class="student-info-nologin">
            <div class="nologin-title">馬上登入<br>查看排行</div>
          </div>
        `

        let i
        for (i = 0; i < specificRankingsRange.length; i++) {
          let selectedUserClass
          let specificRanking = specificRankingsRange[i]
          let rankingDifference = specificRanking['rankingDifference']
          if (rankingDifference === 0) {
            rankingDifference = '-'
          } else if (rankingDifference > 0) {
            rankingDifference = '⬆' + rankingDifference
          } else {
            rankingDifference = '⬇' + rankingDifference
          }

          selectedUserClass = ''
          if (specificRanking['selectedUser'] === true) {
            selectedUserClass = 'active-my-rank'
            specificUserInfo = composeSpecificUserInfo(specificRanking, rankingDifference)
          }

          rankItem += `
            <div class="rank-list ${ selectedUserClass }">
              <div class="ranking">
                <div class="all-bg-circle">
                  <div class="all-number">${ specificRanking['sumPointsRank'] }</div>
                </div>
              </div>
              <div class="school-stamp"><img src="./img/magicImg/badge_cat.png"></div>
              <div class="student-info">
                <div class="student-name">
                  <div class="name">${ specificRanking['userName'] }</div>
                </div>
                <div class="score">
                  <div class="list-title">積分：</div>
                  <div class="my-score">${ specificRanking['sumPoints'] }</div>
                </div>
              </div>
              <div class="rank-move">
                <div class="bg-line">
                  <div class="move-number">${ rankingDifference }</div>
                </div>
              </div>
            </div>
          `
        }

        rankInfo = `
          <div class="content-person-info">
            <div class="container-info">  
              ${ specificUserInfo }
              <div class="count-section">
                <div class="count-date">
                  <div class="myrank-title-date">本次結算時間</div>
                  <div class="myrank-count-date">${ rankingInfo['rankingEndTime'] }</div>
                </div>
                <div class="count-time">
                  <div class="myrank-title-time">距離結算還有</div>
                  <div class="myrank-count-time"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-rank-list">
            <div class="container-rank-list">
              <div class="row-rank-list">
                ${ rankItem }        
              </div>
            </div>
          </div>
        `

        return rankInfo
      }

      let popupMyRanking = rankingInfo => {
        return `
          <div id="popup-grid-my-rank">
            <div class="content-title">
              <div class="title">我的排行</div>
            </div>
            ${ composeRankingInfo(rankingInfo) }
          </div>
        `
      }

      let composeMyRankingDialogAttr = () => {
        return {
          customClass: `confirm_message_box modal-popup-rank-height`,
          width: '820px',
          showCancelButton: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '返回',
          cancelFn: () => {
            /* 排行榜 */
            require(['eventRankingPopup'], eventRankPopup => {
              eventRankPopup()
            })
          }
        }
      }

      let popupHtml, dialogAttr
      ajax('GET', `/chest/rank/myRanking/specificUser`)
        .then(
          jsonData => {
            let rankingInfo = jsonData.content
            let flag = rankingInfo['flag']
            if (flag === 'UNQUALIFIED') {
              require(['eventRankingUnqualified'], eventRankUnqualifiedRanking => {
                popupHtml = eventRankUnqualifiedRanking.retrievePopupHtml(rankingInfo['sumPoints'])
                dialogAttr = eventRankUnqualifiedRanking.composeDialogAttr()
              })
            } else {
              popupHtml = popupMyRanking(rankingInfo)
              dialogAttr = composeMyRankingDialogAttr()
            }

            return rankingInfo['remainingSeconds']
          }
        )
        .then(remainingSeconds => {
          dialogAttr.onOpenFn = () => {
            let rankingCountDownTarget = $('.myrank-count-time')
            if (rankingCountDownTarget) {
              rankingCountDownTarget.countDown({
                timeInSecond: remainingSeconds,
                displayTpl: '{hour}時 {minute}分 {second}秒',
                limit: 'hour'
              })
            }
          }
          confirmPopup.dialog(popupHtml, dialogAttr)
        })
    }
  })
