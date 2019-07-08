if(getUrlParams("key")){
   $.ajax({
    type:"get",
    url:"/posts/search/"+getUrlParams("key"),
    success:function(res){
        console.log(res);
        var html = template("searchTpl",{res:res});
        $("#searchBox").html(html)
    }

   })


}