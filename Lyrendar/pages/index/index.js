Page({
  data: {
    lyricInput: "",
    searchResult: null,
  },

  // 第一次打开时
  onLoad: function() {
    // 清空搜索结果
    this.setData({
      searchResult: null
    });
  },

  onInputLyric(e) {
    console.log(e)
    this.setData({
      lyricInput: e.detail
    });
    // 一边输入一边搜索
    this.searchLyric();

    // this.setData({
    //   lyricInput: e.detail.value
    // });
    // // 一边输入一边搜索
    // this.searchLyric();
  },

  searchLyric() {
    // https://api.timelessq.com/music/tencent/search?keyword=lyricInput
    wx.request({
      url: 'https://api.timelessq.com/music/tencent/search',
      data: {
        keyword: this.data.lyricInput
      },
      success: (res) => {
        this.setData({
          searchResult: res.data.data.list
        });
        console.log(res.data.data.list);
      }
    });
  },

  saveLyric() {
    // 保存歌词到用户数据
    // 这里需要调用后端 API
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  },

  onSelectSong(e) {
    // <view wx:for="{{searchResult}}" wx:key="songmid" class="search-item" bindtap="onSelectSong" data-song="{{item}}">
    const song = e.currentTarget.dataset.song;
    console.log(song);
    // 跳转到歌曲详情页
    const app = getApp();
    app.globalData.songInfo = song;
    app.globalData.lyric = this.data.lyricInput;
    wx.navigateTo({
      url: '/pages/edit/edit'
    });

  }
});