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
  };
  //验证用户密码
  regPwd(pwd){
    let regs = /^[a-zA-Z0-9]{6}$/g;
    return regs.test(pwd);
  };
  //链接数据库
  linkDataBase(dataBaseName){
    return wx.cloud.database().collection(dataBaseName)
  }
}
export {utils}