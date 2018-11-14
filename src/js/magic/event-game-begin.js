define([], () => {
  $('#section_novice').remove()
  $('#section_middle_part').removeAttr('style')

  window.onbeforeunload = null

  require(['eventTotalAssets'])

  require(['eventSlideAwardsShow'], eventSlideAwardsShow => {
    let isNovice = false
    eventSlideAwardsShow(isNovice)
  })

  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })

  require(['eventAwardGet'], eventAwardGet => {
    eventAwardGet()
  })
})
