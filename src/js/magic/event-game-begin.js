define([], () => {
  $('#section_novice').remove()
  $('#section_middle_part').removeAttr('style')

  window.onbeforeunload = null

  require(['eventTotalAssets'])
  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })
})