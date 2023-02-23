$(function() {
    // 添加节流阀(互斥锁) 用来防止点击事件时也触发滚动事件
    var flag = true;
    var jia = $('.jiadian').offset().top;
    var phone = $('.shouji').offset().top;
    var jin = $('.recom').offset().top;
    var nao = $('.diannao').offset().top;
    var ju = $('.jiaju').offset().top;
    var fu = $('.fushi').offset().top;
    var zhaung = $('.huazhuang').offset().top;
    $('.dian li').click(function() {
        flag = false;
        var yi = $('.floor .w').eq($(this).index()).offset().top;
        $('html,body').stop().animate({
            scrollTop: yi + 1
        }, function() {
            flag = true;
        })
        $(this).addClass('current').siblings().removeClass();
    });
    $(window).scroll(function() {
        if ($(document).scrollTop() >= jin) {
            $('.dian').fadeIn();
        } else {
            $('.dian').fadeOut();
        }
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.dian li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    })
})