#import "template.typ": *
#import "@preview/tablex:0.0.8": tablex, cellx, rowspanx, colspanx, vlinex, hlinex
#import "@preview/cetz:0.2.2"

#let title = "实验5：高校新闻网"
#let author = "洪佳荣"
#let course_id = "移动软件开发"
#let instructor = "高峰老师"
#let semester = "2024夏季"
#let due_time = "2024年9月2日"
#let id = "22070001035"

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

*源代码*：#link("https://github.com/hongjr03/MiniProgram")\
*博客*：#link("https://www.jrhim.com/p/2024a/mini-program-5")

= 实验目的
<实验目的>

1. 综合所学知识创建完整的前端新闻小程序项目；
2. 能够在开发过程中熟练掌握真机预览、调试等操作。

= 实验步骤

== 准备工作

#prob[下载需要的素材][
  按照老师的要求，下载实验所需的素材，#link("https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/demo4_file.zip")[下载地址]。
]

#prob[项目创建和初始化][
  项目创建直接基于第一次实验的空白小程序继续开发。复制项目后，将素材放到项目的对应目录下。

  根据项目的功能需求，需要分别创建首页、新闻页和个人中心页，所以在 pages 目录下创建对应的文件夹。目录结构如下：

  ```
  .
  ├─images
  ├─pages
  │  ├─detail
  │  ├─index
  │  └─my
  └─utils
  ```
]

== 视图设计

#prob[导航栏设计][
  在 app.json 中加入对 window 的配置，设置导航栏的背景颜色和文字颜色。

  ```json
  "window":{
    "navigationBarBackgroundColor": "#328EEB",
    "navigationBarTitleText": "搞笑新闻网",
    "navigationBarTextStyle":"white"
  },
  ```
]

#prob[tabBar 设计][
  在 app.json 中对 pages 进行配置，指定tabbar跳转的页面。

  ```json
    "pages":[
      "pages/index/index",
      "pages/detail/detail",
      "pages/my/my"
    ],
  ```

  然后对 tabBar 进行配置，设置颜色、选中颜色、图标和文字。

  ```json
  "tabBar": {
    "color":"#000",
    "selectedColor": "#328EEB",
    "list":[
      {
        "pagePath": "pages/index/index",
        "iconPath": "images/index.png",
        "selectedIconPath": "images/index_blue.png",
        "text":"首页"
      },
      {
        "pagePath": "pages/my/my",
        "iconPath":"images/my.png",
        "selectedIconPath": "images/my_blue.png",
        "text": "我的"
      }
    ]
  },
  ```

  这样就得到了一个简单的 tabbar。

  #figure(image("assets/2024-09-02-15-46-22.png", width: 60%))
]

#prob[页面设计][
  首页的页面设计和要求一样，上部是一个轮播图，下面是一个新闻列表。新闻列表的每一项都是一个卡片，点击后可以跳转到新闻详情页。

  ```html
  <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="5000" duration="500">
    <block wx:for="{{swiperImg}}" wx:key='swiper{{index}}'>
      <swiper-item>
        <image class="swiper-image" src="{{item.src}}" mode="aspectFill"></image>
      </swiper-item>
    </block>
  </swiper>

  <view id='news-list'>
    <view class='list-item' wx:for="{{newsList}}" wx:for-item="news" wx:key="{{news.id}}">
      <image src='{{news.poster}}'></image>
      <view class='news-title' bindtap='goToDetail' data-id='{{news.id}}'>
        <text class='title'>{{news.title}}</text>
        <text class='date'>{{news.add_date}}</text>
      </view>
    </view>
  </view>
  ```

  在这里，我另外加入了对轮播图图像的配置（使用 ```html mode="aspectFill"```），让它缩放到填充整个轮播图。也修改了新闻列表里每一个item的样式，让它更加美观。

  个人中心页面的设计就比较简单，是之前的实验二加上这次的新闻列表的组合。新闻页也没有太特殊的地方。这里就不再赘述了。

  #grid(columns: (1fr,) * 3)[#figure(image("assets/2024-09-02-15-56-33.png"))][#figure(
      image("assets/2024-09-02-15-57-27.png"),
    )][#figure(image("assets/2024-09-02-15-57-44.png"))]

]

== 逻辑实现

