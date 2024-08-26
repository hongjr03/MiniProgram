# 垃圾分类小程序部署步骤 

### 1.**[创建微信小程序](https://mp.weixin.qq.com/)**
![注册小程序](https://s1.ax1x.com/2022/05/15/Og5HtH.png)

### 2.**[注册百度智能云并实名认证, 创建一个图像识别应用, 记录应用API KEY 和 SECRET KEY, 创建资源之后记得领取免费资源](https://console.bce.baidu.com/ai/?_=&fromai=1#/ai/imagerecognition/app/create)**
![领取免费资源](https://s1.ax1x.com/2022/05/15/Og5W11.png)![API KEY](https://s1.ax1x.com/2022/05/15/Og5s7F.png)

### 3.**使用微信开发者工具创建一个云开发环境, 并复制环境ID**
![云开发](https://s1.ax1x.com/2022/05/15/Og57Ae.png)![环境ID](https://s1.ax1x.com/2022/05/15/Og55nK.png)

### 4.**进入微信开发者工具导入垃圾分类小程序项目, 注意我这里导入的是包含cloudfunctions,miniprogram,project.config.json的整个文件夹**
![导入项目](https://s1.ax1x.com/2022/05/15/Og5RpR.png)

### 5.**添加百度API KEY \ SECRET 和 小程序appid, 云环境ID**
![APPID](https://s1.ax1x.com/2022/05/15/Og56k4.png)
![云环境ID](https://s1.ax1x.com/2022/05/15/Og55nK.png)
![百度API KEY \ SECRET](https://s1.ax1x.com/2022/05/15/Og5ctJ.png)

### 6. **部署云函数**
* 点击`cloudfuntions`文件夹展开子文件夹
* 依次右键点击展开的子文件夹并点击弹出的`上传并部署(不上传node_modules)`
![上传云函数](https://s1.ax1x.com/2022/05/15/Og5hX6.png)

### 7. **部署云数据库**
* 点击小程序开发工具的`云开发`
* 点击`数据库`
* 创建集合`trash`, `type`
* 依次导入`trash.json`, `type.json`文件
![云开发按钮](https://s1.ax1x.com/2022/05/15/Og5o7D.png)
![数据库按钮](https://s1.ax1x.com/2022/05/15/Og5I0O.png)
![创建集合](https://s1.ax1x.com/2022/05/15/Og5r0U.png)
![导入文件1](https://s1.ax1x.com/2022/05/15/Og5DmT.png)
![导入文件2](https://s1.ax1x.com/2022/05/15/Og5gh9.png)

# 至此部署完成!

# 小程序访问体验
<!-- ![小程序]() -->
 <img src="./mini.jpg"   width="40%">

### 联系方式
> Vx: yiiyi8

> 邮箱: yii8@foxmail.com

### 打赏(如果需要数据集请联系我)
- 开发不易, 随意打赏

#### 微信
<img width="50%" src="./wx.jpg">


