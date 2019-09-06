define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => { // eslint-disable-line
  $('#section_titlelist .col-12.col-login').show() // 登入按鈕
  $('#section_titlelist .col-12.col-logout').css('display', 'none') // 登出按鈕
  $('#section_titlelist .col-12.col-bank').css('display', 'none') // 雲端銀行按鈕

  ajax('GET', `/ms-user-status/userStatus`)
    .then((data) => {
      let name = data.name

      $('#login_dialog').css('display', 'none')
      $('#section_titlelist .col-12.col-login').css('display', 'none') // 登入按鈕
      $('#section_titlelist .col-12.col-logout').show() // 登出按鈕
      $('#section_titlelist .col-12.col-bank').show() // 雲端銀行按鈕

      if (data) {
        console.log('--------- ' + data.id + ' ----------')
        $('.user-status .login').remove()
        $('.col-12.col-name .user_name').append(name)
      }
    })
    .catch(() => {
      $('#login_dialog').show()
    })

  $('.col-12.col-logout .logout').on('click', () => {
    ajax('PUT', `/user/Users/521d946be4b0d765448570bd/!logout`)
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })

  $('.nothanks_btn').on('click', () => {
    $('#login_dialog').css('display', 'none')
  })

  $('.col-12.col-login .login').on('click', () => {
    window.location.href = '/user/Users/login.html'
  })
})
