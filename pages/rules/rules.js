// pages/rules/rules.js
var http = require("../../utils/http.js");
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getContent()
  },
  getContent() {
    wx.showLoading({
      title: '加载中'
    });
    var that = this
    var params = {
      url: "/p/integral/rule",
      method: "GET",
      callBack: res => {
        if (res.status == 200) {
          that.setData({
            detailInfo: res.data ? util.formatHtml(res.data.rexplain) : ''
          });
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data && res.data.msg ? res.data.msg : '服务器连接失败，请稍后再试！',
            icon: 'none',
            duration: 3000
          })
        }
      }
    };
    http.request(params);
  }
})