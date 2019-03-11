// pages/changePwd/changePwd.js
import {utils} from '../../utils/utils.js';
var util=new utils;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    userPwdOld:'',
    userPwdNew:'',
    userPwdNew2:''
  },
  userPhone: function (e) {
    let _this = this;
    this.setData({
      userPhoneNumber: e.detail.value
    })
  },
  userCode: function (e) {
    let _this = this;
    this.setData({
      userPhpneCode: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      userId:options.id
    });
  },
  userPwdOldF(e){
    this.setData({
      userPwdOld: e.detail.value
    });
  },
  userPwdNewF(e) {
    console.log(e.detail);
    this.setData({
      userPwdNew: e.detail.value
    });
    console.log(this.data.userPwdNew);
  },
  userPwdNew2F(e) {
    this.setData({
      userPwdNew2: e.detail.value
    });
    

  },
  chengePwdOk(){
    console.log(this.data);
    if (this.data.userPwdOld == '' || this.data.userPwdNew == '' || this.data.userPwdNew==''){
      util.showAlert('请将信息填写完毕');
      return
    }
    if (this.data.userPwdNew !== this.data.userPwdNew2) {
      util.showAlert('两次输入的密码不一致！');
      return
    }
    if (util.regPwd(this.data.userPwdOld)){
      
    }else{
      util.showAlert('旧密码不正确');
      return
    }
    if (util.regPwd(this.data.userPwdNew2)) {

    } else {
      util.showAlert('新密码格式不正确！');
      return
    }
    console.log({
      _id: this.data.userId,
      passWord: this.data.userPwdOld
    });
    //张三_id：XH4fHFsqTi00tooC
    util.linkDataBase('userInfo').where({
      _id: this.data.userId,
      passWord: this.data.userPwdOld
    }).get().then(res=>{
      console.log(res);
      if(res.data.length==1){
        util.linkDataBase('userInfo').doc(res.data[0]._id).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            passWord: this.data.userPwdNew
          },
          success(res) {
            console.log(res.data);
            util.showAlert('更改成功！');
            wx.navigateTo({
              url: '../mainPage/mainPage',
            })
          }
        })
      }else{
        util.showAlert('旧密码不正确！');
        
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