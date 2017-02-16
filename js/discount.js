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
    var productid = getQueryString('productid');
    setProductList(productid);

    function setProductList(productid) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getdiscountproduct",
            // url: "http://192.168.25.45:9090/api/getdiscountproduct",
            data: { 'productid': productid },
            success: function(data) {
                var html = template("discountProduct", data);
                $('.discount-product').html(html);
                $('.loading').hide();
            }
        })
    }

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
});
