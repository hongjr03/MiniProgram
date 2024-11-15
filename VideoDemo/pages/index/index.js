function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: "1001",
        title: "杨国宜先生口述校史实录",
        videoUrl:
          "http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4",
      },
      {
        id: "1002",
        title: "唐成伦先生口述校史实录",
        videoUrl:
          "http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4",
      },
      {
        id: "1003",
        title: "倪光明先生口述校史实录",
        videoUrl:
          "http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4",
      },
      {
        id: "1004",
        title: "吴仪兴先生口述校史实录",
        videoUrl:
          "http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4",
      },
    ],
    src: "",
    danmuList: [
      {
        text: "第 1s 出现的弹幕",
        color: "#ff0000",
        time: 1,
      },
      {
        text: "第 3s 出现的弹幕",
        color: "#ff00ff",
        time: 3,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo');
  },

  /**
   * 播放视频
   */
  playVideo: function (e) {
    // console.log(e);
    this.videoCtx.stop();
    this.setData({
      src: e.currentTarget.dataset.url,
    })
    // console.log(this.data.src);
    this.videoCtx.play();
  },
  
  inputDanmu: function (e) {
    this.inputValue = e.detail.value;
  },

  sendDanmu: function () {
    this.videoCtx.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
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
