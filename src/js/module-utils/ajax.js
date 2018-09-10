define(['jquery'], $ => {// eslint-disable-line
  return function (type, url, data) {
    if (type !== 'GET') {
      data = JSON.stringify(data)
    }

    return $.ajax({
      type: type,
      cache: false,
      crossDomain: true,
      url: url,
      data: data,
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json'
    })
  }
})
