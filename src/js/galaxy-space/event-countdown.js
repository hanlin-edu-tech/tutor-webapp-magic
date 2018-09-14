define(['jquery', 'jqueryCountDown'], () => {// eslint-disable-line
  return (seconds, chest, targets, callback) => {
    targets.countdown.countDown({
      timeInSecond: seconds,
      displayTpl: '{hour}時 {minute}分 {second}秒',
      limit: 'hour',
      // 倒數計時完 callback
      callback: callback.bind(callback, chest, targets)
    })
  }
})
