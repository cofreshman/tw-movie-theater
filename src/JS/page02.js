function  getIdData() {    
  //这一步强行设定了URL的形式如下：page02.html?id=26942674       
  var href = window.location.href;      //获取当前页面的URL
  var value = '';                       

  var reg = new RegExp('id=([^&]*)', 'g');      //使用正则表达式
  href.replace(reg, function($0, $1) {              //每一个匹配正则表达式的字符串都将调用该函数
    value = decodeURI($1);                      //$0:匹配的字符串
                                                //$1:匹配字符串中的第一个参数，一个（），一个参数
                                                //$2:匹配字符串中的第二参数
  });
  return value;
};

//设定idurl的全局基本部分
var idUrlBase = "https://api.douban.com/v2/movie/subject/";
var reviewSuffix = "/reviews?start=0&count=1&apikey=0b2bdeda43b5688921839c8ecb20399b";
var top250url = "https://api.douban.com/v2/movie/top250?start=0&count=4";
//获取API信息
var responseHandler01; // 定义一个全局作用域的函数
function getJSONP01(url, funcHandlerName) {
  //获取电影id所对应的电影信息数据
  //由于API具有访问限制问题，所以请勿重复刷新，否则IP会被禁
  if (url.indexOf('?') === -1) {
    url += '?callback=responseHandler01';
  } else {
    url += '&callback=responseHandler01';
  }

  // 创建script 标签
  var script = document.createElement('script');

  // 在函数内部实现包裹函数，因为要用到cb
  responseHandler01 = function(json) {
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

//获取API信息
var responseHandler02; // 定义一个全局作用域的函数
function getJSONP02(url, funcHandlerName) {
  //获取电影id所对应的电影信息数据
  //由于API具有访问限制问题，所以请勿重复刷新，否则IP会被禁
  if (url.indexOf('?') === -1) {
    url += '?callback=responseHandler02';
  } else {
    url += '&callback=responseHandler02';
  }

  // 创建script 标签
  var script = document.createElement('script');

  // 在函数内部实现包裹函数，因为要用到cb
  responseHandler02 = function(json) {
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

//获取API信息
var responseHandler03; // 定义一个全局作用域的函数
function getJSONP03(url, funcHandlerName) {
  //获取电影id所对应的电影信息数据
  //由于API具有访问限制问题，所以请勿重复刷新，否则IP会被禁
  if (url.indexOf('?') === -1) {
    url += '?callback=responseHandler03';
  } else {
    url += '&callback=responseHandler03';
  }

  // 创建script 标签
  var script = document.createElement('script');

  // 在函数内部实现包裹函数，因为要用到cb
  responseHandler03 = function(json) {
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

function getSpecPropoty(tagrtObject) {
  var specPropoty = [];
  for(let item of tagrtObject)
  {
    specPropoty.push(item.name);
  }

  return specPropoty;
}

function spreadArr(arr) {
  var arrayStr = "";
  for(let item of arr)
  {
    arrayStr = arrayStr + item + " / "; 
  }
  return arrayStr.substr(0, (arrayStr.length-1));
}

function createDetailsInfo(movieDetailsInfo) {
  //创建html组件对象
  var elementHtml = `
得分 : <span class="director">${movieDetailsInfo.score}</span>
<br> 
导演 : <span class="director">${spreadArr(movieDetailsInfo.directors)}</span>
<br>
主演 : <span class="actor">${spreadArr(movieDetailsInfo.casts)}</span>
<br>
类型 : <span class="genre">${spreadArr(movieDetailsInfo.genres)}</span>
<br>
上映年份 : <span class="year">${movieDetailsInfo.year}</span>
<br>
制片国家/地区 : <span class="country">${movieDetailsInfo.countries}</span>`;
  return elementHtml;
}

function updateBasicInfo(ele) {
  //导演列表、演员列表、电影得分、电影类型、电影制作年份、制片国家、电影简介
  var movieDetailsInfo = {};
  //创建一个函数获取对象数组的某一个属性值数组
  //获取电影得分
  movieDetailsInfo.score = ele.rating.average;
  //获取导演列表
  movieDetailsInfo.directors = getSpecPropoty(ele.directors);
  //获取演员列表
  movieDetailsInfo.casts = getSpecPropoty(ele.casts);
  //获取电影类别
  movieDetailsInfo.genres = ele.genres;
  //获取电影年份
  movieDetailsInfo.year = ele.year;
  //获取电影国家
  movieDetailsInfo.countries = ele.countries;
  
  //创建innerHTML对象的同时更新innerHTML
  document.getElementById("movie-title").innerText = ele.title;                                       //更新电影标题
  document.getElementById("movie-post").innerHTML = `<img src=${ele.images.large} alt=${ele.title}>`; //更新电影海报
  document.getElementById("movie-details").innerHTML = createDetailsInfo(movieDetailsInfo);              //更新电影基本信息
  document.getElementById("summary-content").innerText = ele.summary;                                 //更新电影简介
}

function updateReviewInfo(ele) {
  if(ele.reviews[0] != null)
  {
    var reviewInfoHtml = `
<span><img width="24" height="24" src=${ele.reviews[0].author.avatar}></span>
<span class="review-user">${ele.reviews[0].author.name}</span>
<span class="review-date">${ele.reviews[0].created_at}</span>`;
    
      document.getElementById("reviewer-info").innerHTML = reviewInfoHtml;                   //评论者信息
    
      var reviewContentHtml = `
<h3>${ele.reviews[0].title}</h3>
<div class="review-content">${ele.reviews[0].content}</div>`;
        document.getElementById("reviewer-content").innerHTML = reviewContentHtml; 
  } else {
    document.getElementById("reviewer-info").innerHTML = "无评论";
  }
}

function creatRecommendations(id, imgurl, title) {
  var Recommendation = `
<dl class="recommendation" data-id="${id}">
  <dt><a href="./page02.html?id=${id}"><img src=${imgurl} alt=${title}></a></dt>
  <dd><a href="./page02.html?id=${id}" class="">${title}</a></dd>
</dl>
`;

  return Recommendation;
}

function updateRecommendations(ele) {
  var recommendationsList = "";

  for(let item of ele.subjects)
  {
    recommendationsList += creatRecommendations(item.id, item.images.large, item.title);
  }

  document.getElementById("recommendations-list").innerHTML = recommendationsList;           //电影推荐
}

//电影详情页面初始化
function init (){
  //初始化电影基本信息
  var idData = getIdData();         //获取链接中ID
  //生成电影基本信息链接
  var idInfourl = idUrlBase + idData;   // https://api.douban.com/v2/movie/subject/26942674
  //使用URL访问API获取JSON数据，并将json数据用于创建movie-info和related-info:电影基本信息和电影简介
  getJSONP01(idInfourl, (a) => {updateBasicInfo(a)});

  //初始化电影评论，只加载一条信息
  //https://api.douban.com/v2/movie/subject/26942674/reviews?start=0&count=1&apikey=0b2bdeda43b5688921839c8ecb20399b
  var reviewInfoUrl = idUrlBase + idData + reviewSuffix;
  getJSONP02(reviewInfoUrl, (b) => {updateReviewInfo(b)});

  //获取电影推荐，只要图片、标题、ID
  //https://api.douban.com/v2/movie/top250?start=0&count=4
  getJSONP03(top250url, (c) => {updateRecommendations(c)});

}

window.onload = function () {
  init();
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
  window.location.assign("./page01.html?title=" + title);
};
