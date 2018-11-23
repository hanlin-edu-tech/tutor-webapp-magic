define(['jquery', 'ajax', 'confirmPopup'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let composeRewardInfo = rewardInfo => {
        let gems = rewardInfo['gems']
        let coins = rewardInfo['coins']

        let individualReward = ''
        if(gems !== 0 || coins !== 0) {
          individualReward = `
            <div class="now-rank-gift-list">
              <div class="gift-list">
                <div class="gift-pic"><img src="./img/magicImg/diamond_box.png"></div>
                <div class="gift-name">
                  <div class="gift-title">寶石</div>
                  <div class="gift-sum">${ rewardInfo['gems'] }</div>
                </div>
              </div>
            </div>
            <div class="now-rank-note">
              <div class="rank-note">
                <div class="note">
                  請注意：目前顯示獎勵在結算之前都會因你的排名<br/>
                  隨時變動，不代表最終結算獎勵
                </div>
              </div>
            </div>
          `
        } else {
          individualReward = `
            <div class="albi-cry">
              <img src="./img/magicImg/albi-cry.png">
            </div>
          `
        }

        return `
          <div class="now-rank-inside">
            <div class="now-rank-content">
              <div class="content">${ rewardInfo['desc'] }</div>
            </div>
            ${individualReward}
          </div>
        `
      }

      let composeRewardDialogAttr = (heightClass = '') => {
        return {
          customClass: `confirm_message_box ${ heightClass }`,
          width: '700px',
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
      ajax('GET', `/chest/rank/reward/specificUser`)
        .then(
          jsonData => {
            let rewardInfo = jsonData.content
            let flag = rewardInfo['flag']
            switch (flag) {
              case 'QUALIFIED': {
                popupHtml = `
                  <div id="popup-now-rank">
                    <div class="now-rank-title">
                      <div class="title">目前獎勵</div>
                    </div>
                    ${ composeRewardInfo(rewardInfo) }
                  </div>
                `
                dialogAttr = composeRewardDialogAttr('modal-popup-rank-reward-height')
                break
              }
              case 'UNQUALIFIED': {
                popupHtml = `
                  <div id="popup-now-rank">
                    <div class="now-rank-title">
                      <div class="title">目前獎勵</div>
                    </div>
                    <div class="now-rank-outside">
                      <div class="now-rank-content">
                        <p class="content">
                          要先取得排名資格～ 才能查看目前獎勵喔！
                        </p>
                      </div>
                      <div class="albi-cry">
                        <img src="./img/magicImg/albi-cry.png">
                      </div>
                    </div>
                  </div>
                `
                dialogAttr = composeRewardDialogAttr('modal-popup-rank-reward-height')
                break
              }
              case 'NOT_LOGIN': {
                popupHtml = `
                  <div id="popup-please-login">
                    <div class="please-login-title">請先登入方能查詢目前獎勵</div>
                  </div>
                `
                dialogAttr = {
                  customClass: 'orange_message_box confirm-popup-mini-height',
                  width: '37%',
                  background: '#DE792F',
                  confirmButtonText: '登入',
                  showCancelButton: false
                }
                break
              }
            }

            confirmPopup.dialog(popupHtml, dialogAttr)
          }
        )
    }
  })
