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
    getBrandTitle();

    function getBrandTitle() {
        $('.loading').show();
        $.ajax({
            url: "http://192.168.1.103:9090/api/getbrandtitle",
            // url: "http://192.168.25.45:9090/api/getbrandtitle",
            success: function(data) {
                var html = template("brandTitleTmp", data);
                $('.brand-title').html(html);
                $('.loading').hide();
            }
        })
    }
});
