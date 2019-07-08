//退出功能
$("#logoutBtn").on("click", function () {
    let isTrue = confirm("确认退出么？");
    if (isTrue) {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (res) {
                location.href = "login.html"
            }
        })
    }

});
//侧边栏用户头像名字信息获取
$.ajax({
    type:'get',
    url:"/users/"+userId,
    success:function(res){
      $(".avatar").attr("src",res.avatar)
        $(".name").text(res.nickName)
    }
})

//日期格式化函数
function dateformat(date) {
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
  }