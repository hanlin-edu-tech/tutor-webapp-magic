define(['jquery', 'ajax', 'w3'], ($, ajax, w3) => { // eslint-disable-line
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
        let awardImg
        let awardTitle
        let awardInLv
        let awardFactory
        let awardNotice

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
          awardImg = `
              <img class="gift_photo" src="https://d220xxmclrx033.cloudfront.net/event-space/img/award/${awardId}.png">
          `
          awardTitle = `
              <div class="award_title">${title}</div>
          `
          awardInLv = `
              <div class="award_level">Lv${needChestLv}</div>
          `
          awardFactory = `
              <div class="award_stock">${howMany}</div>
          `
          awardNotice = `
              <div class="award_note">${notice}</div>
          `
        }

        $('#section_middle_part .col-6.col-sm-4.col-lg-6')
          .append(awardImg)

        $('#section_middle_part .row.row_gift_content .col-12.title')
          .append(awardTitle)

        $('#section_middle_part .row.row_gift_content .col-5.award_scontnet')
          .append(awardInLv)

        $('#section_middle_part .row.row_gift_content .col-7.award_scontnet')
          .append(awardFactory)

        $('#section_middle_part .row.row_gift_content .col-12.notice')
          .append(awardNotice)
      }

      let sec = 3000
      let awardPhotoShow = w3.slideshow('.gift_photo', sec)
      let awardTitleShow = w3.slideshow('.award_title', sec)
      let awardLevelShow = w3.slideshow('.award_level', sec)
      let awardStockShow = w3.slideshow('.award_stock', sec)
      let awardNoticeShow = w3.slideshow('.award_note', sec)

      // 上一個
      $('#section_middle_part .previous_btn img').on('click', () => {
        awardPhotoShow.next()
        awardTitleShow.next()
        awardLevelShow.next()
        awardStockShow.next()
        awardNoticeShow.next()
      })
      // 下一個
      $('#section_middle_part .next_btn img').on('click', () => {
        awardPhotoShow.previous()
        awardTitleShow.previous()
        awardLevelShow.previous()
        awardStockShow.previous()
        awardNoticeShow.previous()
      })
    })
})
