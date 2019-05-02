window.onload = function() {
    var id = window.location.href.split("=")[1];  // get id
    requestJson(
        `https://api.douban.com/v2/movie/${id}?callback=responseDescription`
    );  // 电影描述
    requestJson(
        'https://api.douban.com/v2/movie/top250?start=0&count=4&callback=responseTop250'
    );  // Top250
    requestJson(
        `https://api.douban.com/v2/movie/subject/${id}/comments?start=0&count=5&apikey=0b2bdeda43b5688921839c8ecb20399b&callback=responseComment`
    );  // 评论
    addItemsListener();
    function addItemsListener() {
        var items = document.getElementsByClassName("item");  // 所有电影海报
        for (let item of items) {
            item.addEventListener("click", function(){
                window.location.href = 'page02.html?id='+item.getElementsByClassName("cover-wp")[0].getAttribute("data-id");
            }, false);
        }
    }
}

// 详情：https://api.douban.com/v2/movie/30170448&callback=response
// Top250：https://api.douban.com/v2/movie/top250?start=0&count=4
// 短评：https://api.douban.com/v2/movie/subject/:id/comments?start=xxx&count=xxx&apikey=xxxx

function requestJson(url) {
    var js = document.createElement("script");  // append script tag
    js.setAttribute('src', url);
    document.head.appendChild(js);
}
function responseDescription(json) {
    var infos = parseDescription(json);
    updatePage(infos);
    document.head.removeChild(document.head.lastChild);
}
function parseDescription(json) {
    infos = {
        'title_zhcn': json.alt_title.split('/')[0],  // title_zhcn
        'title_ori': json.title,  // title_ori
        'imgsrc': json.image,  // imgsrc
        'director': json.attrs.director,  // director: list
        'writer': json.attrs.writer,  // writer: list
        'cast': json.attrs.cast,  // cast: list
        'tags': json.tags,  // tags: list
        'country': json.attrs.country,  // country: list
        'language': json.attrs.language,  // language: list
        'pubdate': json.attrs.pubdate,  // pubdate: list
        'movie_duration': json.attrs.movie_duration,  // movie_duration: list
        'summary': json.summary  // summary
    };
    return infos;
}
function updatePage(infos) {
    document.title = infos.title_zhcn;
    document.getElementById('title').innerText = infos.title_zhcn+' '+infos.title_ori;
    document.getElementById('post').children[0].setAttribute('src', infos.imgsrc);
    document.getElementById('post').children[0].setAttribute('alt', infos.title_ori);
    
    document.getElementsByClassName("director")[0].innerText = infos.director.slice(0, 3).join(' / ');
    document.getElementsByClassName("scriptwriter")[0].innerText = infos.writer.slice(0, 3).join(' / ');
    document.getElementsByClassName("actor")[0].innerText = infos.cast.slice(0, 3).join(' / ');
    document.getElementsByClassName("genre")[0].innerText = infos.tags.reduce((acc, cur) => acc+' / '+cur.name, infos.tags[0].name);
    document.getElementsByClassName("country")[0].innerText = infos.country.slice(0, 3).join(' / ');
    document.getElementsByClassName("language")[0].innerText = infos.language.slice(0, 3).join(' / ');
    document.getElementsByClassName("release-date")[0].innerText = infos.pubdate.slice(0, 3).join(' / ');
    document.getElementsByClassName("duration")[0].innerText = infos.movie_duration.slice(0, 3).join(' / ');

    document.getElementsByClassName("movie-related-info")[0].innerText = infos.title_zhcn+"的剧情简介";
    document.getElementsByClassName("summary")[0].innerText = infos.summary;
}

// 评论区
function responseComment(json) {
    var comments = parseComment(json);
    updateComment(comments);
    document.head.removeChild(document.head.lastChild);
}
function parseComment(json) {
    var comments = [];
    json.comments.forEach(element => {
        comments.push({
            'name': element.author.name,
            'avatar': element.author.avatar,
            'time': element.created_at,
            'content': element.content
        });
    });
    return comments;
}
function updateComment(comments) {
    var items = document.getElementsByClassName('review-item');
    for (var index=0; index<comments.length; index++) {
        items[index].getElementsByClassName("review-user")[0].innerText = comments[index].name;  // name
        items[index].getElementsByClassName("review-date")[0].innerText = comments[index].time;  // time
        items[index].getElementsByTagName("img")[0].setAttribute('src', comments[index].avatar);  // image src
        items[index].getElementsByClassName("review-content")[0].innerText = comments[index].content;  // title
    }
    for (; index<5; index++) {  // 返回项目数不足5条时多余版块不显示
        items[index].setAttribute('style', 'display: none;');
    }
}

// top250 区域
function responseTop250(json) {
    var movies = parseTop250(json);
    attachMovies(movies);
    document.head.removeChild(document.head.lastChild);
}
function parseTop250(json) {
    var movies = [];
    json.subjects.forEach(element => {
        movies.push({
            'id': element.id,
            'imagesrc': element.images.large,
            'alt': element.alt,
            'title': element.title,
        });
    });
    return movies;
}
function attachMovies(movies) {
    var items = document.getElementsByClassName("item");
    for (var index=0; index<movies.length; index++) {
        items[index].getElementsByClassName("cover-wp")[0].setAttribute('data-id', movies[index].id);  // id
        items[index].getElementsByTagName("img")[0].setAttribute('src', movies[index].imagesrc);  // image src
        items[index].getElementsByTagName("img")[0].setAttribute('alt', movies[index].alt);  // alt
        items[index].getElementsByClassName("title")[0].innerText = movies[index].title;  // title
    }
}