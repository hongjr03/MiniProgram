// wx.navigateTo({
//     url: '/pages/edit/song?song=' + song
//   });

function backgroundBlur({ img }) {
  // canvas
  const canvas = wx.createCanvasContext("background");
  // draw
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      canvas.setFillStyle(position[i][j]);
      canvas.fillRect(i * 100, j * 100, 100, 100);
    }
  }
  canvas.draw({
    series: [
      {
        type: "fillRect",
        data: [0, 0, 100, 100],
      },
      {
        type: "blur",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        blur: 40,
        zIndex: 1,
      },
    ],
  });
  // save
  canvas.draw(true);
  // return
  return canvas;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    lyric: '默认歌词内容',
    canvas: null,
    ctx: null,
    canvasWidth: 0,
    canvasHeight: 0
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createSelectorQuery()
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
  
        const width = res[0].width;
        const height = res[0].height;
  
        const dpr = wx.getWindowInfo().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
  
        this.setData({
          canvas: canvas,
          ctx: ctx,
          canvasWidth: width,
          canvasHeight: height
        });
  
        this.drawBackground();
        this.drawLyrics();
      });
  },
  
  drawBackground: function() {
    const { ctx, canvas, canvasWidth, canvasHeight } = this.data;
    const image = canvas.createImage();
    image.onload = () => {
      ctx.filter = "blur(40px) brightness(0.4)";
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
      ctx.filter = "none";
      ctx.drawImage(image, canvasWidth / 7, canvasHeight / 7, canvasWidth / 5, canvasHeight / 5);
    };
    image.src = getApp().globalData.songInfo.albumcover;
  },
  
  
  drawLyrics: function() {
    const { ctx, canvasWidth, canvasHeight, lyric } = this.data;
    
    // 清除之前的文字
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight / 2); // 只清除上半部分，假设文字都在上半部分
  
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "top";
    ctx.font = "24px sans-serif";
  
    const words = lyric.split("");
    const pending = 20;
    const maxWidth = canvasWidth - pending * 2;
    const lines = [];
  
    let line = "";
    let lineWidth = 0;
  
    for (let i = 0; i < words.length; i++) {
      line += words[i];
      lineWidth = ctx.measureText(line).width;
  
      if (lineWidth >= maxWidth) {
        lines.push(line);
        line = "";
      } else if (i === words.length - 1) {
        lines.push(line);
      }
    }
  
    const lineHeight = 34;
    const textStartY = canvasHeight / 3;
  
    lines.forEach((line, i) => {
      ctx.fillText(line, pending, textStartY + lineHeight * i);
    });
  },
  

  onInputLyric(e) {
    this.setData({
      lyric: e.detail
    }, () => {
      this.drawBackground();
      this.drawLyrics();
    });
  },
  

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

  parseSongInfo(song) {
    this.setData({
      albumCover: song.albumcover,
      albumName: song.albumname,
      singerName: song.singer[0].name,
      songName: song.songname,
    });
    console.log(song);
  },
});
