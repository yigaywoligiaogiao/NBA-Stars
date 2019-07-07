
// var d = new Date("2019-07-07T00:50:16.760Z");
template.defaults.imports.dateformat = function (date) {
  newDate = date.slice(0, -5).replace("T", " ")

  return newDate
}

//评论列表展示
// $.ajax({
//   type: "get",
//   url: "/comments",
//   success: function (res) {
//     console.log(res);
//     var html = template("cmtTpl", res);
//     $("#tb").html(html)
//     var html2 = template("cmtPageTpl", res)
//     $("#cmtPage").html(html2)
//   }

// })

function changePage(page) {
  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      page: page
    },
    success: function (res) {
      var html = template("cmtTpl", res);
      $("#tb").html(html)
      var html2 = template("cmtPageTpl", res)
      $("#cmtPage").html(html2)
    }
  })
}
changePage(1)
//改变评论状态
$("#tb").on("click", ".changeState", function () {
  var id = $(this).data("id");
  var state = $(this).data("state");
  $.ajax({
    type: "put",
    url: "/comments/" + id,
    data: { state: state == 0 ? 1 : 0 },
    success: function () {
      location.reload();
    }


  })

})
//删除评论
$("#tb").on("click", ".del", function () {

  if (confirm("确认删除该评论么")) {
    var id = $(this).data("id");
    $.ajax({
      type: 'delete',
      url: "/comments/" + id,
      success: function () {
        location.reload()
      }
    })
  }


})
