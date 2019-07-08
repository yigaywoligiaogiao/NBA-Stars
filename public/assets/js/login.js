
    $("#loginBtn").on("click", function () {
      const email = $("#email").val();
      const password = $("#password").val();
      if (email.trim() == '' || password.trim() == '') {
        alert("请输入邮箱名或密码");
        return;
      }
      $.ajax({
        type: "post",
        url: "/login",
        data: {
          email: email,
          password: password
        },
        success: function (res) {
          if(res.role=='admin'){
            location.href = "/admin/index.html"
          }else {
            location.href = "/index.html"
          }
         

        },
        error: function (err) {
          alert("邮箱名或密码错误，请确认后登录")
          console.log("error:", err);
        }

      })


    })
 