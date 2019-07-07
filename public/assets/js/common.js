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

$.ajax({
    type:'get',
    url:"/users/"+userId,
    success:function(res){
      $(".avatar").attr("src",res.avatar)
        $(".name").text(res.nickName)

    }


})

