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
    setCoupon($('.coupon-title'));

    function setCoupon(dom, callback) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getcoupon",
            // url: "http://192.168.25.45:9090/api/getcoupon",
            success: function(data) {
                var html = template('couponTitle', data);
                dom.html(html);
                $('.loading').hide();
            }
        })
    }
});
