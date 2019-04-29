import {
  api
} from 'config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
// # 解构
class HTTP {
  request({
    url,
    data = {},
    header1 = {},
    method = 'POST'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, header1)
    })
  }
  request2({
    url,
    data = {},
    header1 = {},
    method = 'POST'
  }) {
    return new Promise((resolve, reject) => {
      this._request2(url, resolve, reject, data, method, header1)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'POST', header1) {
    // console.log(url,data)
    var headers = new Array()
    headers = header1 || {}
    wx.request({
      url: api.url + url,
      method: method,
      header: headers,
      data: data,
      success: (res) => {
        const code = res.statusCode.toString()
        resolve(res.data)
        // if (code.startsWith('0')) {
        //   resolve(res.data)
        // } else {
        //   reject()
        //   const error_code = res
        //   this._show_error(error_code)
        // }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })

  }
  _request2(url, resolve, reject, data = {}, method = 'POST', header1) {
    // console.log(url,data)
    var headers = new Array()
    headers = header1 || {}
    wx.request({
      url: url,
      method: method,
      header: headers,
      data: data,
      success: (res) => {
        const code = res.statusCode.toString()
        resolve(res.data)
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })

  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}