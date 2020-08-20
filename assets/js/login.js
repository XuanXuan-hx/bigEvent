// -----------------------------切换登录和注册的盒子-----------------------------
$('.login a').click(function () {
    $('.register').show().prev().hide();
});

$('.register a').click(function () {
    $('.login').show().next().hide();
});

// -------------------------------登录功能--------------------------------------
$('.login form').on('submit', function (e) {
    e.preventDefault();
    // 收集账号,密码
    var data = $(this).serialize();
    // ajax提交
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/login',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 把token保存到本地存储
                localStorage.setItem('token', res.token);
                // 跳转到index.html
                location.href = '/index.html';
            }
        }
    });
});

// -------------------------------注册功能--------------------------------------
// 表单提交,阻止默认行为,收集用户信息,密码,ajax提交给用户信息
$('.register form').on('submit', function (e) {
    e.preventDefault();
    // 收集用户信息
    var data = $(this).serialize();
    // console.log(data);
    // 发送ajax请求
    $.ajax({
        type: 'POST',
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 注册成功,显示登录的盒子
                $('.login').show().next().hide();
                // 清空注册的表单
                $('.register form')[0].reset();
            }
        }
    });
});

// -------------------------------注册表单功能--------------------------------------
// 1.用户名 密码 确认密码不能重复(layui自带表单验证,加上required(必填项) lay-verify)
// 2.密码 重复密码长度 6~12位,且不能出现空格
// 3.密码和重复密码必须一致
// layui自定义验证规则使用步骤
// 加载form模块 (var 变量 = layui.模块)
var form = layui.form;
// 调用form.verify()编写验证规则
// console.log(form)
form.verify({
    // 键(验证规则):值 (验证的方法,可以使用数组/函数)

    // 使用数组
    // changdu: ['正则表达式','验证失败时的提示信息']
    changdu: [/^\S{6,12}$/, '长度6-12位,不能有空格'], //{6,12}

    // 使用函数
    same: function (val) {
        // 形参:val,表示食用验证规则的输入框的值
        // 比如重复密码使用了这个验证规则,
        // 形参val表示输入的重复密码
        // 功能代码
        // 获取密码
        var pwd = $('.pwd').val();
        // 比较
        if (pwd !== val) {
            // return 返回的值,就是错误提示信息
            return '两次密码不一致';
        }
    }
});