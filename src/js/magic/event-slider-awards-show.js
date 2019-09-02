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

    ajax('GET', `http://localhost:8080/chest/award/awardConditions`)
      .then(jsonData => {
        let awardConditions = jsonData.content
        let sectionTarget = isNovice ? $('#section_novice') : $('#section_middle_part')

        for (let index in awardConditions) {
          let awardCondition = awardConditions[index]
          let title = awardCondition.title
          let quantity = parseInt(awardCondition.quantity)
          let needChestLv = awardCondition.needChestLv
          let notice = awardCondition.notice
          let awardId = awardCondition.id
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

          sectionTarget.find('.gift_photo').append(awardImg)

          let rowGiftContentTarget = sectionTarget.find('.row.row_gift_content')
          rowGiftContentTarget.find('.title-row').append(awardTitle)
          rowGiftContentTarget.find('.award_scontnet').append(awardInLv)
          rowGiftContentTarget.find('.award_scontnet').append(awardFactory)
          rowGiftContentTarget.find('.notice').append(awardNotice)
        }

        let sec = 3000
        let awardPhotoShow = w3.slideshow('.gift_photo', sec)
        let awardTitleShow = w3.slideshow('.award_title', sec)
        let awardLevelShow = w3.slideshow('.award_level', sec)
        let awardStockShow = w3.slideshow('.award_stock', sec)
        let awardNoticeShow = w3.slideshow('.award_note', sec)

        // 上一個
        sectionTarget.find('.previous_btn img').on('click', () => {
          awardPhotoShow.next()
          awardTitleShow.next()
          awardLevelShow.next()
          awardStockShow.next()
          awardNoticeShow.next()
        })

        // 下一個
        sectionTarget.find('.next_btn img').on('click', () => {
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
