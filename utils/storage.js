class Storages {
  put(key, val, time) {
    wx.setStorageSync(key, val)
    var seconds = parseInt(time);
    if (seconds > 0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(key + 'dtime', timestamp + "")
    } else {
      wx.removeStorageSync(key + 'dtime')
    }
  }
  gets(key, def) {
    var deadtime = parseInt(wx.getStorageSync(key + 'dtime'))
    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
        if (def) {
          return def;
        } else {
          return;
        }
      }
    }
    var res = wx.getStorageSync(key);
    if (res) {
      return res;
    } else {
      return def;
    }
  }
}
export {
  Storages
}