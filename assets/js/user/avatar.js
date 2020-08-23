//----------------------------1.创建剪裁框,实现基本的剪裁效果---------------------
//实现这个功能,需要用到插件
// 1.1找到默认的图片
var $image = $('#image');
// 1.2配置剪裁框
var option = {
    // 纵横比
    aspectRatio: 1,
    // 制定预览区
    preview: '.img-preview'
};
// 1.3调用插件方法,实现剪裁框
$image.cropper(option);

//---------------------------------2.点击上传按钮,能够选择图片--------------------
// 找到上传按钮,注册单击事件,点击按钮的时候,触发文件的单击事件
$('button:contains("上传")').click(function () {
    $('#file').click();
});


//---------------------3.选择一张图片之后,能够更换选择去的图片---------------------
// 文件域的内容改变的时候,更换剪裁区的图片
$('#file').change(function () {
    // 3.1 先找到这个对象
    var fileObj = this.files[0];
    // 3.2为选择的图片生成一个临时的url
    var url = URL.createObjectURL(fileObj);
    // 3.3 更换图片的src属性即可(先销毁剪裁区 --> 更换src属性 --> 重新创建剪裁框)
    // $image.cropper('destroy');
    // $image.attr('src', url);
    // $image.cropper(option);
    $image.cropper('destroy').attr('src', url).cropper(option);
});

//--------4.点击确定按钮,剪裁图片,把图片转成base64格式,ajax提交,完成更换-----
$('button:contains("确定")').click(function () {
    // 4.1调用插件方法,剪裁图片,剪裁之后得到一张canvas格式的图片
    var canvas = $image.cropper('getCroppedCanvas', {
        width: 100,
        height: 100,
    });
    // 4.2把convas图片转成base64格式,得到超长的字符串
    var base64 = canvas.toDataURL('image/png');
    // 4.3ajax提交字符串,完成更新
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: base64
        },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 重新渲染页面
                window.parent.getUserInfo();
            }
        }
    });
});