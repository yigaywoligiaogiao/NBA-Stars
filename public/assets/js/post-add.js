
//展示分类列表
$.ajax({
  type: "get",
  url: "/categories",
  success: function (res) {
    window.response1 = res;
    var html = template("cgsShowTpl", { res: res })
    $("#category").html(html)
  }
})
//选择封面上传
$("#feature").on("change", function () {
  var formdata = new FormData();
  formdata.append("cover", this.files[0]);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formdata,
    processData: false,
    contentType: false,
    success: function (res) {
      $("#thumbnail").val(res[0].cover)
    },
    error: function (err) {
      console.log(err);
    }
  })


})
//创建文章
$("#postAddForm").on("submit", function () {
  var formdata = $(this).serialize()
  $.ajax({
    type: "post",
    url: "/posts",
    data: formdata,
    success: function (res) {
      location.href = "posts.html"
    }
  })
  return false;
})
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
//文章修改渲染
if (getUrlParams("id") != undefined) {
  $.ajax({
    type: "put",
    url: "/posts/" + getUrlParams("id"),
    success: function (res) {
          res.cgsAll = window.response1;
          console.log(res);
          var html = template("mdyFormTpl", res)
          $("#postAddBox").html(html)
    }
  })


}
//提交文章修改
$("#postAddBox").on("submit","#postMdyForm",function(){
  var formdata = $(this).serialize();
  var id = $(this).data("id")
  $.ajax({
    type: "put",
    url: "/posts/"+id,
    data: formdata,
    success: function (res) {
      location.href = "posts.html"
    }
  })
  
  return false;
})



