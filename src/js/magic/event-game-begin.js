define([], () => {
  $('#section_novice').remove()
  $('#section_middle_part').removeAttr('style')
  require(['eventTotalAssets'])
  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })
})