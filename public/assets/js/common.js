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

})

