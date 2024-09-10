#import "template.typ": *
#import "@preview/tablex:0.0.8": tablex, cellx, rowspanx, colspanx, vlinex, hlinex
#import "@preview/cetz:0.2.2"

#let title = "实验3：微信小程序云开发"
#let author = "洪佳荣"
#let course_id = "移动软件开发"
#let instructor = "高峰老师"
#let semester = "2024夏季"
#let due_time = "2024年8月26日"
#let id = "22070001035"

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

*源代码*：#link("https://github.com/hongjr03/MiniProgram")\
*博客*：#link("https://www.jrhim.com/p/2024a/mini-program-3")

= 实验目的
<实验目的>

学习微信小程序云开发的基础知识。

= 实验步骤

#prob[创建云开发环境][
  #figure(image("assets/2024-08-26-14-21-08.png", width: 70%))
  右上角可以看到云开发的环境ID，点击即可复制。
]

#prob[注册百度智能云并实名认证、领取免费额度][
  #grid(columns: (1fr, 1fr), column-gutter: 1em)[#figure(image("assets/2024-08-26-14-23-06.png"))][#figure(
      image("assets/2024-08-26-14-25-49.png"),
    )]
  这里容易出现的问题是，由于实验文档有一定时间距离了，页面已经有了变化，容易忽略掉领取免费额度的步骤，导致后续无法调用其 API，见#link(<问题总结与体会>)[问题总结与体会]。

  领取免费额度后，在应用列表可以看到自己的 API Key 和 Secret Key，复制下来备用。


]

#prob[导入项目][
  导入#link("https://gitee.com/xxwan/garbage-sorting-applet")[垃圾分类小程序]，并修改 app.js 中的云环境ID，以及 search.js 中的百度智能云的 API Key 和 Secret Key。

  项目目录结构如下：
  ```
  .
  ├─cloudfunctions
  │  ├─getHotItems
  │  ├─login
  │  ├─search
  │  └─type
  └─miniprogram
      ├─components
      │  └─chatroom
      ├─images
      ├─pages
      │  ├─index
      │  ├─main
      │  ├─my
      │  └─search
      └─style
  ```
]

#prob[上传、部署云函数][
  依次选择 cloudfunctions 中的四个云函数，点击上传并部署。
  #figure(image("assets/2024-08-26-14-39-45.png", width: 60%))
]

#prob[部署云数据库][
  在云开发的云数据库中，创建集合 trash 和 type，分别用于存储垃圾分类的数据和垃圾分类的类别。从老师给的 json 文件中导入数据。

  #grid(columns: (1fr, 1fr), column-gutter: 1em)[#figure(image("assets/2024-08-26-14-42-43.png"))][#figure(
      image("assets/2024-08-26-14-43-29.png"),
    )]
]

= 程序运行结果
<程序运行结果>

#grid(columns: (
    1fr,
    1fr,
    1fr,
  ))[#image("assets/2024-08-26-14-48-37.png")][#image("assets/2024-08-26-14-48-50.png")][#image("assets/2024-08-26-14-49-02.png")]

#grid(columns: (
    1fr,
    1fr,
    1fr,
  ))[#image("assets/2024-08-26-14-51-44.png")][#image("assets/2024-08-26-14-51-16.png")][#image("assets/2024-08-26-14-51-26.png")]

= 问题总结与体会
<问题总结与体会>

#cqa[部署百度云API后无法正常调用。][
  实验中遇到无论如何上传图片都无法正常识别图像物体的问题，查询调试控制台发现

  #image("assets/2024-08-26-14-46-02.png")

  statusCode 为200，说明可以正常调用百度云的 API，但是返回的结果提示 "Open api qps request limit reached"，说明调用次数超过限制。这时候回到线上的控制台查看调用情况：

  #figure(image("assets/2024-08-26-14-45-13.png", width: 60%))

  然后才想起来线上的免费额度没有领取，导致无法正常调用。这个问题在实验文档中比较容易被忽略掉。

  实名认证并领取免费资源后，等待片刻即可使用。

  #figure(image("assets/2024-08-26-14-48-07.png", width: 60%))
]

#speci_block[实验总结][
  本次实验通过一个垃圾分类小程序的实例进一步巩固了对 API 调用的理解，同时也学习了微信小程序云开发的一些基础知识，比如云函数、云数据库等。整体还算是比较顺利的，希望可以将云开发的知识在个人项目里用好！
]