define(() => {
  return {
    /* 決定彈跳視窗每頁呈現之禮物數量 */
    determineAwardCountDisplay: () => {
      let awardsCountLimit = 0
      if (window.matchMedia('(max-width: 500px)').matches) {
        awardsCountLimit = 1
      } else if (window.matchMedia('(max-width: 950px)').matches) {
        awardsCountLimit = 3
      } else {
        awardsCountLimit = 5
      }
      return awardsCountLimit
    }
  }
})