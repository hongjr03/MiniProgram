var common = require("../../utils/common.js"); //引用公共 JS 文件

// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    nickName: "未登录",
    src: "/images/index.png",
    newsList: [],
  },

  getMyFavorites: function () {
    let list = common.getNewsList();

    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;

    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      // 如果收藏的新闻在新闻列表中
      let flag = false;
      for (var j = 0; j < list.length; j++) {
        if (list[j].id == obj.id) {
          obj.poster = list[j].poster;
          obj.add_date = list[j].add_date;
          obj.title = list[j].title;
          flag = true;
          break;
        }
      }
      if (flag) myList.push(obj);
      else {
        /* 删除无效收藏 */
        wx.removeStorageSync(keys[i]);
        num--;
      }
    }

    this.setData({
      newsList: myList,
      num: num,
    });
  },

  getProfile: function (e) {
    wx.getUserProfile({
      desc: "展示用户信息",
      success: (res) => {
        console.log(res);
        this.setData({
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          isLogin: true,
        });
      },
    });
    this.getMyFavorites();
  },

  goToDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../detail/detail?id=" + id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (this.data.isLogin) {
      this.getMyFavorites();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
