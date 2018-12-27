define(['jquery', 'ajax', 'confirmPopup', 'jqueryCountDown'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let composeSpecificUserInfo =
        ({
           academyBadgeImg = '',
           userName = '',
           sumPointsRank = '',
           sumPoints = 0,
           rankingDifference = '',
         }) => {
          return `
            <div class="student-info-login">
              <div class="section-student-pic">
                <div class="student-img">
                  ${academyBadgeImg}
                </div>
                <div class="student-name">${userName}</div>
              </div>
              <div class="section-student-info">
                <div class="row-my-rank">
                  <div class="my-info-list">我的名次</div>
                  <div class="my-rank">${sumPointsRank}</div>
                </div>
                <div class="row-my-score">
                  <div class="my-info-list">我的積分</div>
                  <div class="my-score">${sumPoints}</div>
                </div>
                <div class="row-my-score-move">
                <div class="my-info-list">名次變化</div>
                <div class="my-score-move">${rankingDifference}</div>
              </div>
              </div>
            </div>
          `
        }

      let composeMyRankingInfo = (rankingInfo, flag) => {
        let specificRankingsRange = rankingInfo['specificRankingsRange']
        let myRankingInfo, perRanking

        let specificUserInfo
        if (flag === 'NOT_LOGIN') {
          specificUserInfo = `
            <div class="student-info-nologin">
              <div class="nologin-title">馬上登入<br>查看排行</div>
            </div>
          `
        } else if (flag === 'UNQUALIFIED') {
          specificUserInfo = `
            <div id="popup-outside-rank">
              <div class="title-now-score">
                <div class="now-score">你目前的積分為</div>
                <div class="my-score">${rankingInfo['sumPoints']}</div>
              </div>
              <div class="title-reason">不符合入榜資格，可能原因如下：</div>
              <div class="two-reasons">
                1. 還不是正式會員喔！<br/>
                2. 這兩週是不是沒有調配 或 升級過任何一個藥水呢！<br/>
                3. 這兩週還尚未參與任一測驗喔！
              </div>
            </div>
          `
        }

        perRanking = specificRankingsRange.length > 0 ? '' : '<p>積分排名統計中</p>'
        for (let i = 0; i < specificRankingsRange.length; i++) {
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
            let academyBadgeImg = ''
            selectedUserClass = 'active-my-rank'
            if (specificRanking['academyBadge']) {
              academyBadgeImg = `<img src="./img/magicImg/badge_${specificRanking['academyBadge']}.png">`
            }
            specificUserInfo = composeSpecificUserInfo({
              academyBadgeImg: academyBadgeImg,
              userName: specificRanking['userName'],
              sumPointsRank: specificRanking['sumPointsRank'],
              sumPoints: specificRanking['sumPoints'],
              rankingDifference: rankingDifference
            })
          }

          perRanking += `
            <div class="rank-list ${selectedUserClass}">
              <div class="ranking">
                <div class="all-bg-circle">
                  <div class="all-number">${specificRanking['sumPointsRank']}</div>
                </div>
              </div>
              <div class="school-stamp"><img src="./img/magicImg/badge_${specificRanking['academyBadge']}.png"></div>
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

        myRankingInfo = `
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
                  <div class="myrank-count-time"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-rank-list">
            <div class="container-rank-list">
              <div class="row-rank-list">
                ${perRanking}        
              </div>
            </div>
          </div>
        `

        return myRankingInfo
      }

      let popupMyRanking = (rankingInfo, flag) => {
        return `
          <div id="popup-grid-my-rank">
            <div class="content-title">
              <div class="title">我的排行</div>
            </div>
            ${composeMyRankingInfo(rankingInfo, flag)}
          </div>
        `
      }

      let composeMyRankingDialogAttr = () => {
        return {
          customClass: `confirm_message_box modal-popup-rank-height`,
          width: '850px',
          showCancelButton: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '返回',
          cancelFn: () => {
            /* 排行榜 */
            require(['eventRankingPopup'], eventRankingPopup => {
              eventRankingPopup()
            })
          }
        }
      }

      let popupHtml, dialogAttr
      ajax('GET', `/chest/ranking/my`)
        .then(
          jsonData => {
            let rankingInfo = jsonData.content
            let flag = rankingInfo['flag']
            popupHtml = popupMyRanking(rankingInfo, flag)
            dialogAttr = composeMyRankingDialogAttr()
            dialogAttr.onOpenFn = () => {
              let rankingCountDownTarget = $('#popup-grid-my-rank .myrank-count-time')
              if (rankingCountDownTarget) {
                rankingCountDownTarget.countDown({
                  timeInSecond: rankingInfo['remainingSeconds'],
                  displayTpl: '{hour}時 {minute}分 {second}秒',
                  limit: 'hour'
                })
              }
            }

            if (flag === 'UNQUALIFIED') {
              dialogAttr.confirmButtonText = '升級課程'
              dialogAttr.cancelButtonText = '前往活動頁'
              dialogAttr.confirmFn = () => {
                window.location = `https://www.ehanlin.com.tw/courses_map.html`
              }
              dialogAttr.cancelFn = () => {
                window.location = `https://www.ehanlin.com.tw/app/magic`
              }
            }

            confirmPopup.dialog(popupHtml, dialogAttr)
            return rankingInfo
          }
        )
    }
  })
