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

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

*源代码*：#link("https://github.com/hongjr03/MiniProgram")\
*博客*：#link("https://www.jrhim.com/p/2024a/mnp1")

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
      image("assets/2024-08-19-19-19-38.png"),
    )
  ][
    #figure(
      image("assets/2024-08-19-19-20-44.png"),
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

  以上部分修改记录见 #link("https://github.com/hongjr03/MiniProgram/commit/18a287fbfc5d4035c5b0de5895369ba8b6671052")[commit]。

  然后可以进行一系列视图设计：

  + 修改导航栏标题和背景颜色；
  + 在页面上添加微信头像、昵称和“点击获取头像和昵称”按钮；

  这部分修改记录见 #link("https://github.com/hongjr03/MiniProgram/commit/5d820fef103177dbea0c8701b14aed130cf02a99")[commit]。修改后的效果如下图所示：

  #figure(
    image("assets/2024-08-19-19-48-13.png", width: 80%),
  )

  进一步进行逻辑实现：

  + 点击“点击获取头像和昵称”按钮后，调用微信的 wx.getUserInfo 接口，获取用户的头像和昵称；\ 这一步操作的 Console 输出如下：#figure(image("assets/2024-08-19-19-54-38.png", width: 80%))\ 表面看是正常的，其实这里并没有真正获取到头像和昵称。
  + 将获取到的头像和昵称显示在页面上。

  这部分修改记录见 #link("https://github.com/hongjr03/MiniProgram/commit/2089c4ce3dfe9e37a4ec93b690afd8ed8d871831")[commit]。此处我使用的 API 并不是 wx.getUserInfo，而是 wx.getUserProfile，原因见 #link(<问题总结与体会>)[问题总结与体会]。  
  修改后的效果如下图所示：

  #figure(image("assets/2024-08-19-20-18-38.png", width: 80%))

  真机调试运行结果见 #link(<程序运行结果>)[程序运行结果]。

]

= 程序运行结果
<程序运行结果>

#grid(columns: (1fr, 1fr, 1fr))[
  #image("assets/2024-08-19-20-22-46.png")
][
  #image("assets/2024-08-19-20-22-57.png")
][
  #image("assets/2024-08-19-20-23-03.png")
]

= 问题总结与体会
<问题总结与体会>

#cqa[使用快速启动模板创建小程序时，界面和文档中有所不同。][
  原因是我使用了“微信云开发”，当启用云开发时其默认环境会和非云开发的模板有所不同。所以在后面手动创建小程序时，我选择了不使用云服务的模板。
]

#cqa[按照群里同学提供的方案修改代码后，PC端开发者工具可以正常显示头像和昵称，但手机端无法显示。][
  原因是 wx.getUserInfo 接口在微信小程序的最新版本中已经被废弃，需要使用 wx.getUserProfile 接口。详细信息见 #link("https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html")[微信开发者社区]。

  而在最新的标准中，这个接口同样不推荐使用，而是使用#link("https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html")[头像昵称填写接口]，我猜这样可以避免用户的隐私泄露。

  这部分的修改见 #link("https://github.com/hongjr03/MiniProgram/commit/d642d9cfae72e41df0b534d113d56bc77f79a633")[commit]。
]

*总结*

这次实验中我第一次接触到小程序的开发，尽管遇到了一些问题吧（而且很遗憾没能线下上第一次课），但通过查阅资料和向同学请教总算是解决了。希望在接下来的课程中，能够更好地掌握这门技术！