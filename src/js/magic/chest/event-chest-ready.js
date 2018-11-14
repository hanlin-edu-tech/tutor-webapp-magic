define(['jquery', 'ajax', 'eventChestGet', 'eventChestCheck'], ($, ajax, eventChestGet, eventChestCheck) => { // eslint-disable-line
  return (chest, noviceObj = {}) => {
    let statusInfo = {
      status: 'READY'
    }
    ajax('POST', `/chest/ready/${chest.id}`, statusInfo)
      .then(jsonData => {
        if (eventChestCheck(jsonData.message, jsonData.content)) {
          return
        }

        if (noviceObj.isNovice) {
          eventChestGet(noviceObj)
        } else {
          eventChestGet()
        }
      })
  }
})
