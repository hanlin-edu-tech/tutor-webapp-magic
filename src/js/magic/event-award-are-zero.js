define(['jquery', 'confirmPopup'], ($, confirmPopup) => {// eslint-disable-line
  return (message, multiResultInfo) => {
    let resultBlocks = ''
    let totalCoins = 0
    let totalGems = 0
    let finalCoins, finalGems
    for (let i = 0; i < multiResultInfo.length; i++) {
      let resultInfo = multiResultInfo[i]
      resultBlocks += `
        <div>
          Lv ${resultInfo.chestLevel} 藥水獲得
          <img class="coins-img" src="./img/magicImg/coin.svg">
          <span>${resultInfo.coins}</span>
          <img class="gems-img" src="./img/magicImg/gem.svg">
          <span>${resultInfo.gems}</span>
        </div>
      `
      totalCoins += resultInfo.coins
      totalGems += resultInfo.gems
      finalCoins = resultInfo.finalCoins
      finalGems = resultInfo.finalGems
    }

    let isAwardsAreZero = false
    if (message === 'All award are zero') {
      let popupHtml = `
          <div class="awards-are-zero-grid-container">
            ${resultBlocks}
            <div class="result-summary-block">
                總計 
                <img class="coins-img" src="./img/magicImg/coin.svg"> ${totalCoins} 
                <img class="gems-img" src="./img/magicImg/gem.svg"> ${totalGems}
                <br/>
                請至雲端銀行確認，您的資產未來活動中仍可繼續使用
            </div>
          </div>
        `

      confirmPopup.awardIsZeroDialog('寶藏已被隊員們探索完畢，請靜待下次開放探索時間<br>總部已將您的藥水結算', popupHtml, () => {
        require(['eventCountUp'], eventCountUp => {
          eventCountUp('coins', parseInt($('#coins').text()), finalCoins)
          eventCountUp('gems', parseInt($('#gems').text()), finalGems)
        })
        $('.platform img:not(img[class$=position]), .platform div').remove()
      })

      isAwardsAreZero = true
    }

    return isAwardsAreZero
  }
})
