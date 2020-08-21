// 统一配置ajax选项
$.ajaxPrefilter(function (option) {
    // option表示ajax选项

    // 1.统一url配置(所有接口都需要配置)
    option.url = 'http://ajax.frontend.itheima.net' + option.url;

    // 2.headers,请求头加token(是以my开头的接口,需要这个配置)
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        // 3.ajax请求完成后,判断token真假 （是以 /my 开头的 接口，需要这个配置）
        option.complete = function (xhr) {
            // ajax请求完成后,根据服务器返回的结果判断token的真假
            if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败! ') {
                // 说明用户使用了假token或者过期的token
                // 清除假token或者过期token
                localStorage.removeItem('token');
                // 跳转到login.html
                location.href = '/login.html';
            }

        }



    };
});