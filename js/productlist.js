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
    var categoryId = getQueryString('categoryid');
    var pageid = getQueryString('pageid');
    var strUrl = location.search;
    var cId = "?categoryid=" + String(categoryId) + "&category=";
    strUrl = strUrl.replace(cId, '').replace('&pageid=' + pageid, '');
    var cStr = decodeURI(strUrl);
    var categoryV = cStr;
    getCategory(categoryId);
    setProduct(categoryId, pageid);

    //地址栏中截取id向分类标题中传入
    function getCategory(categoryId) {
        $.ajax({
            url: 'http://192.168.1.103:9090/api/getcategorybyid?categoryid=' + categoryId,
            // url: 'http://192.168.25.45:9090/api/getcategorybyid?categoryid=' + categoryId,
            success: function(data) {
                $("#productList > .category-title > .breadcrumb > li:last-child").html(data.result[0].category);
            }
        });
    }
    //商品列表区域
    function setProduct(categoryId, pageid) {
        $.ajax({
            url: 'http://192.168.1.103:9090/api/getproductlist',
            // url: 'http://192.168.25.45:9090/api/getproductlist',
            data: {
                'categoryid': categoryId,
                'pageid': pageid || 1
            },
            success: function(data) {
                console.log(1);
                // 计算页数
                var page = Math.ceil(data.totalCount / data.pagesize);
                var pageLi = '';
                for (var i = 0; i < page; i++) {
                    //生成相应的li标签个数
                    // pageLi += '<li><a href="productList.html?categoryid=' + categoryId + '&pageid=' + (i + 1) + '">第' + (i + 1) + '/' + page + '页</a></li>'
                    pageLi += '<li><a href="productList.html?categoryid=' + categoryId + '&pageid=' + (i + 1) + '">第' + (i + 1) + '页</a></li>'
                }
                $('#dLabel').html('第' + pageid + '页');
                $('#dLabel').append('<span class="caret"></span>');
                if (pageid > 1) {
                    var prevUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + (pageid - 1);
                } else {
                    pageid = 1;
                    var prevUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + pageid;
                }
                if (pageid < page) {
                    pageid = parseInt(pageid);
                    var nextUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + (pageid + 1);
                } else {
                    pageid = page - 1;
                    var prevUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + pageid;
                    // prevUrl.slice(-1);
                }

                // if(pageid <= 1){
                //     pageid = 1;
                // }
                // if(pageid >= page){
                //     pageid = page - 1;
                // }
                // pageid = parseInt(pageid);
                // var prevUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + (pageid - 1);
                // var nextUrl = "productList.html?categoryid=" + categoryId + "&pageid=" + (pageid + 1);
                $('.prev-page').attr('href', prevUrl);
                $('.next-page').attr('href', nextUrl);

                //将li放入页面中
                $('.dropdown-menu').html(pageLi);

                var html = template('productListTmp', data);
                $('#productList > .product-list').html(html);

                categoryValue(categoryV);
            }
        });
    }
    //获取url参数值（根据参数名获取参数值）
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    //将category的数值传递到比价界面
    function categoryValue(categoryV) {
        var str = $(".media-body > h5 > a").attr('href');
        str += '&category=' + categoryV;
        $(".media-body > h5 > a").attr('href', str);
    }

});
