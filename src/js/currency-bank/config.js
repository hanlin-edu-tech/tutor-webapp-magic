define(() => {// eslint-disable-line
  require.config({
    shim: {
      bootstrap: ['jquery'],
      bootstrapTable: ['jquery', 'bootstrap'],
      bootstrapTableTw: ['jquery', 'bootstrap', 'bootstrapTable']
    },

    paths: {
      jquery: ['../lib/jquery-3.3.1.min'],
      bootstrap: ['../lib/bootstrap.bundle.min'],
      bootstrapTable: ['../lib/bootstrap-table.min'],
      bootstrapTableTw: ['../lib/bootstrap-table-zh-TW.min'],
      ajax: ['../module-utils/ajax'],
      moment: ['../lib/moment.min'],
      momentLocales: ['../lib/moment-with-locales.min']
    }
  })
})
