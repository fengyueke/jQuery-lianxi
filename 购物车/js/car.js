$(function() {
    // 全选与不选模块
    // $('.checkall') $('.j-checkbox')
    // console.log($(".j-checkbox, .checkall"));
    $('.checkall').change(function() {
            $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
            if ($(this).prop('checked')) {
                $('.cart-item').addClass('check-cart-item');
            } else {
                $('.cart-item').removeClass('check-cart-item');
            }
            getSum();
        })
        // 通过商品的复选框控制全选按钮
    $('.j-checkbox').change(function() {
            if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
                $('.checkall').prop('checked', true);
            } else {
                $('.checkall').prop('checked', false);
            }
            for (var i = 0; i < $('.j-checkbox').length; i++) {
                $('.j-checkbox')[i].setAttribute('data-index', i);
            }
            var flag = $(this).attr('data-index');
            if ($(this).prop('checked')) {
                $('.cart-item').eq(flag).addClass('check-cart-item');
            } else {
                $('.cart-item').eq(flag).removeClass('check-cart-item');
            }
            getSum();
        })
        // 增减商品数量
        // 增加商品数量
    $('.increment').click(function() {
            var flag = $(this).siblings('.itxt').val();
            var temp = $(this).parent().parent().siblings('.p-price').text();
            temp = temp.substring(1);
            flag++;
            $(this).siblings('.itxt').val('' + flag + '');
            $(this).parents('.p-num').siblings('.p-sum').text('￥' + (temp * flag).toFixed(2) + '');
            $(this).parents('.p-num').siblings('.p-checkbox').find().prop('checked')
            if ($(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked')) {
                $(this).parents('.cart-item').addClass('check-cart-item');
            } else {
                $(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked', true);
                $(this).parents('.cart-item').addClass('check-cart-item');
            }
            if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
                $('.checkall').prop('checked', true);
            } else {
                $('.checkall').prop('checked', false);
            }
            getSum();
        })
        // 减少商品数量
    $('.decrement').click(function() {
            var flag = $(this).siblings('.itxt').val();
            flag--;
            var temp = $(this).parent().parent().siblings('.p-price').text();
            temp = temp.substring(1);
            if (flag > 0) {
                $(this).siblings('.itxt').val('' + flag + '');
                $(this).parents('.p-num').siblings('.p-sum').text('￥' + (temp * flag).toFixed(2) + '');
                getSum();
            } else if (flag == 0) {
                $(this).siblings('.itxt').val('' + flag + '');
                $(this).parents('.p-num').siblings('.p-sum').text('￥' + (temp * flag).toFixed(2) + '');
                getSum();
                if ($(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked')) {
                    $(this).parents('.cart-item').removeClass('check-cart-item');
                    $(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked', false)
                } else {
                    $(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked', false);
                    $(this).parents('.cart-item').removeClass('check-cart-item');
                }
                if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
                    $('.checkall').prop('checked', true);
                } else {
                    $('.checkall').prop('checked', false);
                }
            }
        })
        // 修改文本内容进行计算
    $('.itxt').change(function() {
            var p = $(this).parents('.p-num').siblings('.p-price').text();
            var n = $(this).val();
            p = p.substring(1);
            $(this).parents('.p-num').siblings('.p-sum').text('￥' + (p * n).toFixed(2) + '');
            if ($(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked')) {

                $(this).parents('.cart-item').addClass('check-cart-item');
            } else {
                $(this).parents('.p-num').siblings('.p-checkbox').find('.j-checkbox').prop('checked', true);
                $(this).parents('.cart-item').addClass('check-cart-item');
            }
            getSum();
        })
        // 结算模块
    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价钱
        $('.j-checkbox:checked').parent().siblings('.p-num').find('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.shang').text(count);
        $('.j-checkbox:checked').parent().siblings('.p-sum').each(function(i, ele) {
            var flag = $(ele).text()
            flag = flag.substring(1);
            money += parseFloat(flag);
        })
        $('.zong').text('￥' + money.toFixed(2));
    }
    // 点击删除，删除 当前的商品
    // console.log($('.p-action'));
    $('.p-action').click(function() {
            $(this).parent('.cart-item').remove();
            getSum();
        })
        // 删除所选中的商品
        // console.log($('.remove-batch'));
    $('.remove-batch').click(function() {
            $('.j-checkbox:checked').parents('.cart-item').remove();
            getSum();
        })
        // 清理购物车模块
        // console.log($('.clear-all'));
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
    })
})