const util = require("../../utils/util");

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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

  // getMyInfo: function(e) {
  //   let info = e.detail.userInfo;
  //   this.setData({
  //     src: info.avatarUrl,
  //     name: info.nickName,
  //   });
  // },

  data: {
    region: ["浙江省", "杭州市", "钱塘区"]
  },

  regionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    this.getWeather();
  },

  getWeather: function () {
    var that = this;
    wx.request({
      url: "https://devapi.qweather.com/v7/weather/now",
      data: {
        // location: that.data.region[1],
        location: util.getLocationID(that.data.region[1]),
        key: "3e916ed15fc14f83a3d66e6d4a237cb8"
      },
      success: function (res) {
        console.log(res.data);
      }
    });
  }
});
