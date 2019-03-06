// pages/login/login.js
import {utils} from '../../utils/utils.js';
var util=new utils();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPwd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userId = wx.getStorageSync('userId');
    console.log(userId);
    if (userId) {
      wx.reLaunch({
        url: '../mainPage/mainPage'
      });
      return
    }
  },
  userNameF(e){
    this.setData({
      userName: e.detail.value
    })
  },
  userPwdF(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  login(){
    if (this.data.userName === '' || this.data.userPwd===''){
      util.showAlert('请填写用户名和密码！');
      return
    }
    let data={
      name:this.data.userName,
      passWord: this.data.userPwd,
    };
    console.log(data);
    const db=wx.cloud.database();
    db.collection('userInfo').where(data).get().then(res=>{
      console.log(res);
      if(res.data.length==1){
        console.log('跳转页面..');
        wx.setStorage({
          key:'userName',
          data: res.data[0].name
          
        })
          wx.setStorage({
            key: 'userId',
            data: res.data[0]._id,

          })
        wx.reLaunch({
          url: '../mainPage/mainPage?id='+res.data[0]._id
        })
      }else{
        util.showAlert('用户名或者密码错误');
      }
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})