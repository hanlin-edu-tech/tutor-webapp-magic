define(['jquery', 'ajax', 'w3'], ($, ajax, w3) => {// eslint-disable-line
  $(window).resize(() => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      $('.slide-show-award-introduce .needChestLv').hide()
      $('.slide-show-award-introduce .awardNotice').hide()
    } else {
      $('.slide-show-award-introduce .needChestLv').show()
      $('.slide-show-award-introduce .awardNotice').show()
    }
  })

  ajax('GET', `/chest/award/conditions`)
    .then(jsonData => {
      let awards = jsonData.content

      for (let index in awards) {
        let award = awards[index]
        let awardContent = award.content
        let title = awardContent.title
        let quantity = parseInt(awardContent.quantity)
        let needChestLv = awardContent.needChestLv
        let notice = awardContent.notice
        let awardId = award.id
        let howMany
        let awardInfo

        if (quantity === 0) {
          howMany = '沒貨啦'
        } else if (quantity > 0) {
          howMany = '還有貨喔'
        }

        if (window.matchMedia('(max-width: 800px)').matches) {
          awardInfo = `
            <div class="slide-show">
              <img class="award-show" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${awardId}.png">
            </div>
            <div class="slide-show-award-introduce">
              <span class="award">${title}</span>
              <span class="quantity">庫存：${howMany}</span>
              <span class="needChestLv"></span>
              <span class="awardNotice"></span>
            </div>
          `
        } else {
          awardInfo = `
            <div class="slide-show">
              <img class="award-show" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${awardId}.png">
            </div>
            <div class="slide-show-award-introduce">
              <span class="award">${title}</span>
              <span class="quantity">庫存：${howMany}</span>
              <span class="needChestLv">所在寶箱：Lv${needChestLv}</span>
              <span class="awardNotice">${notice}</span>
            </div>
          `
        }

        $('#award-info')
          .append(awardInfo)
      }

      let awardShow = w3.slideshow('.award-show', 3000)
      let awardIntroduce = w3.slideshow('.slide-show-award-introduce', 3000)

      // 上一個
      $('.previous').on('click', () => {
        awardShow.next()
        awardIntroduce.next()
      })
      // 下一個
      $('.next').on('click', () => {
        awardShow.previous()
        awardIntroduce.previous()
      })
    })
})
