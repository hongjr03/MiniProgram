Page({
    data: {
      timelineItems: []
    },
  
    onLoad: function() {
      // 模拟从服务器获取数据
      this.setData({
        timelineItems: [
          {
            id: 1,
            albumCover: 'path/to/cover1.jpg',
            songTitle: '歌曲 1',
            artist: '歌手 1',
            lyric: '这是歌曲 1 的歌词片段',
            date: '2023-05-20 14:30'
          },
          {
            id: 2,
            albumCover: 'path/to/cover2.jpg',
            songTitle: '歌曲 2',
            artist: '歌手 2',
            lyric: '这是歌曲 2 的歌词片段',
            date: '2023-05-20 15:45'
          },
          // 更多数据...
        ]
      });
    }
  })