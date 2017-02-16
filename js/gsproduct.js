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
    $(".glyphicon-menu-left").on('click', function() {
        $(this).css("color", "#fff");
    });
    getShop();
    getArea();
    getProduct(0, 0);

    function getShop() {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getgsshop",
            // url: "http://192.168.25.45:9090/api/getgsshop",
            success: function(data) {
                var html = template("shopTmp", data);
                $('#shop').html(html);
                $('.filter > ul >li').eq(0).html("<a href='#shop' data-shopid=" + data.result[0].shopId + ">" + data.result[0].shopName + "<i></i></a>");
                //给上面的店铺标题添加事件 当点击的时候显示店铺列表
                $('.filter > ul >li').eq(0).find('a').on('click', function(e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    // console.log(log);
                    $($('.filter > ul >li').eq(1).find("a").attr("href")).hide();
                });
                // 给店铺列表添加事件 把店铺标题切换成选中的标题
                $('#shop > ul > li > a').on('click', function() {
                    //获取当前店铺列表点击项的shopid
                    var shopid = $(this).data("shopid");
                    $('.filter > ul >li').eq(0).find('a').data("shopid", shopid);
                    //html() 方法不传参表示获取值 
                    // 获取当前店铺列表点击项的shopName
                    var shopName = $(this).html();
                    $('.filter > ul >li').eq(0).find('a').html(shopName + "<i></i>");
                    $('#shop').hide();
                    // console.log(shopid,$('.filter > ul >li').eq(1).find('a').data("areaid"));
                    getProduct(shopid, $('.filter > ul >li').eq(1).find('a').data("areaid"));
                });
                // toggleShop($('.filter > ul >li').eq(0).find('a'), $('#shop > ul > li > a'), $('.filter > ul >li').eq(1).find('a'), "shopid", "areaid");
            }
        })
    }

    function getArea() {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getgsshoparea",
            // url: "http://192.168.25.45:9090/api/getgsshoparea",
            success: function(data) {
                var html = template("areaTmp", data);
                $('#area').html(html);
                $('.filter > ul >li').eq(1).html("<a href='#area' data-areaid=" + data.result[0].areaId + ">" + data.result[0].areaName.split("（")[0] + "<i></i></a>");
                //给上面的区域标题添加事件 当点击的时候显示区域列表
                $('.filter > ul >li').eq(1).find('a').on('click', function(e) {
                    e.preventDefault();
                    $($(this).attr("href")).toggle();
                    $($('.filter > ul >li').eq(0).find("a").attr("href")).hide();
                });
                // 给区域列表添加事件 把区域标题切换成选中的区域
                $('#area > ul > li > a').on('click', function() {
                    //获取当前区域列表点击项的areaid
                    var areaid = $(this).data("areaid");
                    $('.filter > ul >li').eq(1).find('a').data("areaid", areaid);
                    //html() 方法不传参表示获取值 
                    // 获取当前区域列表点击项的areaName
                    var areaName = $(this).html();
                    $('.filter > ul >li').eq(1).find('a').html(areaName.split("（")[0] + "<i></i>");
                    $('#area').hide();
                    getProduct($('.filter > ul >li').eq(0).find('a').data("shopid"), areaid);
                });
                // toggleShop($('.filter > ul >li').eq(1).find('a'), $('#area > ul > li > a'), $('.filter > ul >li').eq(0).find('a'), "areaid", "shopid")
            }
        })
    }

    function getProduct(shopid, areaid) {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getgsproduct",
            // url: "http://192.168.25.45:9090/api/getgsproduct",
            data: {
                "shopid": shopid,
                "areaid": areaid
            },
            success: function(data) {
                var html = template("productTmp", data);
                $('.gs-product-list').html(html);
                $('.loading').hide();
            }
        })
    }
})
