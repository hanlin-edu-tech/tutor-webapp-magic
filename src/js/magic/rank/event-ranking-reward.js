define(['jquery', 'ajax', 'confirmPopup'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let composeRewardInfo = rewardInfo => {
        return `
          <div class="now-rank-inside">
            <div class="now-rank-content">
              <div class="content">${rewardInfo['desc']}</div>
            </div>
            <div class="now-rank-gift-list">
              <div class="gift-list">
                <div class="gift-pic"><img src="./img/magicImg/diamond_box.png"></div>
                <div class="gift-name">
                  <div class="gift-title">寶石</div>
                  <div class="gift-sum">${rewardInfo['gems']}</div>
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
          </div>
        `
      }

      let composeRewardDialogAttr = (heightClass = '') => {
        return {
          customClass: `confirm_message_box ${heightClass}`,
          width: '700px'
        }
      }

      let popupHtml, dialogAttr
      ajax('GET', `/chest/ranking/reward/specificUser`)
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
                    ${composeRewardInfo(rewardInfo)}
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
                        <div class="content">
                          你還有很大的進步空間呢！再接再厲！
                        </div>
                      </div>
                      <div class="albi-cry">
                        <img src="./img/magicImg/albi-cry.png">
                      </div>
                    </div>
                  </div>
                `
                dialogAttr = composeRewardDialogAttr('confirm-popup-middle-height')
                break
              }
              case 'NOT_LOGIN': {
                popupHtml = `
                  <div id="popup-please-login">
                    <div class="please-login-title">請先登入方能查詢目前獎勵</div>
                    <div class="btn-please-login"><a href="/Users/login.html?redirect=/tutor/webapp-magic/">馬上登入</a></div>
                  </div>
                `
                dialogAttr = composeRewardDialogAttr()
                break
              }
            }

            confirmPopup.dialog(popupHtml, dialogAttr)
          }
        )
    }
  })
