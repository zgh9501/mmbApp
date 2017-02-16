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
    setCouponList($('.coupon-list'), $.getUrlParam('couponid'));

    function setCouponList(dom, couponid, callback) {
        $.ajax({
            url: 'http://192.168.1.103:9090/api/getcouponproduct',
            // url: 'http://192.168.25.45:9090/api/getcouponproduct',
            data: { 'couponid': couponid },
            success: function(data) {
                var html = template('couponList', data);
                dom.html(html);
                var lis = $(".coupon-list>ul>li");
                for (var i = 0; i < lis.length; i++) {
                    var imgLink = $(lis[i]).children('a').eq(0).children('.pic').eq(0).children('img').eq(0);
                    var link = imgLink.prop('src');
                    var alink = $(lis[i]).children("a").eq(0);
                    alink.prop("href", link);
                    var that = $(lis[i]);
                    alink.on("click", function() {
                        var imgClone = $(this).prop("href");
                        // console.log(imgClone);
                        $('.zhezhao>img').prop('src', imgClone);
                        $('.zhezhao').css('display', 'block');
                        return false;
                    });
                    $('.zhezhao').on('click', function() {
                        // console.log(1);
                        $('.zhezhao').css('display', 'none');
                        $('.zhezhao>img').prop('src', '');
                    });
                }
            }
        })
    }
});
