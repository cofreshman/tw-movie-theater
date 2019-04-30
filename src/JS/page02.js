//page02.js基本框架介绍
//进入page02的可能触发只有一种情况，用户点击了电影海报或者电影标题
//而电影海报和电影标题存在两个地方：page01.html的电影展示区；page02.html的电影推荐区

//每一张电影海报或者标题下有一个对应的url，通过url可以传递id数据

//获取电影id所对应的电影信息数据
//由于API具有访问限制问题，所以请勿重复刷新，否则IP会被禁
function getJSONP(url, funcHandlerName) {
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

//电影详情页面初始化
function init (){
    
    // getData():获取数据e，e为返回的json值，传递给show函数
    getJSONP('https://api.douban.com/v2/movie/top250?start=0&count=8', (e) => {show(e)});
    // window.location.href="page02.html";
}

window.onload = function () {
  init();
}