import {
  Model
} from '../../api/model.js'
import {
  api
} from '../../api/config.js'
import {
  Storages
} from '../../utils/storage.js'
const storages = new Storages()
const Models = new Model()

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "address": "",
    "bankCardName": "",
    "bankCardNo": "",
    "contractDate": "",
    "contractExpire": "",
    "contractName": "",
    "contractNo": "",
    "contractPeriodType": "",
    "culture": '',
    "dateBirth": "",
    "idCardAddr": "",
    "idCardBackImg": "",
    "idCardFrontImg": "",
    "idCardNo": "",
    "issuingAuthority": "",
    "job": "",
    "mobile": "",
    "name": "",
    "nation": "",
    "personnelType": "",
    "politicsType": "",
    "projId": '',
    "projQualifications": [],
    "salary": "",
    "sex": "",
    "validityEnd": "",
    "validityStart": "",
    "verifyFace": "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettokenbdtoken_gq()
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  // 上传图片
  uploadfile: function (e) {
    var type = e.currentTarget.dataset.id
    this.getChooseImage(type)
  },
  getChooseImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var card = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64")
        if (type == 1) {
          that.gerorcidcard('front', card)
        } else if (type == 2) {
          that.gerorcidcard('back', card)
        } else if (type == 4) {
          that.getorcbankcard(card)
        } else {
        }
      }
    })
  },
  // 百度鉴权本地存储判断是否过期
  gettokenbdtoken_gq: function () {
    var that = this;
    let token = storages.gets('bdtoken', false)
    if (token) {
      that.setData({
        bdtoken: token
      })
    } else {
      this.gettokenbdtoken()
    }
  },
  // 百度鉴权
  gettokenbdtoken: function () {
    var that = this;
    const getbaidutoken = Models.getbaidutoken(app.globalData.client_id, app.globalData.client_secret)
    getbaidutoken.then(res => {
      storages.put('bdtoken', res.access_token, res.expires_in)
      that.setData({
        bdtoken: res.access_token
      })
    })
  },
  // 获取身份证信息
  gerorcidcard: function (id_card_side, image) {
    var that = this;
    wx.showLoading({
      title: '识别中',
    })
    let uid = wx.getStorageSync('userinfo').userId
    const getorcidcard = Models.getorcidcard(that.data.bdtoken, id_card_side, image)
    getorcidcard.then(res => {
      wx.hideLoading()
      if (res.direction != -1) {
        if (id_card_side == 'front') {
          that.setData({
            name: res.words_result['姓名'].words,
            idCardNo: res.words_result['公民身份号码'].words,
            idCardAddr: res.words_result['住址'].words,
          })
        } else {
          that.setData({
            validityStart: res.words_result['签发日期'].words,
            validityEnd: res.words_result['失效日期'].words
          })
        }

      }
    })
  },
  // 获取银行卡信息
  getorcbankcard: function (image) {
    var that = this;
    wx.showLoading({
      title: '识别中',
    })
    let uid = wx.getStorageSync('userinfo').userId
    const getorcbankcard = Models.getorcbankcard(that.data.bdtoken, image)
    getorcbankcard.then(res => {
      wx.hideLoading()
      if (res.direction != -1) {
        that.setData({
          bankCardNo: res.result.bank_card_number,
          bankCardName: res.result.bank_name,
        })
      }
    })
  }
})