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
    var productid = getQueryString("productid");
    getMoneyProduct(productid);

    function getMoneyProduct(productid) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getmoneyctrlproduct",
            // url: "http://192.168.25.45:9090/api/getmoneyctrlproduct",
            data: {
                "productid": productid
            },
            success: function(data) {

                console.log(data);
                var html = template("moneyProductTmp", data);
                $('.money-product').html(html);
                $('.loading').hide();
            }
        })
    }
    //是用来获取url中的参数的值的 根据参数名获取参数值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
});
