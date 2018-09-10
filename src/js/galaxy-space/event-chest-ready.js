define(['jquery', 'ajax', 'eventChestGet', 'eventChestInspection'], ($, ajax, eventChestGet, eventChestInspection) => { // eslint-disable-line
  return (chest) => {
    let statusInfo = {
      status: 'READY'
    }
    ajax('POST', `/chest/ready/${chest.id}`, statusInfo)
      .then((jsonData) => {
        if (eventChestInspection(jsonData.message, jsonData.content)) {
          return
        }
        eventChestGet()
      })
  }
})
