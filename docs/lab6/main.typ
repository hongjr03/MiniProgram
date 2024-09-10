#import "template.typ": *
#import "@preview/tablex:0.0.8": tablex, cellx, rowspanx, colspanx, vlinex, hlinex
#import "@preview/cetz:0.2.2"

#let title = "实验6：推箱子游戏"
#let author = "洪佳荣"
#let course_id = "移动软件开发"
#let instructor = "高峰老师"
#let semester = "2024夏季"
#let due_time = "2024年9月3日"
#let id = "22070001035"

#show: assignment_class.with(title, author, course_id, instructor, semester, due_time, id)

// #show figure.caption: it => [
//   #set text(size: 9pt)
//   // #v(-1.5em)
//   #it
// ]

*源代码*：#link("https://github.com/hongjr03/MiniProgram")\
*博客*：#link("https://www.jrhim.com/p/2024a/mini-program-6")

= 实验目的
<实验目的>

1. 综合所学知识创建完整的推箱子游戏；
2. 熟练掌握 \<canvas> 和绘图 API。

= 实验步骤

== 准备工作

#prob[下载需要的素材][
  按照老师的要求，下载实验所需的素材，#link("https://gaopursuit.oss-cn-beijing.aliyuncs.com/course/mobileDev/boxgame_images.zip")[下载地址]。
]

#prob[项目创建和初始化][
  项目创建直接基于第一次实验的空白小程序继续开发。复制项目后，将素材放到项目的对应目录下。

  根据项目的功能需求，需要分别创建首页和游戏页，所以在 pages 目录下创建对应的文件夹。目录结构如下：

  ```
  .
  ├─images
  │  └─icons
  ├─pages
  │  ├─game
  │  └─index
  └─utils
  ```
]

== 视图设计

#prob[导航栏设计][
  在 app.json 中修改导航栏的文字和颜色。

  ```json
  "window":{
    "navigationBarBackgroundColor": "#E64340",
    "navigationBarTitleText": "推箱子游戏",
    "navigationBarTextStyle":"white"
  },
  ```
]

#prob[页面设计][
  对于首页，页面上半部分是标题，显示“游戏选关”；下半部分展示已经有的四个关卡。

  ```html
  <view class="container">
    <view class="title">游戏选关</view>
    <view class="levelBox">
      <view class="box" wx:for="{{levels}}" wx:key="index" bindtap="chooseLevel" data-level="{{index}}">
        <image src="/images/level{{item}}.png" />
        <text>第{{index+1}}关</text>
      </view>
    </view>
  </view>
  ```

  这里使用循环的方式读取 levels 数组，然后显示每个关卡的图片和文字。levels 数组存着每个关卡的编号，在这里就是 `01`, `02`, `03`, `04`。然后从外部读取对应的图片，显示在页面上。

  要让四个关卡呈 2*2 的排列，可以使用 flex 布局，设置每个关卡的宽度为 50%。

  ```css
  .levelBox {
    width: 100%;
  }

  .box {
    width: 50%;
    float: left;
    margin: 20rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  image {
    width: 300rpx;
    height: 300rpx;
  }
  ```

  对于关卡游玩界面，上面显示当前关卡的标题，中间是游戏画布，下面是操作按钮。游戏画布使用 canvas 绘制，操作按钮使用 button 组件。

  ```html
  <view class="container">

    <view class="title">第{{level}}关</view>

    <canvas canvas-id="myCanvas"></canvas>

    <view class="btnBox">
      <button type="warn" bindtap="up">↑</button>
      <view>
        <button type="warn" bindtap="left">←</button>
        <button type="warn" bindtap="down">↓</button>
        <button type="warn" bindtap="right">→</button>
      </view>
    </view>

    <button type="warn" bindtap="restartGame">重新开始</button>
  </view>
  ```

  这里的按钮使用了 button 组件，分别绑定了四个方向的移动函数和重新开始函数。游戏画布使用 canvas 绘制，需要设置 canvas-id，以便在 JavaScript 中获取到这个 canvas。

  ```css
  canvas {
    border: 1rpx solid;
    width: 320px;
    height: 320px;
  }

  .btnBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btnBox view {
    display: flex;
    flex-direction: row;
  }

  .btnBox button {
    width: 90rpx;
    height: 90rpx;
  }

  button {
    margin: 10rpx;
  }
  ```

  效果如下：

  #align(center, grid(columns: (30%,) * 2)[
    #figure(image("assets/2024-09-03-10-40-22.png"))
  ][
    #figure(image("assets/2024-09-03-10-40-11.png"))
  ])
]

