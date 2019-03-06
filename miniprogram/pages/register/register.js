// pages/register/register.js
import {utils} from '../../utils/utils.js'
var util = new utils();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPwd: "",
    userPwd2: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  userNameF(e) {
    console.log(e);
    this.setData({
      userName: e.detail.value
    })
  },

  userPwdF(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  userPwd2F(e) {
    this.setData({
      userPwd2: e.detail.value
    })
  },
  addUserInfo() {
    if (this.data.userPwd !== this.data.userPwd2) {
      util.showAlert('两次密码不一致');
      return
    }
    if (util.regPwd(this.data.userPwd)) {

    } else {
      console.log(regs.test(this.data.userPwd));
      util.showAlert('密码格式或者位数不正确！');
      return
    }

    const db = wx.cloud.database();
    db.collection('userInfo').where({
        name: this.data.userName,
      })
      .get().then(res => {
        if(res.data.length==0){
          db.collection('userInfo').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              name: this.data.userName,
              registerTime: new Date() - 0,
              passWord: this.data.userPwd
            },
            success(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res);
              util.showAlert('注册成功');
              wx.setStorage({
                key: 'userId',
                data: res._id,
              });
              let a = wx.getStorageSync('userId')
              console.log(a);
              wx.redirectTo({
                url: '../login/login',
              })
            }
          })
        }else{
          util.showAlert('用户名重复');
        }
       
      })

  }
})