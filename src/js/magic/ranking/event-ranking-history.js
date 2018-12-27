define(['ajax'], ajax => { // eslint-disable-line
  let eventRankingHistory = {}
  eventRankingHistory.retrieveIndividualRankingTransactions = async () => {
    let jsonData, individualRankingTransactions, transactionsList = ''
    try {
      jsonData = await ajax('GET', `/chest/ranking/history?rewardCategory=INDIVIDUAL`)
      individualRankingTransactions = jsonData.content
      for (let i = 0; i < individualRankingTransactions.length; i++) {
        let transaction = individualRankingTransactions[i]
        let memo = transaction['memo']
        let currencyQuantity = transaction['currencyQuantity']
        transactionsList += `
          <ul class="row-my-list">
            <li class="my-enter-time">${ memo['startTime'] }</li>
            <li class="my-rank">${ memo['sumPointsRank'] }</li>
            <li class="my-get-gift">寶石 ${ currencyQuantity['gems'] }</li>
          </ul>
        `
      }
    } catch (e) {

    }

    return transactionsList
  }

  eventRankingHistory.retrieveAcademyRankingTransactions = async () => {
    let jsonData, academyRankingTransactions, transactionsList = ''
    try {
      jsonData = await ajax('GET', `/chest/ranking/history?rewardCategory=ACADEMY`)
      academyRankingTransactions = jsonData.content
      for (let i = 0; i < academyRankingTransactions.length; i++) {
        let transaction = academyRankingTransactions[i]
        let memo = transaction['memo']
        let currencyQuantity = transaction['currencyQuantity']
        transactionsList += `
          <ul class="row-school-list">
            <li class="school-enter-time">${ memo['startTime'] }</li>
            <li class="school-rank">${ memo['academySumRank'] }</li>
            <li class="school-in-rank">${ memo['academyRank'] }</li>
            <li class="school-get-gift">e幣 ${ currencyQuantity['coins'] }、寶石 ${ currencyQuantity['gems'] }</li>
          </ul>
        `
      }
    } catch (e) {

    }

    return transactionsList
  }

  eventRankingHistory.retrieveRankingRewardHistory = async () => {
    let individualRankingTransactions = await eventRankingHistory.retrieveIndividualRankingTransactions()
    let academyRankingTransactions = await eventRankingHistory.retrieveAcademyRankingTransactions()

    return `
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
                  ${ individualRankingTransactions }
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
                ${ academyRankingTransactions }
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  return eventRankingHistory
})

