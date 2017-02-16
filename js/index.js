$(function() {
    $(".fixed").on('touchstart', function() {
        $(".fixed").css({
            'backgroundColor': '#f4483E'
        });
        $(".fixed>i").css('color', "#fff");
        $(".fixed>span").css('color', "#fff");
    });
    $(".fixed").on('touchend', function() {
        $(".fixed").css({
            'backgroundColor': "#ff841d"
        });
        $(".fixed>i").css('color', "#ccc");
        $(".fixed>span").css('color', "#666");
    });
    getindexMenu();

    function getindexMenu() {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getindexmenu",
            // url: "http://192.168.25.45:9090/api/getindexmenu",
            success: function(data) {
                //因为data已经在后台打包成了一个对象 所以这里就直接传data不用打包
                var html = template("menuTmp", data);
                $('#menu').html(html);
                // console.log($('#menu >.row > div:nth-child(8)'));
                //由于现在的html的动态加载进来的 所以$('#menu >.row > div:nth-child(8)') 默认是获取不到
                // 需要等html已经加载到页面上才能获取元素 
                //所以添加事件等DOM操作得在  $('#menu').html(html); 执行完成之后写
                $('#menu >.row > div:nth-child(8)').on('click', function() {
                    // toggle表示切换当前调用的元素的显示隐藏
                    $('#menu >.row > div:nth-last-child(-n+4)').toggle(200);
                });
            }
        })
    }
    getRecommen();

    function getRecommen() {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getmoneyctrl",
            // url: "http://192.168.25.45:9090/api/getmoneyctrl",
            success: function(data) {
                var html = template('recommenTmp', data);
                //将生成好的html模板放到 推荐列表的容器里
                $('.recommen-list').html(html);
                $('.loading').hide();
            }
        })
    }
})
