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
    getbaicaijiaTitle();

    function getbaicaijiaTitle() {
        $('.loading').show();
        $.ajax({
            url: 'http://192.168.1.103:9090/api/getbaicaijiatitle',
            // url: 'http://192.168.25.45:9090/api/getbaicaijiatitle',
            success: function(data) {
                var html = template('baicaijiaTmp', data);
                $(".bcj-title > .ul-wapper > ul").html(html);
                $(".bcj-title").find('.ul-wapper > ul > li').eq(0).addClass('active');
                var ulWidth = 0;
                var lis = $(".bcj-title").find('.ul-wapper > ul > li');
                for (var i = 0; i < lis.length; i++) {
                    ulWidth += $(lis[i]).width();
                }
                $(".bcj-title > .ul-wapper > ul").css("width", ulWidth + "px");
                setSwipe();
                getBjcProduct(0);
            }
        });
    }
});

function getBjcProduct(titleid) {
    $.ajax({
        url: "http://192.168.1.103:9090/api/getbaicaijiaproduct",
        // url: "http://192.168.25.45:9090/api/getbaicaijiaproduct",
        data: {
            "titleid": titleid
        },
        success: function(data) {
            var html = template("baicaijiaProductTmp", data);
            $(".bcj-list").html(html);
            $(".bcj-list > ul > li").children('a').addClass("gobuy");
            $(".bcj-list > ul > li").children('a').html(" ");
            $('.loading').hide();
        }
    });
}

function setSwipe() {
    $(".bcj-title").find('.ul-wapper > ul > li > a').on('click', function() {
        $(".bcj-title").find('.ul-wapper > ul > li').removeClass("active");
        $(this).parent().addClass("active");
        var thisTitleId = $(this).data('titleid');
        // console.log(thisTitleId);
        var navs = $(".bcj-title").find('.ul-wapper > ul > li');
        var swipeLeft = 0;
        for (var i = 0; i < thisTitleId; i++) {
            swipeLeft -= $(navs[i]).width();
        }
        if (swipeLeft < minPosition) {
            swipeLeft = minPosition;
        }
        // console.log(swipeLeft);
        swipeUl.css("transform", "translateX(" + swipeLeft + "px)");
        swipeUl.css("transition", "all 0.5s");
        currentX = swipeLeft;
        getBjcProduct(thisTitleId);
    });
    /**
     * 导航滑动时，改变ul的位移（即translateX的值）
     * 从右向左滑动，ul是（负值 - 滑动的距离） 滑动距离：100px
     * 从左向右滑动，ul：（正值 - 滑动的距离） 
     * 当滑动超过最大滑动距离或者超过最小滑动距离就不让滑动
     * 当超过最大的位移位置，就要回到最大的位移位置
     * 当超过最小的位移位置，就要回到最小的位移位置
     */
    var startX, endX, moveX;
    var swipeUl = $(".ul-wapper > ul");

    // 当前滑动位置
    var currentX = 0;

    // 当前滑动距离
    var distanceX = 0;

    // 最大(最小)滑动距离
    var maxSwipe = 0 + 100;
    var minSwipe = $(".bcj-title").width() - swipeUl.width() - 100;

    //最大(最小)位移位置
    var maxPosition = 0;
    var minPosition = $(".bcj-title").width() - swipeUl.width();

    $(".bcj-title").on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $(".bcj-title").on('touchmove', function(e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        // 当超过最大滑动位置，则停止滑动
        if ((currentX + distanceX) < maxSwipe && (currentX + distanceX) > minSwipe) {
            swipeUl.css("transform", "translateX(" + (currentX + distanceX) + "px)");
            swipeUl.css("transition", "none");
        }
    });
    $(".bcj-title").on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        currentX += distanceX;
        // 松手时，弹回去
        if (currentX > maxPosition) {
            currentX = maxPosition;
        } else if (currentX < minPosition) {
            currentX = minPosition;
        }
        swipeUl.css("transform", "translateX(" + currentX + "px)");
        swipeUl.css("transition", "all 0.5s");
    });

}
