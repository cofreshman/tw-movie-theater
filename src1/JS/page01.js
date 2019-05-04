var page = 0, total = 0;
var baseURL = 'https://api.douban.com/v2/movie/in_theaters?';

window.onload = function() {
    requestJson(baseURL+`start=0&count=6&callback=responseJson`);
    addSearchListener();
    addTagsListener();
    addItemsListener()
    addPageListener();
}

// 事件绑定
function addSearchListener() {
    var searchField = document.getElementById("search-bar").elements[0];   // 搜索框
    var searchButton = document.getElementById("search-bar").elements[1];  // 搜索按钮
    searchButton.addEventListener("click", function() {
        baseURL = `https://api.douban.com/v2/movie/search?q=${searchField.value}&`;
        requestJson(baseURL+`start=0&count=6&callback=responseJson`);
    }, false);
}
function addTagsListener() {
    var tags = document.getElementsByClassName("tags")[0].children;  // 所有类别
    for (let tag of tags) {
        tag.addEventListener("click", function() {
            baseURL = `https://api.douban.com/v2/movie/search?tag=${tag.innerText}&`;
            requestJson(baseURL+`start=0&count=6&callback=responseJson`);
        }, false);
    }
}
function addItemsListener() {
    var items = document.getElementsByClassName("item");  // 所有电影海报
    for (let item of items) {
        item.addEventListener("click", function(){
            window.location.href = 'page02.html?id='+item.getElementsByClassName("cover-wp")[0].getAttribute("data-id");
        }, false);
    }
}
function addPageListener() {
    var last = document.getElementById('lastpage');  // 当前页，上一页
    var next = document.getElementById("nextpage");  // 总页数，下一页
    last.addEventListener("click", function(){
        if (page > 0) {
            page -= 1;
            requestJson(baseURL+'start='+(page*6)+'&count=6&callback=responseJson');
        }
    }, false);
    next.addEventListener("click", function() {
        if (page < total-1) {
            page += 1;
            requestJson(baseURL+`start=${page*6}&count=6&callback=responseJson`);
        }
    }, false);
}


// 动态更新
// API
// 热映：https://api.douban.com/v2/movie/in_theaters?start=0&count=6
// 类别：https://api.douban.com/v2/movie/search?tag=喜剧&start=0&count=6
// 搜索：https://api.douban.com/v2/movie/search?q=流浪地球&start=0&count=6

function requestJson(url) {
    var js = document.createElement("script");  // append script tag
    js.setAttribute('src', url);
    document.body.appendChild(js);
}
function responseJson(json) {
    var movies = parseJson(json);
    attachMovies(movies);
    document.body.removeChild(document.body.lastChild);
}
function parseJson(json) {
    var movies = [];
    json.subjects.forEach(element => {
        movies.push({
            'id': element.id,
            'imagesrc': element.images.large,
            'alt': element.alt,
            'title': element.title,
            'rate': element.rating.average
        });
    });
    page = Math.floor(json.start / 6);
    total = Math.floor(json.total / 6);
    return movies;
}
function attachMovies(movies) {
    updatePageInfo();
    var items = document.getElementsByClassName("item");
    for (var index=0; index<movies.length; index++) {
        items[index].removeAttribute('style', 'display: none;');
        items[index].getElementsByClassName("cover-wp")[0].setAttribute('data-id', movies[index].id);  // id
        items[index].getElementsByTagName("img")[0].setAttribute('src', movies[index].imagesrc);  // image src
        items[index].getElementsByTagName("img")[0].setAttribute('alt', movies[index].alt);  // alt
        items[index].getElementsByClassName("title")[0].innerText = movies[index].title;  // title
        items[index].getElementsByClassName("rate")[0].innerText = movies[index].rate;  // rate
    }
    for (; index<6; index++) {  // 返回项目数不足一页时多余版块不显示
        items[index].setAttribute('style', 'display: none;');
    }
}
function updatePageInfo() {
    document.getElementById('page').innerText = page+1;
    document.getElementById("total").innerText = total;
}