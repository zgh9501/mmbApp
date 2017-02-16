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
    var pageid = getQueryString("pageid") || 1;
    getMoneyCtrl(pageid)

    function getMoneyCtrl(pageid) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getmoneyctrl",
            // url: "http://192.168.25.45:9090/api/getmoneyctrl",
            data: {
                "pageid": pageid
            },
            success: function(data) {
                $('.loading').hide();
                var html = template("moneyCtrlTmp", data);
                console.log(html);
                $('.product-list').html(html);
                var page = Math.ceil(data.totalCount / data.pagesize) - 1;
                // console.log(page);
                var pageli = "";
                for (var i = 0; i < page; i++) {
                    //循环生成 第几页的li标签
                    // var url = "moneyctrl.html?categoryid=" + categoryId + "pageid=" + pageid;
                    // var url = "moneyctrl.html?categoryid=" + categoryId + "&pageid=" + (i+1);
                    var url = "moneyctrl.html?pageid=" + (i + 1);
                    pageli += "<li><a href=" + url + ">第" + (i + 1) + "/" + (page) + "页</a></li>";
                }
                $('#dLabel').html("第" + pageid + "页" + '<span class="caret"></span>');
                //如果当前页数已经到了第一页 给当前页面数变成2  2 -1 就只能 == 1
                // if (pageid <= 1) {
                //     pageid = 2;
                // } else if (pageid >= page) {
                //     //如果当前页数已经到了第最后一页 给当前页数变成最后一页 - 1  3+1 == 4
                //     pageid = page - 1;
                // }
                // var prevUrl = "moneyctrl.html?pageid=" + (pageid - 1);
                // var nextUrl = "moneyctrl.html?pageid=" + (parseInt(pageid) + 1);
                if (pageid > 1) {
                    var prevUrl = "moneyctrl.html?pageid=" + (pageid - 1);
                } else {
                    pageid = 1;
                    var prevUrl = "moneyctrl.html?pageid=" + pageid;
                }
                if (pageid < page) {
                    pageid = parseInt(pageid);
                    var nextUrl = "moneyctrl.html?pageid=" + (parseInt(pageid) + 1);
                } else {
                    pageid = page - 1;
                    var prevUrl = "moneyctrl.html?pageid=" + pageid;
                    // prevUrl.slice(-1);
                }
                $('.page-prev').attr("href", prevUrl);
                $('.page-next').attr("href", nextUrl);
                // $('#dLabel').append('<span class="caret"></span>');
                $('.dropdown-menu').html(pageli);
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
})
