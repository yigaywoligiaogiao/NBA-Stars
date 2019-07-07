
    //文件上传
      $("#logo").on("change",function(){
        var file = this.files[0];
        var formdata = new FormData();
        formdata.set("attrName",file)
        $.ajax({
          type:"post",
          url:"/upload",
          data:formdata,
          processData:false,
          contentType:false,
          success:function(res){
             $("#site_logo").val(res[0].attrName)
              $("#img").attr("src",res[0].attrName)
          }

        })
      })
    //上传表单
      $("#siteBox").on("submit","form",function(){
        var formdata = $(this).serialize();
        console.log(formdata);
        
        $.ajax({
          type:"post",
          url:"/settings",
          data:formdata,
          success:function(res){
            console.log(res);
          }
        })
        return false;
      })
  
