define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => { // eslint-disable-line
  // let popupHtml =
  //   `
  //     <div style="position: relative; top:-40px; font-weight:bold;">
  //         <div>
  //             <span style="font-size:28px;">
  //                 一新活動開始啦一
  //             </span>
  //         </div>

  //         <div>
  //             <span style="font-size:25px;">
  //                 歡迎來到雲端魔法世界。<br>現在登入就可以馬上獲得1個魔法藥水喔，快登入參加吧！
  //             </span>
  //         </div>
  //     </div>

  //     <div style="position: relative; top:90px; font-weight:bold;">
  //         <a href="">
  //             <span style="color:blue;">
  //                 不用了，先看看活動頁面
  //             </span>
  //         </a>
  //     </div>
  //   `

  // let dialog = {
  //   width: '60%',
  //   confirmButtonText: '馬上登入',
  //   cancelButtonText: '前往註冊',
  //   showCancelButton: true,
  //   confirmFn () {
  //     window.location = '/Users/login.html'
  //   },
  //   cancelFn () {
  //     window.location = '/Users/register.html'
  //   }
  // }
  // confirmPopup.dialog(popupHtml, dialog)

  $('#login_dialog').show()
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

  $('.col-12.col-logout .logout').on('click', () => {
    ajax('PUT', `/Users/521d946be4b0d765448570bd/!logout`)
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })

  $('.nothanks_btn').on('click', () => {
    $('#login_dialog').css('display', 'none')
  })

  $('.col-12.col-login .login').on('click', () => {
    window.location.href = '/Users/login.html'
  })
})
