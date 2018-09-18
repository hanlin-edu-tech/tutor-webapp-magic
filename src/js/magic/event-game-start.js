define([], () => {
  require(['eventTotalAssets'])
  require(['eventChestGet'], eventChestGet => {
    eventChestGet()
  })
})