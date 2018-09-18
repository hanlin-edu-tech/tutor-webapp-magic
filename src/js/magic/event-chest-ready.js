define(['jquery', 'ajax', 'eventChestGet', 'eventChestInspection'], ($, ajax, eventChestGet, eventChestInspection) => { // eslint-disable-line
  return (chest, targets, isNovice = false) => {
    let statusInfo = {
      status: 'READY'
    }
    ajax('POST', `http://localhost:8080/chest/ready/${chest.id}`, statusInfo)
      .then(jsonData => {
        if (eventChestInspection(jsonData.message, jsonData.content)) {
          return
        }

        if (isNovice) {
          eventChestGet(targets, isNovice)
        } else {
          eventChestGet()
        }
      })
  }
})
