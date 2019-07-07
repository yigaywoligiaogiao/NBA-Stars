

//添加分类功能
$("#cgsAddForm").on("submit", function () {
  var form = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/categories',
    data: form,
    success: function (res) {
      location.reload()
    },
    error: function (err) {
      console.log(err.responseText);
    }
  })
  return false;

})
//展示分类
$.ajax({
  type: "get",
  url: "/categories",
  success: function (res) {
    var html = template("cgsTpl", { res: res })
    $("#tb").html(html)

  }
})
//分类修改功能
$("#tb").on("click", ".edit", function () {
  var id = $(this).data("id");
  $.ajax({
    type: "get",
    url: "/categories/" + id,
    success: function (res) {
      var html = template("cgsMdyTpl",{res:res});
      console.log(html);
      $(".cgsOption").html(html);
    }
  })
})
//修改分类提交
$(".cgsOption").on("submit","#cgsMdyForm",function(){
    var id  =$(this).data("id");
    var data =  $(this).serialize();
    $.ajax({
    type: "put",
    url: "/categories/" + id,
    data:data,
    success: function (res) {
      location.reload()
    }
   
  })
  return false;
})
//删除分类
$("#tb").on("click",".del",function(){
     if(confirm("Are you sure delete this category?")){
      var id =  $(this).data("id");
      $.ajax({
        type:"delete",
        url:"/categories/"+id,
        success:function(){
          location.reload()
        }
      })
     }
})
//批量删除 
//coding.....
