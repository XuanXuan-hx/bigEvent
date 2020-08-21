//----------------------------数据回填--------------------------
// 定义渲染表单的函数
function renderForm() {
    // 发送ajax请求,获取用户的信息
    // 设置每个input的value值(用户名, 昵称, 邮箱, id)
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // 数据回填
            $('input[name=username]').val(res.data.username);
            $('input[name=nickname]').val(res.data.nickname);
            $('input[name=email]').val(res.data.email);
            $('input[name=id]').val(res.data.id);
        }
    });
}
renderForm();

//----------------------------点击确认修改,完成修改--------------------------

$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 收集表单数据
    var data = $(this).serialize();
    // ajax提交给接口,完成用户信息修改
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 设置input为disabled禁用,通过serialize就不会收集到这项数据了
                // 修改用户信息.重新渲染html页面
                // 调用父页面的getUserInfo
                window.parent.getUserInfo();
            }
        }
    });
});