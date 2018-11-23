define(['jquery', 'ajax', 'w3'], ($, ajax, w3) => { // eslint-disable-line
  return isNovice => {
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
        let sectionTarget = isNovice ? $('#section_novice') : $('#section_middle_part')

        for (let index in awards) {
          let award = awards[index]
          let awardContent = award.content
          let title = awardContent.title
          let quantity = parseInt(awardContent.quantity)
          let needChestLv = awardContent.needChestLv
          let notice = awardContent.notice
          let awardId = award.id
          let howMany
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

          awardImg = `<img class="gift_photo" src="./img/award/${awardId}.png">`
          awardTitle = `<div class="award_title">${title}</div>`
          awardInLv = `<div class="award_level">Lv${needChestLv}</div>`
          awardFactory = `<div class="award_stock">${howMany}</div>`
          awardNotice = `<div class="award_note">${notice}</div>`

          sectionTarget.find('.row_gift_pic .col-6.col-sm-4.col-lg-6').append(awardImg)

          let rowGiftContentTarget = sectionTarget.find('.row.row_gift_content')
          rowGiftContentTarget.find('.col-12.title').append(awardTitle)
          rowGiftContentTarget.find('.col-6.award_scontnet').append(awardInLv)
          rowGiftContentTarget.find('.col-8.award_scontnet').append(awardFactory)
          rowGiftContentTarget.find('.col-12.notice').append(awardNotice)
        }

        let sec = 3000
        let awardPhotoShow = w3.slideshow('.gift_photo', sec)
        let awardTitleShow = w3.slideshow('.award_title', sec)
        let awardLevelShow = w3.slideshow('.award_level', sec)
        let awardStockShow = w3.slideshow('.award_stock', sec)
        let awardNoticeShow = w3.slideshow('.award_note', sec)

        // 上一個
        sectionTarget.find('.col-3.col-sm-4.col-lg-3.previous_btn img').on('click', () => {
          awardPhotoShow.next()
          awardTitleShow.next()
          awardLevelShow.next()
          awardStockShow.next()
          awardNoticeShow.next()
        })

        // 下一個
        sectionTarget.find('.col-3.col-sm-4.col-lg-3.next_btn img').on('click', () => {
          awardPhotoShow.previous()
          awardTitleShow.previous()
          awardLevelShow.previous()
          awardStockShow.previous()
          awardNoticeShow.previous()
        })

        //sectionTarget.find('.gift_list .gift_photo').width('115px')
      })
  }
})
