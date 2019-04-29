import {
  HTTP
} from './http.js'

import {
  api,
  orcapi
} from './config.js'
class Model extends HTTP {
  // 获取百度token
  getbaidutoken(client_id, client_secret) {
    return this.request2({
      url: orcapi.gettoken + "client_id=" + client_id + "&client_secret=" + client_secret,
      header1: {},
      data: {}
    })
  }
  // 获取识别身份证
  getorcidcard(token, id_card_side, image) {
    return this.request2({
      url: orcapi.getidcard + token,
      header1: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: image,
        id_card_side: id_card_side,
        detect_direction: 'true'
      }
    })
  }

  // 获取银行卡
  getorcidcard(token, id_card_side, image) {
    return this.request2({
      url: orcapi.getidcard + token,
      header1: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: image,
        id_card_side: id_card_side,
        detect_direction: 'true'
      }
    })
  }

  getorcbankcard(token, image) {
    return this.request2({
      url: orcapi.getbankcard + token,
      header1: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        image: image,
      }
    })
  }
}

export {
  Model
}