define(['jquery', 'ajax', 'confirmPopup'], ($, ajax, confirmPopup) => { // eslint-disable-line
  let content =
    `
      <div style="position: relative; top:-40px; font-weight:bold;">
          <div>
              <span style="font-size:28px;">
                  一新活動開始啦一
              </span>
          </div>

          <div>
              <span style="font-size:25px;">
                  歡迎來到雲端魔法世界。現在登入就可以馬上獲得1個魔法藥水喔，快登入參加吧！
              </span>
          </div>
      </div>

      <div style="position: relative; top:100px; font-weight:bold;">
          <a href="">
              <span>
                  不用了，先看看活動頁面
              </span>
          </a>
      </div>
    `

  let dialog = {
    confirmBtnText: '馬上登入',
    cancelBtnText: '前往註冊',
    isShowCancelButton: true,
    confirmFn () {
      // window.location = '/Users/login.html'
    },
    cancelFn () {
      // window.location = '/Users/register.html'
    }
  }
  // confirmPopup.dialog(content, dialog)

  ajax('GET', `/ms-user-status/userStatus`)
    .then((data) => {
      let name = data.name
      let studentCard = data.studentCard

      console.log('--------- ' + data.id + ' ----------')
      $('.user-status .login').remove()
      $('.user-status .name').append(`${name}&nbsp;&nbsp;<span class="logout">登出</span>`)
      $('.user-status .student-card').append(`${studentCard}`)
    })

  $('.user-status .logout').on('click', () => {
    ajax('PUT', `/Users/521d946be4b0d765448570bd/!logout`)
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })

  $('.user-status .name').on('click', () => {
    ajax('PUT', `/Users/521d946be4b0d765448570bd/!logout`)
      .then(() => {
        window.location = 'https://' + window.location.hostname
      })
  })
  $('.user-status .student-card').on('click', () => {
    window.location.href = '/my/owned/Courses.html'
  })
  $('.user-status .login').on('click', () => {
    window.location.href = '/Users/login.html'
  })
})
