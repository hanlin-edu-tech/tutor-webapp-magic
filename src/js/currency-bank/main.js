require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax'], ajax => {
      ajax('GET', `/currencyBank/transaction`)
        .then((jsonData) => {
          let transactions = jsonData.content
          $('#transactions').bootstrapTable({
            data: transactions,
            //striped: true,
            pageSize: 15,
            pageList: [15],
            pagination: true,
            rowStyle: row => {
              if (row.actionDesc.indexOf('增加') >= 0) {
                return {
                  classes: 'row-potion'
                }
              }

              return {}
            }
          })
        })
    })
  })
})
