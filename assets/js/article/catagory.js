var addIndex = null;
var editIndex = null;

//--------------------------------获取分类 渲染到页面中--------------------------
//封装函数 添加完成,修改完成,删除完成之后,还要调用函数重新渲染页面
// render 渲染
// category l类别


//---------------------------获取类别列表 渲染到页面中----------------------------
function renderCategory() {
    // 发送ajax请求,获取数据
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            if (res.status === 0) {
                // 把数据通过模板引擎渲染到页面中
                var html = template('tpl-list', res);
                // 将html放到tbody中
                $('tbody').html(html);
            }
        },
    });
}
renderCategory();



//----------------------删除分类--------------------------
// $('botton:contains("删除")').
$('tbody').on('click', 'button:contains("删除")', function () {
    var id = $(this).data('id');
    // 询问是否删除
    layer.confirm('你是否要删除?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something

        // 点击确定,这个函数就触发了
        // 发送ajax请求
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                // 无论删除成功还是失败,都给出提示
                layer.msg(res.message);
                // console.log(res);
                if (res.status === 0) {
                    renderCategory();
                }
            }
        });
        layer.close(index);
    });
});

//------------------------添加 (点击添加分类,显示弹层)
$('button:contains("添加类别")').click(function () {
    // index 表示当前的弹层:关闭弹层的时候,需要用到它
    addIndex = layer.open({
        type: 1,
        title: '添加文章分类',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
});


//---------------------------添加 (点击确认添加,完成添加)-------------
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: data,
        success: function (res) {
            // 无论成功还是失败都提示
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                // 关闭弹层
                layer.close(addIndex);
            }
        }
    });
});


//--------------------------------编辑  (点击编辑 显示弹层)-------------
$('body').on('click', 'button:contains("编辑")', function () {
    editIndex = layer.open({
        type: 1,
        title: '编辑文章分类',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px']
    });
    // 弹层出现之后,获取事件的三个自定义属性值,设置input的value值
    var zhi = $(this).data();
    console.log(zhi);
    $('.edit-form input[name="name"]').val(zhi.name);
    $('.edit-form input[name="alias"]').val(zhi.alias);
    $('.edit-form input[name="id"]').val(zhi.id);
});


//-----------------编辑 (点击,确认修改,完成编辑)------------------------
$('body').on('submit', '.edit-form', function (e) {
    e.preventDefault();
    // 获取表单各项
    var data = $(this).serializeArray();
    // 将id改为Id
    data[2].name = 'Id';
    // 提交ajax请求
    $.ajax({
        type: 'POST',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            // 无论成功还是失败都给出提示
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                // 关闭提示框
                layer.close(editIndex);
            }
        }
    });
});