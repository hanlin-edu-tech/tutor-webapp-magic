define(['countUp'], CountUp => {// eslint-disable-line
  return function (id, start, end) {
    let options = {
      useEasing: true,
      useGrouping: true,
      separator: ''
    }

    let decimal = 0
    let transitionDuration = 5
    let transition = new CountUp(
      id,
      start,
      end,
      decimal,
      transitionDuration,
      options
    )

    transition.start()
  }
})
