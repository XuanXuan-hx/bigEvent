//----------------------------------获取用户信息-------------------------------------
//到达index页面,渲染头像和欢迎语

function getUserInfo() {
    // 发送ajax请求,获取用户信息(必须先登录,保证存储有可用的token)
    $.ajax({
        url: '/my/userinfo',
        // ajax请求成功后触发
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 设置欢迎语(有昵称, 使用昵称;没有昵称,使用用户名)
                var name = res.data.nickname || res.data.username;
                $('.username').text(name);

                // 设置头像(有图片, 使用图片;没有图片,使用名字的第一个字符)
                if (res.data.user_pic) {
                    // 设置img的src属性
                    // 让img显示
                    $('.lay-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    // 获取明的首字符,变为大写设置
                    var first = name.substr(0, 1).toUpperCase();
                    $('.text-avatar').text(first).css('display', 'inline-block');
                }
            }
        },
    });
}
getUserInfo();


$('#logout').click(function () {
    // 询问是否要删除
    layer.confirm('确定要退出吗', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
        // 点击确定,清除这里的代码
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });




});