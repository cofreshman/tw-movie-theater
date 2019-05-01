//工具函数
//====================================================
//获取API信息
var responseHandler; // 定义一个全局作用域的函数
function getJSONP(url, funcHandlerName) {
  //获取电影id所对应的电影信息数据
  //由于API具有访问限制问题，所以请勿重复刷新，否则IP会被禁
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
        //将json数据解析出来，cb为包裹函数
        funcHandlerName(json)
    } finally {
      // 函数调用之后不管发生什么都要移除对应的标签，留着也没用
      script.parentNode.removeChild(script);
    }
  }

  script.setAttribute('src', url)
  document.body.appendChild(script);
}
//====================================================
//电影列表
function creatMovieItem(id, imageUrl, title, average) {
    var movieItem = `
<a href="./page02.html?id=${id}" class="item">
    <div data-id="${id}" class="cover-wp">
        <span class="pic"><img
                src="${imageUrl}"
                alt="${title}" x="movie:cover_x" y="8268">
        </span>
    </div>
    <p>
        <span class="title">${title}</span>
        <span class="rate">${average}</span>
    </p>
</a>
`;
    return movieItem;
}

function updateMovieList(ele) {
    var movieList = "";
    for(let item of ele.subjects)
    {
        movieList += creatMovieItem(item.id, item.images.large, item.title, item.rating.average);
    }
    document.getElementById("movie-list").innerHTML = movieList; 
}

//页面分析：
//当跳转到该页面时，进行页面初始化
//搜索栏和分类都具有触发操作
//电影封面和电影标题具有超链接，详情请看page02.html
function  getTitleData() {    
    //这一步强行设定了URL的形式如下：page02.html?id=26942674       
    var href = window.location.href;      //获取当前页面的URL
    var value = '';                       
  
    var reg = new RegExp('title=([^&]*)', 'g');      //使用正则表达式
    href.replace(reg, function($0, $1) {              //每一个匹配正则表达式的字符串都将调用该函数
      value = decodeURI($1);                      //$0:匹配的字符串
                                                  //$1:匹配字符串中的第一个参数，一个（），一个参数
                                                  //$2:匹配字符串中的第二参数
    });
    return value;
};

function init() {

    //给分类栏添加触发器
    var tags = document.getElementsByTagName("dd");
    console.log(tags);
    for(let tag of tags)
    {
        tag.onclick = function() {
            console.log("文是："+this.innerHTML);
            var tagUrl = "https://api.douban.com/v2/movie/search?tag=" + this.innerHTML + "&start=0&count=6";
            getJSONP(tagUrl, (a) => {updateMovieList(a)});
        }
    }

    var title = getTitleData();
    if(title == null)
    {
        var topUrl = "https://api.douban.com/v2/movie/top250?start=0&count=6";
        getJSONP03(topUrl, (c) => {updateMovieList(c)});
    } else {
        var titleUrl = "https://api.douban.com/v2/movie/search?q=" + title + "&start=0&count=6";
        getJSONP(titleUrl, (a) => {updateMovieList(a)});
    }
}

window.onload = function () {
    init();
    //初始化操作包括获取title数据
    //没有则加载原来的top50；否则调用电影检索API
    //有则执行搜索栏操作
}
//====================================================
//搜索栏触发事件
function searchAction () {
    //第一步生成跳转链接并传递数据
    var title = document.getElementById("inp-query").value;
      //下面少一个判定条件，如果输入为空格如何清除
    if(title == null || title == "")
    {
        alert("请输入搜索内容！！！");
        return false;
    }
    var titleUrl = "https://api.douban.com/v2/movie/search?q=" + title + "&start=0&count=6";
    getJSONP(titleUrl, (a) => {updateMovieList(a)});
};
//====================================================
//分类栏触发事件
// function ddAction () {
//     var tag = this.innerText;
//     console.log(this.innerText);
//     var tagUrl = "https://api.douban.com/v2/movie/search?tag=" + tag + "&start=0&count=6";
//     getJSONP(tagUrl, (a) => {updateMovieList(a)});
// };
//====================================================