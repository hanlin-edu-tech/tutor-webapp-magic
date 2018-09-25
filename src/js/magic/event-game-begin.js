define([], () => {
  $('#section_novice').remove()
  $('#section_middle_part').removeAttr('style')

  window.onbeforeunload = null

  require(['eventTotalAssets'])

  require(['eventSlideShow'], eventSlideShow => {
    let isNovice = false
    eventSlideShow(isNovice)
  })

  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })

  require(['eventAwardGet'], eventAwardGet => {
    eventAwardGet()
  })
})