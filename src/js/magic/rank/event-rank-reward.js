define(['jquery', 'ajax', 'confirmPopup'],
  ($, ajax, confirmPopup) => { // eslint-disable-line
    return () => {
      let popupRewardInfo = rewardInfo => {
        return `
          <div class="now-rank-inside" style="display:none">
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
        }
      }

      let popupHtml, dialogAttr
      ajax('GET', `http://localhost:8080/chest/ranking/reward/specificUser`)
        .then(
          jsonData => {
            let rankingInfo = jsonData.content
            let flag = rankingInfo['flag']
            switch (flag) {
              case 'QUALIFIED': {
                popupHtml = popupRewardInfo(rankingInfo)
                dialogAttr = composeRewardDialogAttr()
                break
              }
              case 'UNQUALIFIED': {
                popupHtml = `
                  <div class="now-rank-outside">
                    <div class="now-rank-content">
                      <div class="content">你還有很大的進步空間呢！再接再厲！</div>
                    </div>
                    <div class="albi-cry"><img src="./img/magicImg/albi-cry.png"></div>
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