#prob[公共逻辑][
  在老师的JavaScript文件中，已经定义了一些公共的函数，比如获取新闻列表、获取新闻详情等。这里以老师提供的 common.js 为基础进行开发。

  首先是依次从学校的观海听涛网站上获取需要修改的三则新闻，然后将新闻的标题、发布时间、海报等信息在数组里进行修改。

  #figure(image("assets/2024-09-02-16-01-05.png", width: 72%))

  这里在首页有一个问题，文档中没有提到。就是在更改新闻列表后，首页的轮播图实际上还是使用的是 index.js 中存的数据，所以需要再实现一个函数，给轮播图创造一个新的列表。这个函数传入一个参数，表示轮播图的长度，然后返回一个轮播图列表。

  ```js
  function getSwiperList(swiperLength) {
    let list = [];
    for (var i = 0; i < swiperLength; i++) {
      let obj = {};
      obj.src = news[i].poster;
      list.push(obj);
    }
    return list; //返回幻灯片列表
  }
  ```

  然后在对外暴露接口中加入这个函数。

  ```js
  // 对外暴露接口
  module.exports = {
    getNewsList: getNewsList,
    getSwiperList: getSwiperList,
    getNewsDetail: getNewsDetail,
  };
  ```

  这样就可以在首页的轮播图中显示新的新闻了。

  在各页面的顶部加入 ```js
  var common = require("../../utils/common.js"); //引用公共 JS 文件
  ```，这样就可以使用公共的函数了。
]

#prob[首页逻辑][
  在首页根据公共函数获取新闻列表和轮播图列表，然后在页面加载时调用这两个函数。

  ```js
  onLoad: function (options) {
    // 获取新闻列表
    let list = common.getNewsList();
    let swiperList = common.getSwiperList(3);
    // 更新列表数据
    this.setData({
      newsList: list,
      swiperImg: swiperList,
    });
  },
  ```

  然后当点击新闻列表的时候，跳转到新闻详情页。

  ```js
  goToDetail: function (e) {
    // 获取携带的 data-id 数据
    let id = e.currentTarget.dataset.id;
    // 携带新闻 id 进行页面跳转
    wx.navigateTo({
      url: "../detail/detail?id=" + id,
    });
  },
  ```
]

#prob[新闻页逻辑][
  首先是显示对应新闻。在页面加载时，可以通过参数 options 获取到新闻的 id，然后通过 common.js 中的函数获取新闻的详细信息。

  而对于收藏和取消收藏的实现，可以对每篇新闻加一个 isAdd 的属性，表示是否已经收藏。这个属性在页面加载时就可以获取到，然后在点击收藏按钮时，根据这个属性来判断是收藏还是取消收藏。如果收藏，就将新闻存到本地缓存中。

  ```js
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
  ```

  这样结合起来，就可以实现新闻的收藏功能了。

  ```js
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
  ```
]

#prob[个人中心页逻辑][
  个人中心页上半部分和实验二类似，不再赘述。

  下半部分收藏列表的逻辑和新闻页类似，只是这里的新闻列表是从本地缓存中获取的。在页面加载时，获取本地缓存中的新闻列表，然后显示在页面上。

  ```js
  getMyFavorites: function () {
    let articles = [];
    let keys = wx.getStorageInfoSync().keys;
    for (let i = 0; i < keys.length; i++) {
      let article = wx.getStorageSync(keys[i]);
      articles.push(article);
    }
    this.setData({ articles: articles });
  },
  ```

  这里在检查时出现了一个问题，就是当收藏的新闻已经不存在的时候，它仍会显示一个空白的卡片。这个问题的解决见 #link(<问题总结与体会>)[问题总结与体会]。
]

= 程序运行结果
<程序运行结果>

#grid(columns: (1fr,) * 5)[
  #image("assets/2024-09-02-16-16-19.png")
][
  #image("assets/2024-09-02-16-16-26.png")
][
  #image("assets/2024-09-02-16-16-33.png")
][
  #image("assets/2024-09-02-16-16-47.png")
][
  #image("assets/2024-09-02-16-16-56.png")
]

= 问题总结与体会
<问题总结与体会>

#cqa[当更改新闻列表后，首页的轮播图实际上还是使用的是 index.js 中存的数据。][
  这个问题是因为，轮播图的数据是在 index.js 中定义的，而不是在 common.js 中定义的。所以在更改新闻列表后，首页的轮播图实际上还是使用的是 index.js 中存的数据。所以需要再实现一个函数，给轮播图创造一个新的列表。这个函数传入一个参数，表示轮播图的长度，然后返回一个轮播图列表。
]

#cqa[在个人中心页中，当收藏的新闻已经不存在的时候，它仍会显示一个空白的卡片。][
  我的解决方法是在获取个人收藏列表时，先判断新闻是否存在，如果不存在就删掉这个新闻。这样就不会显示空白的卡片了。

  ```js
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
  ```

  使用本地缓存时实际上很低效，因为它不像数据库那样可以直接查询，所以在这里我只是简单地遍历了一遍，然后判断是否存在。如果数据量大的话，这样的方法是不可取的。
]

#speci_block[实验总结][
  这次实验是在前几次实验的基础上继续开发，所以整体上并没有太大的困难。在这次实验中，我学会了如何使用小程序的 tabbar，以及如何在页面之间传递数据。感觉这次实验的难点在于逻辑的实现，比如新闻的收藏和取消收藏，以及个人中心页的收藏列表的显示。其实还是不太完美的，比如既然实现了登录，那么就应该有一个用户系统，让收藏的内容跟着用户走。希望以后有机会再来完善这个小程序。
]
