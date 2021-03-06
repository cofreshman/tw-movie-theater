[思沃影院](https://github.com/cofreshman/tw-movie-theater)
# 开发记录

| 时间 | 所做工作 | 遇到的问题 | 解决方案 |
| - | - | - | - |
| 4月25日| 项目启动 | 只是初步规划，并无具体的思路 | 走一步算一步 |
| 4月26日| 完成page02.html | 感觉页面1和页面2可以公用的部分有很多，没有兼容性设置考虑 | 先这样吧，用谷歌浏览器打开能看就行(~_~;) |
| 4月27日| 完成page01.html | 忘记给分类标签留触发操作了 | 做业务逻辑的时候再加 |
| 4月30日| 实现page02.html的业务逻辑 | 没有使用测试驱动开发 | 当你连作出业务逻辑的实现都存在问题的时候，这导致开发者对于项目开发本身无法理解清晰，此时测试本身已经无足轻重了 |
| 5月1日上午| 1.尝试重构API请求函数 | 1.当封装成一个类时，跨域请求问题重新出现;<br>2.使用LocalStorage进行数据存储;<br> | 所有我能想到的重构方法都试了一遍，但是失败了，这里简要记录一下问题：同一个页面无法进行1次以上的JSNOP跨域请求？就目前来看，处理现在采用的这中方法，我还没有找到任何其他的方案，英语请求的返回json值被封装在了一个具有**全局作用域的callback函数**里面，一旦这个函数重名就会发生变量覆盖问题，所以导致无法进行函数复用，需要多次声明不同名字的callback函数 |
| 5月1日下午| 完成page02.html开发工作 | 有些细节的地方需要对输入进行为空判定 | 并不打算进行优化栏，因为这类工作繁琐且无技术含量 |

目前已知的问题就是：
1. 页面1的图片封面不是固定大小
2. 评论有可能没有
3. 有时候可能无法获取图片，没有提示
4. 项目的文件系统结构还是有点问题，所有的函数都写在同一个js文件夹，一点也不适合后期的维护，更重要的是存在数据泄漏问题(这一点瞎说的)

# 文件结构
- data:csv数据
- demand:目标要求
    - page01:主页
    - page02:电影详情页
    - protorype.svg:网站原型页
    - target.md:目标要求
    - user-stories.md:用户故事
- img:page02设计过程中用到的静态图片
- prompt:学习文件
    - doubanAPI.md:豆瓣电影API调用方法
- referPage:参考网页，用于学习业务逻辑执行
    - todoindex.html
    - todo.css
    - todo.js
- SHOW:显示结果
- src:开发文件夹
    - CSS：CSS文件夹
        + common:公共部分设计
        + content:内容主体设计
        + navbar:导航栏设计
    - HTML：page文件夹
        - page01.html:豆瓣扒的主页html仅供参考
        - page02.html:豆瓣扒的电影详情页html仅供参考
    - JS：JS文件夹
- README.md:开发记录

# 任务安排
各阶段更新详细内容
### 第一阶段：4月25日-4月27日，开发页面，包含HTML+CSS文件开发 
- 任务安排
    - page01：陈华祯负责
    - page02：周木根负责
- 任务要求
    - 开发网页样式基本符合目标page
    - 网页中的相关图片、存在链接的组件、文字等自行设定
    - 页面给人舒服即可

### 第二阶段：4月27日(星期六)晚，碰头总结，并规划下一步开发

### 第三阶段：4月28日-5月5日，实现业务逻辑，包含API调用解析和功能实现
*鉴于期间5月1日-5月4日为五一假期，为了响应广大程序员要求，我们不加班，这是不可能的！抽时间实现基本业务逻辑*

### 第四阶段：5月5日(星期日)晚，碰头总结，提交作业

# 实践规划
- 第一阶段使用MVVM开发模式：先开发HTML和CSS进行基本视图VIEW开发
- 第二阶段实现业务逻辑：开发JS实现VIEWMODLE，调用解析API实现MODLE

# 参考链接

1. [CSS布局](https://www.yuque.com/fe9/basic/pdrpr8)
2. [MVVM开发模式](https://www.yuque.com/fe9/basic/ag975a)
3. [豆瓣API调用之一](./prompt/doubanAPI.md):已存放在prompt文件夹下
4. [豆瓣API调用之二](https://blog.csdn.net/hlx20080808/article/details/83274513)
5. [业务逻辑参考网页](http://www.todolist.cn/):已下载在referPage文件夹下
6. [数据解析模式参考](https://github.com/tws-practice/tw-movie-theater/blob/master/movies.csv)
7. [别人的开发仓库](https://github.com/tws-practice/tw-movie-theater/network/members)
8. [前端九部：前端入门手册](https://www.yuque.com/fe9/basic)
9. [Devdocs: 快速API文档搜索工具](https://www.yuque.com/fe9/basic/devdocs)
10. [Devdocs网页版](https://devdocs.io/)
11. [Devdocs桌面版](https://github.com/egoist/devdocs-desktop/releases)
12. [JSON在线美化工具](http://jsonviewer.stack.hu/)

