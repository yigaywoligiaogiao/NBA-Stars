//导入日期格式化函数
template.defaults.imports.dateformat = function (date) {
  var d = new Date(date);
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + hour + ":" + min + ":" + sec
}
//获取url参数函数
function getUrlParams(name) {
  var urlParams = (location.search).slice(1).split("&");
  for (var v of urlParams) {
    if (v.split("=")[0] == name) {
      return v.split("=")[1];
    }
  }
  return;
};
//获取热门推荐
$.ajax({
  type: "get",
  url: "/posts/recommend",
  success: function (res) {
    var model = `
        {{each res}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="{{$value.title}}">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
        `;
    var html = template.render(model, { res: res })
    $("#recommendList").html(html)
  }

})
//获取随机推荐
$.ajax({
  type: "get",
  url: "/posts/random",
  success: function (res) {
    var strModel = `
    {{each res}}
    <li>
    <a href="detail.html?id={{$value._id}}">
      <p class="title">{{$value.title}}</p>
      <p class="reading">阅读({{$value.meta.views}})</p>
      <div class="pic">
        <img src="{{$value.thumbnail}}" alt="{{$value.title}}">
      </div>
    </a>
  </li>
  {{/each}}
    `;
    var html = template.render(strModel, { res: res })
    $(".random").html(html)
  }

})
//获取最新评论
$.ajax({
  type: "get",
  url: "/comments/lasted",
  success: function (res) {
    var strModel = `
    {{each res}}
    <li>
    <a href="detail.html?id={{$value.post}}">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="{{$value.author.nickName}}">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{($value.createAt).slice(0,-8).replace('T',' ')}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}
    `;
    var html = template.render(strModel, { res: res })
    $(".discuz").html(html)
  }
})
//导航数据显示
$.ajax({
  type: "get",
  url: "/categories",
  success: function (res) {
    var strModel = `
    {{each res}}
    <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
   {{/each}}
    `;
    var html = template.render(strModel, { res: res })
    $(".nav").html(html);
    $("#topNav").html(html);
  }

})
//根据关键字搜索文章
$(".search").on("submit", "form", function () {
  var key = $(this).serialize();
  location.href = "search.html?" + key;
  return false;
})