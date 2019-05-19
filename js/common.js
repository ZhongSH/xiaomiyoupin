$(function () {
    // 吸顶菜单
    $(window).scroll(function () {
        if ($(window).scrollTop() > $('#top').outerHeight(true) + 358) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

    //回到顶部
    $('#toTop').click(function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 500);
    });

    $('.logo a').click(function () {
        location.href = '../index.html';
    });

    //是否登陆
    if (getCookie('user')) {
        $('.login-info').css('display', 'block');
        $('#userinfo').html(getCookie('user'));
        $('.lognreg').css('display', 'none');
    }

    $('#logout').click(function () {
        removeCookie('user');
        $('.login-info').css('display', 'none');
        $('.lognreg').css('display', 'block');
        location.reload();
    });

    //点击购物车
    $('.shopping').click(function () {
        if (getCookie('user')) {
            location.href = '../html/cart.html';
        } else if (confirm('你还没有登陆,现在登录吗？')) {
            location.href = '../html/login.html';
        }
    });

    //获取购物车数量
    var thisNum = 0
    var gid = 1;

    function getCartNum() {
        $.ajax({
            type: "post",
            url: "../api/getcartnum.php",
            data: "user=" + getCookie('user') + "&gid=" + gid,
            success: function (str) {
                var arr = JSON.parse(str);
                //购物车总数量
                var allnum = 0;
                for (var i = 0; i < arr.cartlist.length; i++) {
                    allnum += Number(arr.cartlist[i].gnum);
                }
                console.log(allnum);
                $('.cart_info').html(allnum);

                //购物车当前单品数量
                for (var j = 0; j < arr.goodnum.length; j++) {
                    thisNum = Number(arr.goodnum[0].gnum);
                }
            }
        });
    }

    if (getCookie('user')) {
        getCartNum();
    } else {
        $('.cart_info').css('display', 'none');
    }

    $('.icon-search').click(function () {
        var val = $('#search-val').val();
        location.href = '../html/list.html';
        setCookie('val', val);
    });

});