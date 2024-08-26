// wx.navigateTo({
//     url: '/pages/edit/song?song=' + song
//   });

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumCover: '',
    albumName: '',
    singerName: '',
    songName: '',
    lyric: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const song = app.globalData.songInfo;
    console.log(song);
    this.parseSongInfo(song);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  parseSongInfo(song) {
    // {"errno":0,"errmsg":"","data":{"total":1699,"list":[{"songmid":"003QqH8h2VCgcV","songname":"SAD!","interval":166,"singer":[{"id":1372556,"name":"XXXTentacion"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M0000027KXGL2gMDCr.jpg?max_age=2592000","albumname":"? (Explicit)","albumdesc":"","free":false},{"songmid":"003VELq83ZfX8T","songname":"ˢᴬᴰ","interval":198,"singer":[{"id":3824549,"name":"CHILLVIBE 丘稗"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M0000031a9Wo2gbt3u.jpg?max_age=2592000","albumname":":)","albumdesc":"","free":true},{"songmid":"002gJlAb23glib","songname":"SAD!","interval":169,"singer":[{"id":59551,"name":"Like Mike"},{"id":945760,"name":"Angemi"},{"id":1372556,"name":"XXXTentacion"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000003UxTNZ3zaubL.jpg?max_age=2592000","albumname":"SAD! (Like Mike & Angemi Remix)","albumdesc":"","free":true},{"songmid":"001u0yV44V73pf","songname":"Sad","interval":190,"singer":[{"id":3003997,"name":"HYESUNG"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000000qG6gw1hMLFE.jpg?max_age=2592000","albumname":"Sad","albumdesc":"","free":false},{"songmid":"001h4ieJ24FNrV","songname":"Sad","interval":196,"singer":[{"id":4012762,"name":"iamnotshane"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000000pzaal1YA4vl.jpg?max_age=2592000","albumname":"Sad","albumdesc":"","free":true},{"songmid":"002Vqu8X0eC7Pw","songname":"The Muffin Song(asdfmovie)","interval":187,"singer":[{"id":1448750,"name":"TomSka"},{"id":162222,"name":"The Gregory Brothers"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000001F4six2ePZF1.jpg?max_age=2592000","albumname":"The Muffin Song (asdfmovie)","albumdesc":"","free":true},{"songmid":"003buRlI3UDf7t","songname":"5 Horas Da Manhã","interval":127,"singer":[{"id":14883708,"name":"泽天龙"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000004IVyUe2dvuQF.jpg?max_age=2592000","albumname":"白楞白楞","albumdesc":"","free":false},{"songmid":"002wICxx1MExX4","songname":"À quatre pas d'ici","interval":237,"singer":[{"id":4709,"name":"Céline Dion"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M0000016kYsR2eL4Li.jpg?max_age=2592000","albumname":"Gold","albumdesc":"","free":false},{"songmid":"0049mjcX0k1MUi","songname":"5 Horas Da Manhã","interval":130,"singer":[{"id":14883708,"name":"泽天龙"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000004IVyUe2dvuQF.jpg?max_age=2592000","albumname":"白楞白楞","albumdesc":"","free":false},{"songmid":"0005XIwV1HCmUp","songname":"Tu m’as dit","interval":215,"singer":[{"id":283369,"name":"Louane"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000001UmVIO3WAb3S.jpg?max_age=2592000","albumname":"Sentiments","albumdesc":"","free":true},{"songmid":"002itAYF3oHtp8","songname":"Ballade No. 3, Op. 47 in A Flat / As-dur / la bémol majeur","interval":480,"singer":[{"id":17324,"name":"Evgeny Kissin"},{"id":15057,"name":"Frédéric Chopin"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000002bLDbv133r5Z.jpg?max_age=2592000","albumname":"Chopin: Ballades & Berceuse & Barcarolle & Scherzo No. 4","albumdesc":"","free":false},{"songmid":"002W01253egm5n","songname":"Celestial (feat. $LMK, Jurasd & phonk.me)","interval":133,"singer":[{"id":14664623,"name":"Rxn!"},{"id":12819349,"name":"$LMK"},{"id":12450623,"name":"Jurasd"},{"id":11524822,"name":"phonk.me"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M0000038SFYn0ruS4V.jpg?max_age=2592000","albumname":"Celestial (feat. $LMK, Jurasd & phonk.me) [Explicit]","albumdesc":"","free":true},{"songmid":"003jU74C4a69OV","songname":"Al Compás de Tus Contornos","interval":288,"singer":[{"id":3699951,"name":"Carlos Viola"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000002jh9PN3hKjrz.jpg?max_age=2592000","albumname":"Blasphemous (Original Game Soundtrack)","albumdesc":"","free":true},{"songmid":"001fMjbe3V9MoM","songname":"Tu m'as dit","interval":215,"singer":[{"id":172883,"name":"Gims"},{"id":177498,"name":"Bedjik"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000004RtTjv1MsdLz.jpg?max_age=2592000","albumname":"Ceinture noire (Décennie)","albumdesc":"","free":true},{"songmid":"004fJJcs1ELxN6","songname":"Komm Mit Nach Varasdin","interval":154,"singer":[{"id":9308,"name":"André Rieu"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000003IHh2H1KHZIm.jpg?max_age=2592000","albumname":"Das Jahrtausendfest","albumdesc":"","free":false},{"songmid":"002SiUdo3hKYBB","songname":"Asdfmovie6 Song","interval":126,"singer":[{"id":968069,"name":"LilDeuceDeuce"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000000ZvhAv0rtZsF.jpg?max_age=2592000","albumname":"Asdfmovie6 Song - Single","albumdesc":"","free":true},{"songmid":"0021Csxy2hA9Vg","songname":"Lágrimas de um Terrorista","interval":224,"singer":[{"id":2661834,"name":"A.Jay"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000002mFlBJ1MkWPg.jpg?max_age=2592000","albumname":"A.Jay A.Jhota","albumdesc":"","free":true},{"songmid":"0044DAln0elFAK","songname":"ENTJ","interval":229,"singer":[{"id":16471610,"name":"ASD"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000003i7hDA3fGn42.jpg?max_age=2592000","albumname":"DAY ONE","albumdesc":"","free":true},{"songmid":"000MEXGv2WtQV1","songname":"The Muffin Song(8-Bit asdfmovie & Schmoyoho Emulation)","interval":182,"singer":[{"id":1204308,"name":"8-Bit Arcade"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000003Oa9HL1oYEcL.jpg?max_age=2592000","albumname":"By Request, Vol. 16 (Explicit)","albumdesc":"","free":true},{"songmid":"00416TG51NGX5l","songname":"Lágrimas de Grana y Oro","interval":193,"singer":[{"id":3699951,"name":"Carlos Viola"}],"albumcover":"https://y.gtimg.cn/music/photo_new/T002R300x300M000002jh9PN3hKjrz.jpg?max_age=2592000","albumname":"Blasphemous (Original Game Soundtrack)","albumdesc":"","free":true}]}}
    this.setData({
      albumCover: song.albumcover,
        albumName: song.albumname,
        singerName: song.singer[0].name,
        songName: song.songname
    });
    console.log(song);
  },
})