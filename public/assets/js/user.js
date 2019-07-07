
function serializeObj(obj) {
    var newObj = {};
    $.each(obj.serializeArray(), function (index, value) {
        newObj[value.name] = value.value
    });
    return newObj;
}
//头像选择
$(".editUser").on("change", "#avatar", function () {
    var formA = new FormData();
    formA.append("avatar", this.files[0])

    $.ajax({
        type: "post",
        url: "/upload",
        data: formA,
        //不要解析请求参数
        processData: false,
        //不要设置请求参数类型
        contentType: false,
        success: function (res) {
            $("#preview").attr("src", res[0].avatar)
            $("#hiddenIpt").val(res[0].avatar)
        },
        error: function (err) {
            console.log("error", err);

        }
    })

})
//提交表单
$("#addBtn").on("click", function () {
    var data = serializeObj($("#form"));
    $.ajax({
        type: "post",
        url: "/users",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (res) {
            console.log(res);
            alert("用户添加成功")
            location.reload();
        },
        error: function (xhr) {
            const errInfo = JSON.parse(xhr.responseText)
            $("#err").show().html(' <strong>错误！</strong>' + errInfo.message)
            console.log(xhr.responseText);
        }
    })
    return false;
});
//渲染用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (res) {

        var html = template("tplUser", { res: res });
        $("#tb").html(html);
    }
})
//用户编辑修改
$("#tb").on("click", ".edit", function () {
    const id = $(this).data("id");
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            var html = template("tplEdit", { response: response });
            $(".editUser").html(html);
            //将图片地址保存在隐藏域中
            $("#hiddenIpt").val(response.avatar)
            //隐藏错误提示信息
            $("#err").hide()
        }
    })
})
//提交修改内容
$(".editUser").on("submit", "#formModify", function () {
    var id = $(this).data("id")
    var formdata = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formdata,
        success: function (res) {
            location.reload()

        }

    })
    return false;
});
//删除用户
$("#tb").on("click", ".del", function () {
    if (confirm("确认删除该用户么？")) {
        const id = $(this).data("id");
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function () {
                location.reload();
            }
        })
    }

})
// 批量删除用户
$("#selectAll").on("click", function () {
    var status = $(this).prop("checked");
    $("#tb").find('input').prop('checked', status);
})
$("#tb").on("change", ".select", function () {
    var ipts = $("#tb").find('input');
    if (ipts.length == ipts.filter(":checked").length) {
        $("#selectAll").prop("checked", true)
    } else {
        $("#selectAll").prop("checked", false)
    };
});
$(".showUser").on("change", "input", function () {
    if ($(".showUser").find("input").filter(":checked").length != 0) {
        $(".delMany").show()
    } else {
        $(".delMany").hide()
    }
})
$(".showUser").on("click", ".delMany", function () {
    var ids = [];
    var iptsSel = $(".showUser").find("input").filter(":checked");
    $.each(iptsSel, function (index, value) {
        ids.push($(value).data("id"))
    });
    if (confirm("确认批量删除么？")) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function () {
                location.reload();
            }
        })
    }
})
