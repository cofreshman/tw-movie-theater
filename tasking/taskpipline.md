# Tasking
由于之前的tasking.md太长了，就拆分到这边吧！
## 一、Tasking 分析
根据触发的业务逻辑进行响应的函数抽象化操作

**0. 主页面加载**
- init()
  - 第一次启动时页面初始化
  - 无输入
  - 自动加载主页面top250的4条数据
+ getData()   //应该具有类型判断功能
  - 内置输入：top250URL
  - 使用API访问URL返回json：*调用API访问函数*
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{id, movie-imgurl, movie-title, average-rate}]     //输出的为数组，为减少请求时间问题，默认数组大小为3条
+ creatElement()
  - 输入：[object{id, movie-imgurl, movie-title, average-rate}]
  - 输出：elementString
+ update()
  - 输入:elementString
  - 改变电影显示区数据：document.getElementById(“movieShowOrigion”).innerHTML发生变化;  //不仅做到了去除还做到了更新

**1. 搜索栏**
- btnSearch()
  - 输入：keyword
  - getData()
  - creatElement()
  - update()
  - 输出：自动跳转到主页，电影展示区发生对应改变
+ getData()   //应该具有类型判断功能
  - 输入：keyword
  - 使用keyword组成URL
  - 使用API访问URL返回json：*调用API访问函数*
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{id, movie-imgurl, movie-title, average-rate}]     //输出的为数组，为减少请求时间问题，默认数组大小为3条
+ creatElement()
  - 输入：[object{id, movie-imgurl, movie-title, average-rate}]
  - 输出：elementString
+ update()
  - 输入:elementString
  - 改变电影显示区数据：document.getElementById(“movieShowOrigion”).innerHTML发生变化;  //不仅做到了去除还做到了更新

**2. 分类栏**
- tagAction()
  - 输入：tag
  - getData()
  - creatElement()
  - update()
  - 输出：电影展示区发生改变
+ getData()   //应该具有类型判断功能
  - 输入：tag
  - 使用tag组成URL
  - 使用API访问URL返回json
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{id, movie-imgurl, movie-title, average-rate}]     //输出的为数组，为减少请求时间问题，默认数组大小为3条
+ creatElement()
  - 输入：[object{id, movie-imgurl, movie-title, average-rate}]
  - 输出：elementString
+ update()
  - 输入:elementString
  - 改变电影显示区数据：document.getElementById(“movieShowOrigion”).innerHTML发生变化;  //不仅做到了去除还做到了更新

**3. 图片和图片标题**
- imgAction()
  - 输入：id
  - getData()
  - creatElement()
  - update()
  - 输出：进入电影详情页面
+ getInfos()   //获取电影的详细信息
  - 输入：id
  - 使用id组成URL
  - 使用API访问URL返回json
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{title, movie-imgurl, directors, casts, rate, year, countries, genres, summary}]
改行的数据可能需要进行一些改动：
电影名、电影标题、导演列表、演员列表、电影评分、电影年份、制片国家、电眼类型、电影简介、电影上映日期也可以获得通过电影评论
+ getReviews()   //获取电影的长篇评论，目前只要一条评论
  - 输入：id
  - 使用id组成URL
  - 使用API访问URL返回json
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{userName, userImg, userTitle, content}]
评论者头像、评论者昵称、评论标题、评论内容
+ getRecommandations()   //获取电影的推荐
  - 内置输入：top250URL
  - 使用API访问URL返回json：*调用API访问函数*
  - 从json数据中得到目标数据，并对目标值进行unicode转码为中文
  - 输出：[object{id, movie-imgurl, movie-title, average-rate}]     //输出的为数组，为减少请求时间问题，默认数组大小为4条
+ creatElement()
  - 输入：上述函数获得所有数据
  - 输出：elementString
+ update()
  - 输入:elementString
  - 改变电影显示区数据：document.getElementById(“movieShowOrigion”).innerHTML发生变化;  //不仅做到了去除还做到了更新



## 二、Tasking Pileline
- [跨域API调用脚本](https://www.jianshu.com/p/1f32c9a96064)
```
var responseHandler; // 定义一个全局作用域的函数

function getJSONP(url, cb) {
  if (url.indexOf('?') === -1) {
    url += '?callback=responseHandler';
  } else {
    url += '&callback=responseHandler';
  }

  // 创建script 标签
  var script = document.createElement('script');

  // 在函数内部实现包裹函数，因为要用到cb
  responseHandler = function(json) {
    try {
      cb(json)
    } finally {
      // 函数调用之后不管发生什么都要移除对应的标签，留着也没用
      script.parentNode.removeChild(script);
    }
  }

  script.setAttribute('src', url)
  document.body.appendChild(script);
}

getJSONP('https://api.douban.com/v2/movie/in_theaters?city=北京&start=30&count=25', (e) => {console.log(e)})
```

你写这两个函数，实现这个功能：点一下搜索按钮，电影显示去发生变化这一功能
id, movie-imgurl, movie-title, average-rate
id=38743105
movie-imgurl="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2508925590.webp"
movie-title="神秘巨星"
average-rate=7.7
+ creatElement()
  - 输入：[object{id, movie-imgurl, movie-title, average-rate}]
  - 输出：elementString
+ update()
  - 输入:elementString
  - 改变电影显示区数据：document.getElementById(“movieShowOrigion”).innerHTML发生变化;  //不仅做到了去除还做到了更新