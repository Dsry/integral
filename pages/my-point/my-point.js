// pages/my-point/my-point.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: null,
    list: [],
    pages: null,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var that = this;
    var getCount = new Promise(function(reslove, reject) {
      var params = {
        url: "/p/integral/account",
        method: "GET",
        data: {

        },
        callBack: res => {
          if (res.status == 200) {
            reslove()
            that.setData({
              total: res.data
            });
          } else {
            reject()
          }
        }
      };
      http.request(params);
    })
    var getList = new Promise(function(reslove, reject) {
      var params = {
        url: "/p/integral/pageIntegral",
        method: "GET",
        data: {},
        callBack: res => {
          if (res.status == 200) {
            if (res.data && res.data.list && res.data.list.length > 0) {
              res.data.list.forEach(item => {
                switch (item.integralType) {
                  case 1:
                    item.typeName = '扫码'
                    break
                  case 2:
                    item.typeName = '商品兑换'
                    break
                  case 3:
                    item.typeName = '活动获得'
                    break
                  case 4:
                    item.typeName = '企业操作'
                    break
                  case 5:
                    item.typeName = '完善个人信息'
                    break
                  case 10:
                    item.typeName = '积分过期'
                    break
                  default:
                    item.typeName = ''
                }
              })
            }
            that.setData({
              list: res.data.list,
              pages: res.data.pages
            })
            reslove()
          } else {
            reject()
          }
        }
      };
      http.request(params);
    })
    Promise.all([getCount, getList]).then(data => {

      wx.hideLoading()
    }).catch((e) => {
      wx.hideLoading()

      wx.showToast({
        title: '获取积分信息失败，请稍后再试！',
        icon: 'none',
        duration: 3000
      })
    })
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
    var that = this
    if (that.data.page < that.data.pages) {
      that.data.page++;
      var params = {
        url: "/p/integral/pageIntegral",
        method: "GET",
        data: {
          current: that.data.page
        },
        callBack: res => {
          if (res.status == 200) {
            if (res.data && res.data.list && res.data.list.length > 0) {
              res.data.list.forEach(item => {
                switch (item.integralType) {
                  case 1:
                    item.typeName = '扫码'
                    break
                  case 2:
                    item.typeName = '商品兑换'
                    break
                  case 3:
                    item.typeName = '活动获得'
                    break
                  case 4:
                    item.typeName = '企业操作'
                    break
                  case 5:
                    item.typeName = '完善个人信息'
                    break
                  default:
                    item.typeName = ''
                }
              })
            }
            that.setData({
              list: [...new Set(that.data.list), ...new Set(res.data.list)]
            })
          } else {
            wx.showToast({
              title: '服务连接失败，请稍后再试！',
              icon: 'none',
              duration: 3000
            })
          }
        }
      };
      http.request(params);
    } else {
      wx.hideToast()
      wx.showToast({
        title: '我也是有底线的！',
        icon: 'none',
        duration: 2000
      })
    }

  },


  goRules() {
    wx.navigateTo({
      url: '/pages/rules/rules'
    })
  }
})