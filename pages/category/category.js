// pages/category/category.js

var http = require("../../utils/http.js");
var config = require("../../utils/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selIndex: 0,
    categoryList: [],
    categorySecondList: [],
    productList: [],
    categoryImg: '',
    prodid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中'
    });
    var ths = this;
    //加载分类列表
    var params = {
      url: "/category/categoryInfo",
      method: "GET",
      data: {
        parentId: ''
      },
      callBack: function(res) {
        wx.hideLoading();
        ths.setData({
          categoryName: res[0].categoryName,
          categoryImg: res[0].pic,
          categoryList: res,
        });
        ths.getCategory(res[0].categoryId)
        ths.getProdList(res[0].categoryId)
      }
    };
    http.request(params);
  },
  // 根据地查询分类
  getCategory(id) {
    var ths = this;
    //加载分类列表
    var params = {
      url: "/category/categoryInfo",
      method: "GET",
      data: {
        parentId: id ? id : ''
      },
      callBack: function(res) {
        console.log(res)
        if (res && res.length) {
          ths.setData({
            categorySecondList: res,
          });
          ths.getProdList(res[0].categoryId)
        } else {
          ths.setData({
            categorySecondList: [],
          });
        }
      }
    };
    http.request(params);
  },
  /**
   * 分类点击事件
   */
  onMenuTab: function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.getCategory(this.data.categoryList[index].categoryId)
    this.getProdList(this.data.categoryList[index].categoryId);
    this.setData({
      categoryName: this.data.categoryList[index].categoryName,
      categoryImg: this.data.categoryList[index].pic,
      selIndex: index
    });
  },
  onSecondTab(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.getProdList(this.data.categorySecondList[index].categoryId);
    this.setData({
      categoryName: this.data.categorySecondList[index].categoryName,
      categoryImg: this.data.categorySecondList[index].pic,
      categorySecondList: []
    });
  },
  // 跳转搜索页
  toSearchPage: function() {
    wx.navigateTo({
      url: '/pages/search-page/search-page',
    })
  },
  getProdList(categoryId) {
    //加载分类列表
    var params = {
      url: "/prod/pageProd",
      method: "GET",
      data: {
        categoryId: categoryId
      },
      callBack: (res) => {
        this.setData({
          productList: res.records,
        });
      }
    };
    http.request(params);
  },

  //跳转商品详情页
  toProdPage: function(e) {
    var prodid = e.currentTarget.dataset.prodid;
    wx.navigateTo({
      url: '/pages/prod/prod?prodid=' + prodid,
    })
  },
  toClassifyPage: function(e) {
    var url = '/pages/prod-classify/prod-classify?sts=99';
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    if (id) {
      url += "&tagid=" + id + "&title=" + title;
    }
    wx.navigateTo({
      url: url
    })
  }
})