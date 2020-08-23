//---------------------------完成表单验证
// 1.新密码不能和原密码相同 (两个新密码都要用)
// 2.新密码的长度在6-12位,不能有空格
// 3.两次新密码必须一致
// 新密码不能和原密码相同

// 加载layui-form模块
var form = layui.form;
// 自定义验证规则
form.verify({
    // 新密码的长度在6-12位,不能有空格
    len: [/^\S{6,12}$/, '密码长度必须是6~12位,不能有空格'],


    // 新密码不能和原密码相同
    diff: function (val) {
        // 新参表示使用验证规则的输入框的值,新密码使用这个验证规则,所以val表示填写的新密码
        var oldPwd = $('input[name="oldPwd"]').val();

        if (val === oldPwd) {
            return '新密码不能和原密码相同';
        }

    },

    // 两次新密码必须一致(重复密码使用这个验证规则)
    same: function (val) {
        // val 表示填写的重复密码
        // 获取新密码
        var nemPwd = $('input[name="newPwd"]').val();
        if (nemPwd !== val) {
            return '两次密码不一样';
        }
    }
});

//--------------------------------------完成更新密码-------------------------
$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 清空输入框
                $('form')[0].reset();
            }
        }
    });
});