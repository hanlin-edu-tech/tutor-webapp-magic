define(['jquery', 'slider'], ($, slider) => {
    //   $('#sliderBar').slider()
    //   $('#sliderBar').slider({
    //     reversed: true
    //   })

    //   $('#sliderBar').on('slide', function (slideEvt) {
    //     $('#SliderVal').text(slideEvt.value)
    //     let melody = document.getElementById('audio_background_melody')
    //     let sliVal = slideEvt.value / 100
    //     melody.volume = sliVal
    //   })

  let melodyTarget = document.getElementById('audio_background_melody')
  if (melodyTarget.paused) {
    melodyTarget.play()
  } else {
    $('.speaker').removeClass('mute')
  }

  $('.speaker').click(function (e) {
    let className = this.className
    e.preventDefault()

    $(this).toggleClass('mute')

    if (className.match(/mute/g)) {
      melodyTarget.volume = 1
    } else {
      melodyTarget.volume = 0
    }
  })
})