== 逻辑实现

#prob[公共逻辑][
  地图使用矩阵存储，用 1 代表墙、2 代表路、3 为终点、4 为箱子、5 为人物、0 为墙的外围。在 common.js 中定义地图和关卡的数据。

  使用 module.exports 对外暴露接口，在游戏的 JS 文件中使用 require 引入。

  #figure(image("assets/2024-09-03-10-42-20.png", width: 60%))
]

#prob[首页逻辑][
  对于首页，只需要展示关卡列表和点击跳转。展示关卡列表的逻辑和前面的页面设计中一样，使用循环遍历 levels 数组，然后显示每个关卡的图片和文字。

  点击跳转只需要对每一个 box 添加一个 bindtap 事件，然后在事件处理函数中获取到关卡的编号，然后跳转到对应的关卡页面。

  ```html
  <view class="box" wx:for="{{levels}}" wx:key="index" bindtap="chooseLevel" data-level="{{index}}">
    <image src="/images/level{{item}}.png" />
    <text>第{{index+1}}关</text>
  </view>
  ```

  这样在点击这个元素时，就可以从 dataset 中获取到关卡的编号，然后跳转到对应的关卡页面。

  ```js
  chooseLevel: function (e) {
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level=' + level
    })
  },
  ```

  使用参数 level 传递关卡的编号，然后在游戏页面中获取这个参数。
]

