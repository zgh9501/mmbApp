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
    setSiteNav($('.site-nav'));

    function setSiteNav(dom, callback) {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getsitenav",
            // url: "http://192.168.25.45:9090/api/getsitenav",
            success: function(data) {
                var html = template('siteNav', data);
                dom.html(html);
                $('.loading').hide();
            }
        })
    }
})
