
if (getUrlParams("id")) {
  $.ajax({
    type: 'get',
    url: '/posts/' + getUrlParams("id"),
    success: function (res) {
      console.log(res);
      var html = template("atlTpl", res)
      $(".article").html(html)
    }
  });

  //文章点赞
  $(".article").on("click", "#like", function () {
    var o = $(this)
    $.ajax({
      type: 'post',
      url: "/posts/fabulous/" + getUrlParams("id"),
      success: function (res) {
        o.text("赞:" + "(" + res.meta.likes + ")")

      }
    })


  })

}
var review;
//获取网站设置信息
$.ajax({
  type:"get",
  url:"/settings",
  success:function(res){
    review = res.review;
    if(res.comment==true){
      var html = template("commentTpl");
      $("#comment").html(html)
    }else {
      $("#comment").html("")
    }
    
  }
})
//提交文章评论
$("#comment").on("submit","form",function(){
    var content =$(this).find("textarea").val();
    var postId = getUrlParams("id");
    var state =0;
    if(review){
      state = 1
    };
    $.ajax({
      type:"post",
      url:"/comments",
      data:{
        content:content,
        post:postId,
        state:state,
        author:userId
      },
      success:function(res){
        alert("评论成功")
        location.reload();
      },
      error:function(err){
        alert("评论失败")
        console.log((JSON.parse(err.responseText)).message);
        
      }
    })
    
 
  return false;
})


