[思沃影院](https://github.com/cofreshman/tw-movie-theater)
# 开发记录

| 时间 | 所做工作 | 遇到的问题 | 解决方案 |
| - | - | - | - |
| 4月25日| 项目启动 | 只是初步规划，并无具体的思路 | 走一步算一步 |
| 4月26日| 完成page02.html | 感觉页面1和页面2可以公用的部分有很多，没有兼容性设置考虑 | 先这样吧，用谷歌浏览器打开能看就行(~_~;) |
| 4月27日| 完成page01.html | 忘记给分类标签留触发操作了 | 做业务逻辑的时候再加 |

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

