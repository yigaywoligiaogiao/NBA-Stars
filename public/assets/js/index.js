
    //查询文章数量
    $.ajax({
      type:"get",
      url:"/posts/count",
      success:function(res){
        $("#postCount").text(res.postCount)
        $("#draftCount").text(res.draftCount)
      }
    })
    //查询分类数量
    $.ajax({
      type:"get",
      url:"/categories/count",
      success:function(res){
        $("#categoryCount").text(res.categoryCount)
      }
    })
    //查询评论数量
    $.ajax({
      type:"get",
      url:"/comments/count",
      success:function(res){
        $("#commentCount").text(res.commentCount)

      }
    })
  