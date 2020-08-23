var form = layui.form; //加载表单模块
var laypage = layui.laypage; //加载分类模块
// 全局变量 设置ajax请求的参数
var data = {
    pagenum: 1, //分页获取数据,pagenum表示获取第几页的数据,1表示获取第一页的数据,2表示获取第二页的数据.........
    pagesize: 3, //每页显示多少条数据
    // cate_id: 1,
    // state: 1
};


//--------------------1.ajax获取文章列表,渲染到页面中------------------------
function renderAticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            if (res.status === 0) {
                // 这里调用模板引擎,渲染数据
                console.log(res);
                var html = template('tpl-list', res);
                $('tbody').html(html);
            }
        }
    });
}
renderAticle();



//----------------------2.发送ajax请求,获取所有分类-------------
// 获取到所有分类后,渲染到页面下拉框位置
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        if (res.status === 0) {
            //使用模板引擎,渲染到下拉框
            var html = template('tpl-category', res);
            $('#category').html(html);
            // 更新渲染
            form.render('select')
        }
    }
});



//----------------------3.layui的分类模块-------------
//执行一个laypage实例
function createPage() {
    laypage.render({
        elem: 'page', //注意，这里的 page 是页面中div的id ID，不用加 # 号

        count: 50, //数据总数，从服务端得到的文章总数
        limit: 8, //每页显示多少条,默认是10  实际开发中,应该让data.pagesize一致
        limits: [10, 20, 30, 40, 50], //自定义每页显示多少天的下拉菜单,
        curr: 1, //当前页   实际开发中,应该和data.pagenum一致
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    });
}
createPage();



//--------------------定义模板过滤器,处理时间-----------------
template.defaults.imports.formaDate = function (t) {
    // 创建时间对象
    var date = new Date(t);
    // 获取年月日时分秒
    var y = date.getFullYear();
    var m = addZero(date.getMonth() + 1);
    var d = addZero(date.getDate());
    var hh = addZero(date.getHours());
    var mm = addZero(date.getMinutes());
    var ss = addZero(date.getSeconds());
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
}

// 定义补零函数
function addZero(n) {
    return n < 10 ? '0' + n : n;
}