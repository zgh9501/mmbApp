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
    var productid = getQueryString("productid");
    console.log(productid);
    getProduct(productid)

    function getProduct(productid) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getproduct",
            // url: "http://192.168.25.45:9090/api/getproduct",
            data: {
                "productid": productid
            },
            success: function(data) {
                console.log(data);
                var html = template("productInfoTmp", data);
                $('.product-info').html(html);
                //获取评论的时候等商品先出来了再获取评论 
                getProductCom(productid);
            }
        })
    }

    function getProductCom(productid) {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getproductcom",
            // url: "http://192.168.25.45:9090/api/getproductcom",
            data: {
                "productid": productid
            },
            success: function(data) {
                // console.log(data);
                var html = template("productComTmp", data);
                $('.product-com-list').html(html);
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
