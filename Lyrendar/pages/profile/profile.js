Page({
    data: {
      userInfo: {},
      lyricHistory: []
    },
  
    onLoad: function() {
      // 模拟获取用户信息
      this.setData({
        userInfo: {
          avatarUrl: 'path/to/avatar.jpg',
          nickName: '用户昵称'
        }
      });
  
      // 模拟获取歌词历史
      this.setData({
        lyricHistory: [
          {
            id: 1,
            albumCover: 'path/to/cover1.jpg',
            songTitle: '歌曲 1',
            artist: '歌手 1',
            lyric: '这是歌曲 1 的歌词片段',
            date: '2023-05-18'
          },
          {
            id: 2,
            albumCover: 'path/to/cover2.jpg',
            songTitle: '歌曲 2',
            artist: '歌手 2',
            lyric: '这是歌曲 2 的歌词片段',
            date: '2023-05-19'
          },
          // 更多历史数据...
        ]
      });
    }
  })