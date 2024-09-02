const common = require("../../utils/common");

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {
      id: "264698",
      title: "省退役军人事务厅来校交流对接工作",
      poster:
        "https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg",
      content:
        " 8 月 19 日，省退役军人事务厅二级巡视员蔡元和、办公室主任刘恒贵、就业创业处副处长钟俊武一行来校就联合共建安徽退役军人学院事宜进行交流对接。校党委常委、副校长陆林，芜湖市退役军人事务局党组成员、副局长张桂芬，学校办公室、人事处、教务处、招就处、学生处、研究生院、体育学院负责同志参加会议。",
      add_date: "2022-08-19",
    },
  },

  addFavorites: function (options) {
    let article = this.data.article;
    wx.setStorageSync(article.id, article);
    this.setData({ isAdd: true });
  },

  cancalFavorites: function () {
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({ isAdd: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id;
    var article = wx.getStorageSync(id);

    if (article != "") {
      this.setData({
        article: article,
        isAdd: true,
      });
    } else {
      let result = common.getNewsDetail(id);
      if (result.code == "200") {
        this.setData({
          article: result.news,
          isAdd: false,
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
