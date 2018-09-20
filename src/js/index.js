$(document).ready(function() {
    $(".nothanks_btn").click(function() {
      $("#login_dialog").css("display","none");
    });

  $('.col-3.PINK .count_time').countDown({
    timeInSecond: 600,
    displayTpl: '{hour}時 {minute}分 {second}秒',
    limit: 'hour',
    // 倒數計時完 callback
    callback: () => {

    }
  })
});