#prob[游戏页逻辑][


  在进入游戏页时，需要获取到关卡的编号，然后根据编号获取到对应的地图数据。在 onLoad 函数中获取参数 level，然后根据这个参数获取到地图数据。

  ```js
  onLoad(options) {
    let level = options.level
    this.setData({
      level: parseInt(level) + 1
    })

    this.ctx = wx.createCanvasContext('myCanvas')

    this.initMap(level)

    this.drawCanvas()
  },
  ```

  游戏页的逻辑比较复杂，需要绘制地图、人物、箱子等元素，然后根据用户的操作来移动人物和箱子。对于游戏地图而言，可以分为地图、箱子两层，小鸟在最顶层（或者也可以理解成跟箱子同一层，毕竟小鸟不能跟箱子重合）。在游戏开始时，需要初始化地图，然后绘制地图。

  初始化 map 和 box 矩阵均为 8*8 的空白二维数组，然后从 common.js 中获取到对应的地图数据，填充到 map 矩阵和 box 矩阵中。

  ```js
  initMap: function (level) {
    let mapData = data.maps[level];
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        box[i][j] = 0;
        map[i][j] = mapData[i][j];

        if (mapData[i][j] == 4) {
          box[i][j] = 4;
          map[i][j] = 2;
        } else if (mapData[i][j] == 5) {
          map[i][j] = 2;
          row = i;
          col = j;
        }
      }
    }
  },
  ```

  绘制时只需要从下到上绘制地图、箱子和人物即可。

  ```js
  drawCanvas: function () {
    let ctx = this.ctx
    ctx.clearRect(0, 0, 320, 320)
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        let img = 'ice'
        if (map[i][j] == 1) {
          img = 'stone'
        } else if (map[i][j] == 3) {
          img = 'pig'
        }

        ctx.drawImage('/images/icons/' + img + '.png', j * w, i * w, w, w)

        if (box[i][j] == 4) {
          ctx.drawImage('/images/icons/box.png', j * w, i * w, w, w)
        }
      }
    }
    ctx.drawImage('/images/icons/bird.png', col * w, row * w, w, w)
    ctx.draw()
  },
  ```

  这样就实现了地图的绘制。

  而对于方向键的操作，只需要在对应的函数中判断人物的移动方向，然后判断是否可以移动，如果可以移动就移动人物和箱子。4 个 button 绑定了 4 个函数，分别对应上下左右的移动。

  ```js
  up: function () {
    if (row > 0) {
      if (map[row - 1][col] != 1 && box[row - 1][col] != 4) {
        row = row - 1
      } else if (box[row - 1][col] == 4) {
        if (row - 1 > 0) {
          if (map[row - 2][col] != 1 && box[row - 2][col] != 4) {
            box[row - 2][col] = 4
            box[row - 1][col] = 0
            row = row - 1
          }
        }
      }
      this.drawCanvas()
      this.checkWin()
    }
  },

  // 其他方向键的操作类似
  ```

  依次判断是否碰到边界、墙、箱子等，然后移动人物和箱子，最后判断是否胜利。如何判断胜利很简单，只需要判断箱子是否全部到达终点即可。

  ```js
  isWin: function () {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (box[i][j] == 4 && map[i][j] != 3) {
          return false
        }
      }
    }
    return true
  }

  checkWin: function () {
    if (this.isWin()) {
      wx.showModal({
        title: '恭喜',
        content: '游戏成功！',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            const level = (this.data.level);
            if (level < 4) {
              wx.navigateTo({
                url: '../game/game?level=' + (level),
              })
            } else {
              wx.showModal({
                title: '恭喜',
                content: '游戏通关！',
                showCancel: false
              })
            }
          }
        }
      });

    }
  },
  ```

  在文档中只是简单提示显示成功，在这里我修改成如果成功且存在下一关，则跳转到下一关，否则显示通关提示。

  最后是重新开始的逻辑，其实跟初始化类似，只需要重新初始化地图和箱子即可。

  ```js
  restartGame: function () {
    this.initMap(this.data.level - 1)
    this.drawCanvas()
  },
  ```
]

= 程序运行结果
<程序运行结果>

#grid(columns: (1fr,) * 6)[
  #image("assets/2024-09-03-10-59-49.png")
][
  #image("assets/2024-09-03-10-59-56.png")
][
  #image("assets/2024-09-03-11-00-05.png")
][
  #image("assets/2024-09-03-11-05-16.png")
][
  #image("assets/2024-09-03-11-05-22.png")
][
  #image("assets/2024-09-03-11-05-33.png")
]

= 问题总结与体会
<问题总结与体会>

#cqa[过关时只提示 Modal 而没有额外行为不合理。][

  查看代码后发现，原来的代码里

  ```js
  checkWin: function() {
    if (this.isWin()) {
      wx.showModal({
        title: '恭喜',
        content: '游戏成功！',
        showCancel: false
      });
    }
  }
  ```

  只是显示了一个确定按钮的 Modal，没有其他行为。我修改成了如果成功且存在下一关，则跳转到下一关，否则显示通关提示。

  ```js
  checkWin: function () {
    if (this.isWin()) {
      wx.showModal({
        title: '恭喜',
        content: '游戏成功！',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) {
            const level = (this.data.level);
            if (level < 4) {
              wx.navigateTo({
                url: '../game/game?level=' + (level),
              })
            } else {
              wx.showModal({
                title: '恭喜',
                content: '游戏通关！',
                showCancel: false
              })
            }
          }
        }
      });

    }
  }
  ```

  这样就合理得多了！
  
]

#speci_block[实验总结][
  通过这次实验，我学会了使用 canvas 绘制游戏界面，实现了推箱子游戏的逻辑。这个实验代码很完善，整体来说还是很容易的。但我发现 canvas 的绘图 API 还是无法实现一些复杂的效果，因此在个人项目上使用 canvas 的想法可能需要重新考虑（（（
]
