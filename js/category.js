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
    setCategoryTitle();

    function setCategoryTitle() {
        $.ajax({
            url: "http://192.168.1.103:9090/api/getcategorytitle",
            // url: "http://192.168.25.45:9090/api/getcategorytitle",
            success: function(data) {
                var html = template("categoryTitleTmp", data);
                $("#category > .panel-group").html(html);
                var categoryTitle = $("#category > .panel-group > .panel-default > .panel-heading > h4 > a");
                categoryTitle.on("click", function(e) {
                    var titleId = $(this).data("titleid");
                    // var titleId = $(this).attr("data-titleid");
                    $.ajax({
                        url: "http://192.168.1.103:9090/api/getcategory?titleid=" + titleId,
                        // url: "http://192.168.25.45:9090/api/getcategory?titleid=" + titleId,
                        success: function(data) {
                            var html = template("categoryTmp", data);
                            var panelBody = $(e.target).parent().parent().parent().find(".panel-collapse").find('.panel-body');
                            panelBody.html(html);
                            var categoryList = panelBody.find('.row > div');
                            var count = categoryList.length % 3 || 3;
                            panelBody.find(".row > div:nth-last-child(-n+" + count + ")").css("border-bottom", "0");
                        }
                    })
                });
            }
        })
    }
})
