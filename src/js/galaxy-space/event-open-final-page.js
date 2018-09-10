define(['require', 'jquery', 'ajax', 'confirmPopup', 'eventChestInspection', 'eventTotalAssets'],
  (require, $, ajax, confirmPopup, eventChestInspection) => {
    let autoOpenedFunc = (jsonDataContent, openedChestsIndex, openedChestsCount) => {
      let chestId, level, gainCoins, gainGems, gainAwardId, gainAward, luckyBag
      let awardImg, awardTitle, awardContent, openTextBlock3, openTextBlock4
      let dialogAttr

      if (openedChestsIndex > openedChestsCount - 1) {
        let okContent = `
          <span style="font-size:24px;">
            哇！獲得了好多寶藏呢～記得在 7/23 之前完成資料回填，贈品將會在 7/26 開始陸續寄出。
            <br/>下學期我們將會在魔法世界展開冒險，記得回來唷！
            <br/>
            <br/>
          </span>
        `
        let chestIds = []
        for (let i = 0; i < jsonDataContent.length; i++) {
          chestIds.push(jsonDataContent[i].chestId)
        }
        confirmPopup.ok('', okContent, () => {
          ajax('POST', `/chest/award/notePopupAutoOpened`, chestIds)
            .then(() => {
              window.location.reload()
            })
        })
        return
      }

      /* 獲得禮物內容 */
      chestId = jsonDataContent[openedChestsIndex].chestId
      level = jsonDataContent[openedChestsIndex].level
      gainCoins = jsonDataContent[openedChestsIndex].coins
      gainGems = jsonDataContent[openedChestsIndex].gems
      gainAwardId = jsonDataContent[openedChestsIndex].gainAwardId
      gainAward = jsonDataContent[openedChestsIndex].gainAward
      luckyBag = jsonDataContent[openedChestsIndex].luckyBag

      awardImg = ''
      awardTitle = ''
      openTextBlock3 = ''
      openTextBlock4 = ''

      if (gainAwardId) {
        awardTitle = `<span class="gif-title">${gainAward}</span>`
        awardImg = `<img class="your-award-gif" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`
        openTextBlock3 = `
            <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span>${gainCoins}</span>
            <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span>${gainGems}</span>
          `
        openTextBlock4 = awardImg
      } else {
        openTextBlock4 = `
            <img class="coins-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
            <span class="coins-lg">${gainCoins}</span>
            <br/>
            <img class="gems-img-lg" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
            <span class="gems-lg">${gainGems}</span>
          `
      }

      awardContent = `
        <div class="open-confirm-grid-container">
          <div class="open-text-block1">
            <img class="open-gif-chest" src="https://d220xxmclrx033.cloudfront.net/event-space/img/chest/open/openChest${level}.gif">
          </div>
          <div class="open-text-block2">恭喜你獲得了
            <span class="gif-title">${awardTitle}</span>
          </div>
          <div class="open-text-block3">
            ${openTextBlock3}
          </div>
          <div class="open-text-block4">
            ${openTextBlock4}
          </div>
        </div>
      `

      if (gainAwardId && luckyBag === false) {
        dialogAttr = {
          confirmFn: autoOpenedFunc.bind(autoOpenedFunc, jsonDataContent, openedChestsIndex + 1, openedChestsCount),
          confirmBtnText: '確認',
          isShowCancelButton: false
        }
      } else if (luckyBag === true) {
        dialogAttr = {
          confirmFn () {
            ajax('POST', `/chest/award/luckyBag/${chestId}`, {
              awardId: gainAwardId,
              chestId: chestId
            })
              .then((jsonData) => {
                let jsonContent = jsonData.content
                let title, gainCoins, gainGems

                if (eventChestInspection(jsonData.message, jsonData.content)) {
                  return
                }

                gainCoins = jsonContent.coins
                gainGems = jsonContent.gems
                title = `
                  <div class="lucky-bag">
                    <span>福袋打開囉，得到 </span>
                    <img class="coins-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/coin.svg">
                    <span>${gainCoins}</span>
                    <img class="gems-img" src="https://d220xxmclrx033.cloudfront.net/event-space/img/gem.svg">
                    <span>${gainGems}</span>
                  </div>
                `
                let bagImage = `<img class="confirm-popup-lucky-bag" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${gainAwardId}.png">`

                confirmPopup.luckyBagImage(title, bagImage, () => {
                  autoOpenedFunc(jsonDataContent, openedChestsIndex + 1, openedChestsCount)
                })
              })
          },
          confirmBtnText: '打開福袋',
          isShowCancelButton: false
        }
      } else {
        dialogAttr = {
          confirmFn: autoOpenedFunc.bind(autoOpenedFunc, jsonDataContent, openedChestsIndex + 1, openedChestsCount),
          confirmBtnText: '確認',
          isShowCancelButton: false
        }
      }

      confirmPopup.dialog(awardContent, dialogAttr)
    }

    ajax('GET', `/chest/autoOpened`)
      .then(jsonData => {
        let openedChestsCount = jsonData.content.length
        let openedChestsIndex = 0
        if (openedChestsCount > 0) {
          let content = `
            <span style="font-size:24px;">
              經過一年的努力，我們終於在銀河中找到一片適合安定下來的土地，在這片土地上，
              <br/>有一些厲害的魔法師居住著，透過他們的魔法將封存的寶箱都打開啦!趕快來看看你獲得了哪些寶藏吧!
              <br/>
              <br/>
            </span>
          `
          let dialogAttr = {
            confirmFn: autoOpenedFunc.bind(autoOpenedFunc, jsonData.content, openedChestsIndex, openedChestsCount),
            confirmBtnText: '確認',
            isShowCancelButton: false,
            onOpenFn () {
              $('.swal2-content').append(
                `
                  <div class="shining-block">
                    <div class="shining-coins"></div>
                    <div class="shining-gems"></div>
                  </div>
                `
              )

              for (let index = 1; index < 31; index++) {
                $('.shining-block .shining-coins')
                  .append(`<img class="coins${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/coinGif.gif">`)
              }

              for (let index = 1; index < 21; index++) {
                $('.shining-block .shining-gems')
                  .append(`<img class="gems${index}" src="https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-space/img/gemGif.gif">`)
              }
            }
          }
          confirmPopup.dialog(content, dialogAttr)
        }
      })
  })
