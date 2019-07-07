
//上传图片保存图片地址到隐藏域
  $("#image").on("change",function(){
    var formdata  = new FormData();
    var file = this.files[0];
    formdata.append("image",file);
    $.ajax({
      type:"post",
      url:"/upload",
      data:formdata,
      processData:false,
      contentType:false,
      success:function(res){
        $("#hiddenIpt").val(res[0].image);
      }
    })
  })
  //添加图片轮播内容
  $("#form").on("submit",function(){
    var formdata  = $(this).serialize();
    $.ajax({
        type:"post",
        url:"/slides",
        data:formdata,
        success:function(){
          location.reload()
        }
    })
    return false;
  })
  //展示轮播图列表
  $.ajax({
    type:"get",
    url:"/slides",
    success:function(res){
       var html = template("crsTpl",{res:res})
        $("#tb").html(html)
    }
  })
  //删除轮播图图片
  $("#tb").on("click",".del",function(){
    if(confirm("确认删除该项么？")){
      var id = $(this).data("id");
      $.ajax({
        type:"delete",
        url:"/slides/"+id,
        success:function(){
          location.reload()
        }
      })
    }
  })
