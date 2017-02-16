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
    var i = 0;
    var data1 = {};
    var resultLength = 0;
    $.ajax({
            url: "http://192.168.1.103:9090/api/getinlanddiscount",
            // url: "http://192.168.25.45:9090/api/getinlanddiscount",
            success: function(data) {
                data1 = data;
                var newdata = {
                    "result": []
                };
                for (i = 0; i < 4; i++) {
                    newdata.result.push(data.result[i])
                }
                // console.log(newdata);
                var html = template("discountProductTmp", newdata);
                $('.inland-discount-list').html(html);
                height = $('.inland-discount-list').height() - $(document.body).height();
                console.log(height);
                resultLength = data.result.length;
                $('.loading').hide();
            }
        })
        /**
         * 1. 滚动条滚动到底部的时候加载下一页数据
         * 2. 什么时候才知道滚动到了底部 需要获取滚动条的距离去做判断
         * 3. 获取滚动条的距离上面的距离  每次滚动的时候都要获取距离 添加滚动事件
         * 4. 获取到容器 -  整个网页的高度
         * 5. 判断当 获取到容器 -  整个网页的高度  == 滚动条滚动的距离  加载下一页数据
         */
        //滚动条到顶部的距离
    var scrollTop = $(window).scrollTop();
    // 容器减去网页的高度 因为这个容器的高度的动态的  当加载下一页数据的时候 就会变高
    var height = $('.inland-discount-list').height() - $(document.body).height();
    console.log(height);
    $(window).on('scroll', function() {
        // console.log($(window).scrollTop());
        //每次滚动事件触发都获取一些滚动条的距离赋值给scrollTop
        scrollTop = $(window).scrollTop();
        //当 获取到容器高度 -  整个网页的高度  == 滚动条滚动的距离 并且滚动的距离不等于0
        // console.log(log);
        if (scrollTop == height && scrollTop != 0) {
            //到底部了
            $('.loading').show();
            $.ajax({
                url: "http://192.168.1.103:9090/api/getinlanddiscount",
                // url: "http://192.168.25.45:9090/api/getinlanddiscount",
                success: function(data) {
                    var newData = {
                        "result": []
                    };
                    if (i >= resultLength) {
                        $('.loading').hide();
                        return;
                    }
                    // 是获取后4条数据 也就是 5 - 8 条数据
                    for (var j = i; j < i + 4; j++) {
                        newData.result.push(data.result[j]);
                    }
                    var html = template("discountProductTmp", newData);
                    $('.inland-discount-list').append(html);
                    height = $('.inland-discount-list').height() - $(document.body).height();
                    i = j;
                    $('.loading').hide();
                }
            })
        }
    });
});
