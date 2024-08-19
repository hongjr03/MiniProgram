#import "template.typ": *
#import "@preview/tablex:0.0.8": tablex, cellx, rowspanx, colspanx, vlinex, hlinex
#import "@preview/cetz:0.2.2"

#let title = "实验 1：第一个微信小程序"
#let author = "洪佳荣"
#let course_id = "移动软件开发"
#let instructor = "高峰老师"
#let semester = "2024夏季"
#let due_time = "2024年8月19日"
#let id = "22070001035"
#let source_code_link = "123"
#let blog_link = "123"

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id, source_code_link, blog_link)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

= 实验目的
<实验目的>

1. 学习使用快速启动模板创建小程序的方法；
2. 学习不使用模板手动创建小程序的方法。

= 实验步骤

#prob[开发前准备][
  按照要求，配置好小程序信息和开发环境。

  #grid(columns: (1.5fr, 1fr))[
    #figure(
      image("assets/2024-08-19-18-50-21.png"),
    )
  ][
    #figure(
      image("assets/2024-08-19-18-44-29.png"),
    )
  ]

  这里使用最新的稳定版微信开发者工具，版本号为1.06.2407110。
]

#prob[使用快速启动模板创建小程序][

  打开微信开发者工具，选择小程序项目，此时可以选择项目的目录、指定项目名称、AppID、项目描述等信息。

  #figure(
    image("assets/2024-08-19-18-49-51.png", width: 60%),
  )

  将一系列信息填写完毕后，开发者工具会默认选择一个模板，点击创建即可。

  #figure(
    image("assets/2024-08-19-18-57-35.png", width: 80%),
  )

  和实验说明中一致，页面的左侧显示的是手机预览效果图，右侧类似于浏览器的开发者工具，可以查看页面的各种信息。可以通过鼠标模拟手机的触摸操作来查看页面的效果。

  点击顶部菜单的真机调试，开发者工具会自动编译对应真机系统平台的小程序代码，然后会弹出一个二维码，用手机微信扫描这个二维码，即可在手机上看到小程序的效果。

  #figure(
    image("assets/2024-08-19-19-00-20.png", width: 80%),
  )

  在手机上查看小程序的同时，电脑端的开发者工具也会自动弹出一个真机调试的窗口，可以查看手机上的小程序的调试信息，如下图所示。

  #grid(columns: (1fr, 2.6fr), column-gutter: 1em)[
    #figure(
      image("assets/2024-08-19-19-03-19.png"),
    )
  ][
    #figure(
      image("assets/2024-08-19-19-02-17.png"),
    )
  ]
]

#prob[手动创建小程序][

  第一步和使用模板创建小程序的步骤类似，如下图左侧所示，填写好小程序的基本信息后，点击创建即可。为了保持和实验文档的一致，这里选择不使用云服务并使用 JS-基础模板。



  #grid(columns: (4fr, 1fr), column-gutter: 1em)[
    #figure(
      image("assets/2024-08-19-19-19-38.png")
    )
  ][
    #figure(
      image("assets/2024-08-19-19-20-44.png")
    )
  ]

  查看右侧的文件结构，可以看到一个简单的小程序的目录结构，如上图右侧所示。

  接下来，按照要求：

  + 将 app.json 文件内 pages 属性中的 `pages/logs/logs` 删除；
  + 删除 utils 文件夹；
  + 删除 pages 文件夹下的 logs 文件夹；
  + 清空 index.wxml 文件和 index.wxss 文件的内容；
  + 清空 index.js 文件的内容，然后自动补全 `Page({})`。
  + 清空 app.wxss 文件的内容；
  + 清空 app.js 文件的内容，然后自动补全 `App({})`。




]

= 程序运行结果

列出程序的最终运行结果及截图。

= 问题总结与体会

描述实验过程中所遇到的问题，以及是如何解决的。有哪些收获和体会，对于课程的安排有哪些建议。