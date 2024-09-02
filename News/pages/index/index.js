// pages/index/index.js
var common = require("../../utils/common.js"); //引用公共 JS 文件
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [],
  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function (e) {
    //获取携带的 data-id 数据
    let id = e.currentTarget.dataset.id;
    //携带新闻 id 进行页面跳转
    wx.navigateTo({
      url: "../detail/detail?id=" + id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取新闻列表
    let list = common.getNewsList();
    let swiperList = common.getSwiperList(3);
    //更新列表数据
    this.setData({
      newsList: list,
      swiperImg: swiperList,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
