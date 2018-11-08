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

  $('.speaker').click(function (e) {
    let className = this.className
    let melody = document.getElementById('audio_background_melody')
    e.preventDefault()

    $(this).toggleClass('mute')

    if (className.match(/mute/g)) {
      melody.volume = 1
    } else {
      melody.volume = 0
    }
  })
})
