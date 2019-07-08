

template.defaults.imports.dateformat = dateformat;
//文章列表渲染和分页渲染
$.ajax({
  type: "get",
  url: "/posts",
  success: function (res) {
    var html = template("postsShowTpl", { res: res.records })
    $("#tb").html(html);
    var html2 = template("pageTpl", { res: res })
    $("#pageBox").html(html2)
  }
})
//分类选项框渲染
$.ajax({
  type: "get",
  url: "/categories",
  success: function (res) {
    var html = template("cgsTpl", { res: res })
    $("#cgsAll").html(html)
  }
})
//筛选文章表单提交
$("#filterForm").on("submit", function () {
  var formdata = $(this).serialize();
  $.ajax({
    type: "get",
    url: "/posts",
    data:formdata,
    success: function (res) {
       console.log(res.records);
       var html = template("postsShowTpl", { res: res.records})
       $("#tb").html(html);

    }
  })



  return false;
})
//文章分页功能
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page: page
    },
    success: function (res) {
      var html = template("postsShowTpl", { res: res.records })
      $("#tb").html(html);
      var html2 = template("pageTpl", { res: res })
      $("#pageBox").html(html2)
    }
  })


}
//文章删除功能
$("#tb").on("click", ".del", function () {
  var id = $(this).data("id");
  $.ajax({
    type:"delete",
    url:"/posts/"+id,
    success:function(){
        location.reload()
    }
  })
})

