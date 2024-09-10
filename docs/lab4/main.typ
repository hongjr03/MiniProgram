#import "template.typ": *
#import "@preview/tablex:0.0.8": tablex, cellx, rowspanx, colspanx, vlinex, hlinex
#import "@preview/cetz:0.2.2"

#let title = "实验4：媒体API之口述校史"
#let author = "洪佳荣"
#let course_id = "移动软件开发"
#let instructor = "高峰老师"
#let semester = "2024夏季"
#let due_time = "2024年8月27日"
#let id = "22070001035"

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

*源代码*：#link("https://github.com/hongjr03/MiniProgram")\
*博客*：#link("https://www.jrhim.com/p/2024a/mini-program-4")

= 实验目的
<实验目的>

1. 掌握视频API的操作方法；
2. 掌握如何发送随机颜色的弹幕。

= 实验步骤

#prob[下载需要的素材][
  按照老师的要求，下载实验所需的素材，包括视频链接和播放按钮图标。这里我用的播放按钮图标来自Google Material Design的图标库，可以在#link("https://fonts.google.com/icons")[这里]下载。

  #figure(image("assets/2024-08-27-10-36-17.png", width: 15%))
]

#prob[项目创建和初始化][
  项目创建直接基于第一次实验的空白小程序继续开发。复制项目后，将素材放到项目的对应目录下。目录结构如下：

  ```
  .
  ├─images
  └─pages
      └─index
  ```

  所有更改见#link("https://github.com/hongjr03/MiniProgram/commit/deb79362a1dbf4b7cbf0d537d8bdf9ec07a15052")[这里]。
]

#prob[视图设计][

  1. 将导航栏修改为“口述校史”，并把背景颜色改为 \#987938。#link("https://github.com/hongjr03/MiniProgram/commit/b5d48341c6c110a75650379c5865cad46ac6b3f0")[Commit]
  2. 划分视频播放器、弹幕发送区域、视频列表三个区域。#link("https://github.com/hongjr03/MiniProgram/commit/0aad3dc55348a2ac45e448fd4944a857e92b3351")[视频组件]、#link("https://github.com/hongjr03/MiniProgram/commit/8717d836a3671db0995f81efa1fa32dd0fe2807b")[弹幕区域]、#link("https://github.com/hongjr03/MiniProgram/commit/c4099170d953094e7563f4a5f165930834f48d02")[视频播放列表]。其中在弹幕区域，我加了几个圆角（corner-radius）和元素之间的间距（padding），使得整体看起来更加美观。
  #image("assets/2024-08-27-11-00-02.png")
]

#prob[逻辑实现][
  更新播放列表这里，直接使用 wx:for 循环遍历一个数组，然后在点击事件中更新视频的 src。#link("https://github.com/hongjr03/MiniProgram/commit/48508e9be9b14171ab07a3c91ea2b34e4b681bc4")[Commit]

  这里在调试过程中，开发者工具有提示 wx:key 不合法的问题，所以我将文档中的 `wx:key='video{{index}}'` 改为了 `wx:key='id'`，这样就不会报错了。

  #figure(image("assets/2024-08-27-11-07-43.png", width: 80%))

  最后就是弹幕的逻辑实现，这里是依赖于视频上下文对象的 sendDanmu 方法，将弹幕发送到视频上。所以首先应该在进入小程序时先初始化一个视频上下文对象，然后在发送弹幕时调用 sendDanmu 方法。#link("https://github.com/hongjr03/MiniProgram/commit/0eaadf019b572a56b08037e218f7ca9982014e57")[Commit]

  视频切换的时候，需要注意的是，要先停止当前视频的播放，然后再切换到下一个视频。
]

= 程序运行结果
<程序运行结果>

#grid(columns: (1fr,)*4)[
  #image("assets/2024-08-27-11-10-50.png")
][
  #image("assets/2024-08-27-11-12-18.png")
][
  #image("assets/2024-08-27-11-12-22.png")
][
  #image("assets/2024-08-27-11-12-29.png")
]

= 问题总结与体会
<问题总结与体会>

#cqa[更新播放列表时，可以读取标题但无法播放。][
  这个问题是因为，实例化视频上下文对象后，再对其进行操作应当使用标准的参数接口，比如这里就是 src。而我在这里闯入了一个videoUrl的参数，导致无法播放。所以查阅文档还是要仔细一些。
]

#cqa[
  切换视频后，其他视频的弹幕仍然存在。
][
  这个问题是因为，弹幕是直接发送到视频上的，所以在切换视频时，应当先清空弹幕，然后再切换视频。
  
  但这样会导致原来发的弹幕是一次性的，所以我猜可能是要在视频切换时，将弹幕保存到一个数据库中，然后再切换视频时，再发送一次。
]


#speci_block[实验总结][
  几次实验都是在和API打交道，使用API的核心还是要了解API的文档，然后再根据文档来进行开发。在这次实验中学会了如何使用视频API，以及如何发送弹幕。本来以为发送弹幕这种功能会很复杂，其实都已经封装好了，只需要调用就可以。
]