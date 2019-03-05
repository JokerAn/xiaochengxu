class utils{
  constructor(){}

  showAlert(title, icon='none', time=2000, success = function () { }, fail = function () { }, complete) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: time,
      success: success,
      fail: fail,
      complete: complete
    })
  }
}
export {utils}