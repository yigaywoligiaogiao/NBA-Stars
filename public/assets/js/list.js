if(getUrlParams("id")){
    $.ajax({
        type:"get",
        url:"/posts/category/"+getUrlParams("id"),
        success:function(res){
            console.log(res);
            var html = template("cgsContentPtl",{res:res});
            $(".new").html(html);
        }

    })




}
