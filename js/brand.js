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
    var brandtitleid = getQueryString("brandtitleid");
    getBrandList(brandtitleid);
    getBrandProduct(brandtitleid);

    function getBrandList(brandtitleid) {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getbrand",
            // url: "http://192.168.25.45:9090/api/getbrand",
            success: function(data) {
                var html = template("brandListTmp", data);
                $('.brand-list').html(html);
            }
        })
    }

    function getBrandProduct(brandtitleid) {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getbrandproductlist",
            // url: "http://192.168.25.45:9090/api/getbrandproductlist",
            data: {
                "brandtitleid": brandtitleid,
                "pagesize": 4
            },
            success: function(data) {
                var html = template("brandProductTmp", data);
                $('.product-list').html(html);
                //等商品出来了再加载商品评论
                getBrandProductCom(data.result[0]);
            }
        })
    }

    function getBrandProductCom(product) {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getproductcom",
            // url: "http://192.168.25.57:9090/api/getproductcom",
            success: function(data) {
                data = {
                    "productid": product.productId,
                    "productImg": product.productImg,
                    "productName": product.productName,
                    "result": data.result
                };
                console.log(data);
                var html = template("brandProductComTmp", data);
                $('.product-com').html(html);
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
