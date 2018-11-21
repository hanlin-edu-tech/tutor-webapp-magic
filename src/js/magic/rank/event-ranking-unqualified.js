define(() => { // eslint-disable-line
  return {
    retrievePopupHtml: (sumPoints) => {
      return `
        <div id="popup-outside-rank">
          <div class="title-now-score">
            <div class="now-score">你目前的積分為</div>
            <div class="my-score">${sumPoints}</div>
          </div>
          <div class="title-reason">不符合入榜資格，可能原因如下：</div>
          <div class="two-reasons">
            1. 還不是正式會員喔！<br/>
            2. 這兩週是不是沒有調配或<br/>
              升級過任何一個藥水呢！<br/>
            3. 這兩週還尚未參與任一測驗喔！
          </div>
        </div>
      `
    },

    composeDialogAttr: () => {
      return {
        confirmButtonText: '升級課程',
        cancelButtonText: '前往活動頁',
        confirmFn: () => {
          window.location = `https://www.ehanlin.com.tw/courses_map.html`
        },
        cancelFn: () => {
          window.location = `https://www.ehanlin.com.tw/app/magic`
        }
      }
    }
  }
})
