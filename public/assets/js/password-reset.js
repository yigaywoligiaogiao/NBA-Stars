
//修改用户密码功能
$("#pwdModifyForm").on("submit",function(){
    var form = $(this).serialize();
    $.ajax({
      type:"put",
      url:"/users/password",
      data:form,
      success:function(){
        
        $.ajax({
        type: "post",
        url: "/logout",
        success: function () {
            location.href = "login.html"
        }
    })
      }


    })
    



  return false;
})
