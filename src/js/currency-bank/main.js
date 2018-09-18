require(['config'], () => {
  require(['jquery', 'bootstrap', 'bootstrapTable', 'bootstrapTableTw'], $ => {
    require(['ajax'], (ajax) => {
      ajax('GET', `http://localhost:9090/currencyBank/transaction`)
        .then((jsonData) => {
          let transactions = jsonData.content
          $('#table').bootstrapTable({
            data: transactions,
            striped: true,
            pageSize: 15,
            pageList: [15],
            pagination: true
          })
        })
    })
  })
})
