define(['jquery', 'ajax', 'confirmPopup'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let composeSpecificUserInfo = (specificRanking, rankingDifference) => {
        return `
          <div class="student-info-login">
            <div class="section-student-pic">
              <div class="student-img"><img src="./img/magicImg/badge_cat.png"></div>
              <div class="student-name">${specificRanking['userName']}</div>
            </div>
            <div class="section-student-info">
              <div class="row-my-rank">
                <div class="my-info-list">我的名次</div>
                <div class="my-rank">${specificRanking['sumPointsRank']}</div>
              </div>
              <div class="row-my-score">
                <div class="my-info-list">我的積分</div>
                <div class="my-score">${specificRanking['sumPoints']}</div>
              </div>
              <div class="row-my-score-move">
              <div class="my-info-list">名次變化</div>
              <div class="my-score-move">${rankingDifference}</div>
            </div>
            </div>
          </div>
        `
      }

      let composeRankInfo = rankingInfo => {
        let specificRankingsRange = rankingInfo['specificRankingsRange']
        let rankInfo, rankItem = ''
        let specificUserInfo = `
          <div class="student-info-nologin">
            <div class="nologin-title">馬上登入<br>查看排行</div>
          </div>
        `
        let selectedUserClass = ''
        let i
        for (i = 0; i < specificRankingsRange.length; i++) {
          let specificRanking = specificRankingsRange[i]
          let rankingDifference = specificRanking['rankingDifference']
          if (rankingDifference === 0) {
            rankingDifference = '-'
          } else if (rankingDifference > 0) {
            rankingDifference = '⬆' + rankingDifference
          } else {
            rankingDifference = '⬇' + rankingDifference
          }

          if (specificRanking['selectedUser'] === true) {
            selectedUserClass = 'active-my-rank'
            specificUserInfo = composeSpecificUserInfo(specificRanking, rankingDifference)
          }

          rankItem += `
            <div class="rank-list ${selectedUserClass}">
              <div class="ranking">
                <div class="all-bg-circle">
                  <div class="all-number">${specificRanking['sumPointsRank']}</div>
                </div>
              </div>
              <div class="school-stamp"><img src="./img/magicImg/badge_cat.png"></div>
              <div class="student-info">
                <div class="student-name">
                  <div class="name">${specificRanking['userName']}</div>
                </div>
                <div class="score">
                  <div class="list-title">積分：</div>
                  <div class="my-score">${specificRanking['sumPoints']}</div>
                </div>
              </div>
              <div class="rank-move">
                <div class="bg-line">
                  <div class="move-number">${rankingDifference}</div>
                </div>
              </div>
            </div>
          `
        }

        rankInfo = `
          <div class="content-person-info">
            <div class="container-info">  
              ${specificUserInfo}
              <div class="count-section">
                <div class="count-date">
                  <div class="myrank-title-date">本次結算時間</div>
                  <div class="myrank-count-date">${rankingInfo['rankingEndTime']}</div>
                </div>
                <div class="count-time">
                  <div class="myrank-title-time">距離結算還有</div>
                  <div class="myrank-count-time">08天07時41分</div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-rank-list">
            <div class="container-rank-list">
              <div class="row-rank-list">
                ${rankItem}        
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
            ${composeRankInfo(rankingInfo)}
          </div>
        `
      }

      let composeRankingDialogAttr = () => {
        return {
          customClass: `confirm_message_box modal-popup-rank-height`,
          width: '835px',
        }
      }

      let popupHtml, dialogAttr
      ajax('GET', `http://localhost:8080/chest/ranking/myRank/specificUser`)
        .then(
          jsonData => {
            let rankingInfo = jsonData.content
            let flag = rankingInfo['flag']
            switch (flag) {
              case 'NOT_LOGIN': {
                popupHtml = popupMyRanking(rankingInfo)
                dialogAttr = composeRankingDialogAttr()
                break
              }
              case 'QUALIFIED': {
                popupHtml = popupMyRanking(rankingInfo)
                dialogAttr = {
                  customClass: `confirm_message_box modal-popup-rank-height`,
                  width: '835px',
                  onOpenFn: () => {

                  }
                }
                break
              }
              default: {
                popupHtml = ''
              }
            }

            return ''
          }
        )
        .then(() => {
          confirmPopup.dialog(popupHtml, dialogAttr)
        })
    }
  })
