$(function () {

    var gid = location.search.slice(1);
    var user = getCookie('user');
    console.log(gid);
    var gimg

    //渲染商品详情
    $.ajax({
        type: "get",
        url: "../api/detail.php",
        data: "gid=" + gid,
        success: function (str) {
            var arr = JSON.parse(str);
            console.log(arr);
            gimg = arr[0].imgsrc;
            console.log(gimg);

            $('.imgbox img').attr('src', arr[0].imgsrc);
            $('.bigimg img').attr('src', arr[0].imgsrc);

            $('.imglist img').eq(0).attr('src', '../img/goods/' + arr[0].gid + '/1.jpg');
            $('.imglist img').eq(1).attr('src', '../img/goods/' + arr[0].gid + '/2.jpg');
            $('.imglist img').eq(2).attr('src', '../img/goods/' + arr[0].gid + '/3.jpg');
            $('.imglist img').eq(3).attr('src', '../img/goods/' + arr[0].gid + '/4.jpg');
            $('.imglist img').eq(4).attr('src', '../img/goods/' + arr[0].gid + '/5.jpg');

            $('.goodname').html(arr[0].name);
            $('.summary').html(arr[0].intro);
            $('.price').html(arr[0].price);

            $('.intro img').eq(0).attr('src', '../img/goods/d' + arr[0].gid + '/1.jpg');
            $('.intro img').eq(1).attr('src', '../img/goods/d' + arr[0].gid + '/2.jpg');
            $('.intro img').eq(2).attr('src', '../img/goods/d' + arr[0].gid + '/3.jpg');

            $('title').html(arr[0].name + '-小米有品');
        }
    });

    //获取购物车数量
    var thisNum = 0

    function getCartNum() {
        $.ajax({
            type: "post",
            url: "../api/getcartnum.php",
            data: "user=" + user + "&gid=" + gid,
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

    getCartNum();

    // 添加到购物车
    $('.addcart').click(function () {
        if (user) {
            var cart_num = Number($('.cart_info').html());
            var good_num = Number($('.count-input').val());
            alert('已添加到购物车');
            // console.log(thisNum);
            console.log($('.price').html());

            $.ajax({
                type: "post",
                url: "../api/addcart.php",
                data: "gid=" + gid + "&gname=" + $('.goodname').html() + "&gprice=" + $('.price').html() + "&gimg=" + gimg + "&gnum=" + good_num + "&user=" + user + "&has=" + thisNum,
                success: function (str) {
                    getCartNum();
                    // $('.cart_info').html(str);
                }
            });

        } else {
            var good = setCookie('gid', gid);
            if (confirm('你还没有登陆,现在登录吗？')) {
                location.href = '../html/login.html';
            }
        }
    });

    //图片切换
    function cli_src(node) {
        //边框变色
        node.addClass('active').siblings().removeClass('active');
        //改变主图
        $('.imgbox img').attr('src', node.find('img').attr('src'));
        $('.bigimg img').attr('src', node.find('img').attr('src'));
    }

    //获取选中节点的下标
    var ind = null;

    function active_ind() {
        $('.imglist li').each(function (index, el) {
            //判断是否含有class active
            if ($(el).hasClass("active")) {
                ind = index;
            }
        })
    }

    //点击选中节点
    var num = $('.imglist li').length;
    $('.imglist li').click(function (event) {
        console.log($(this));
        cli_src($(this));
        var ptop = $(this).offset().top - $('.imglist').offset().top;
        var pindex = $(this).index();
        //alert(ptop);
        if (ptop == 0) {
            if (pindex !== 0) {
                $('.imglist ul').stop().animate({
                    top: ((pindex - 1) * -111)
                });
            }
        }
        if (ptop == 333) {
            if (pindex !== $('.imglist li').length - 1)
                $('.imglist ul').stop().animate({
                    top: ((pindex - 2) * -111)
                });
        }
    });

    $('.arrow-up').click(function (event) {
        var thumb_top = $('.imglist').offset().top;
        var container_top = $('.imglist ul').offset().top;
        active_ind();
        if (ind != 0) {
            cli_src($('.imglist li').eq(ind - 1));
        }

        var ind_off = $('.imglist li').eq(ind).offset().top;
        if (thumb_top - container_top > 0 && ind_off == 296) {
            let top = $('.imglist ul').css('top');
            top = parseInt(top);
            $('.imglist ul').stop().animate({
                top: (top + 111)
            });
        }
    });

    $('.arrow-down').click(function (event) {
        var thumb_top = $('.imglist').offset().top;
        var container_top = $('.imglist ul').offset().top;
        active_ind();
        if (ind != num) {
            cli_src($('.imglist li').eq(ind + 1));
        }

        var ind_off = $('.imglist li').eq(ind).offset().top;
        if (thumb_top - container_top < 222 && ind_off == 407) {
            let top = $('.imglist ul').css('top');
            top = parseInt(top);
            $('.imglist ul').stop().animate({
                top: (top - 111)
            });
        }
    });

    //主图放大镜效果
    $('.imgbox').on('mouseenter', function (e) {

        $('.slider').css('display', 'block');
        $('.bigimg').css('display', 'block');

        $('.imgbox').on('mousemove', function (e) {
            var sleft = e.pageX - $('.imgbox').offset().left - ($('.slider').width()) / 2;
            if (sleft < 0) {
                sleft = 0;
            } else if (sleft > $('.imgbox').width() - ($('.slider').width())) {
                sleft = $('.imgbox').width() - $('.slider').width();
            }
            var stop = e.pageY - $('.imgbox').offset().top - ($('.slider').height()) / 2;
            if (stop < 0) {
                stop = 0;
            } else if (stop > $('.imgbox').height() - ($('.slider').height())) {
                stop = $('.imgbox').height() - $('.slider').height();
            }
            $('.slider').css('left', sleft + 'px');
            $('.slider').css('top', stop + 'px');

            var bX = $('.imgbox').width() / ($('.imgbox').width() - $('.slider').width());
            var bY = $('.imgbox').height() / ($('.imgbox').height() - $('.slider').height());


            $('.bigimg img').css('left', (-sleft * bX) + 'px');
            $('.bigimg img').css('top', (-stop * bY) + 'px');
        });
    });
    $('.imgbox').on('mouseleave', function (event) {
        $('.slider').css('display', 'none');
        $('.bigimg').css('display', 'none');

        $('.imgbox').on('mousemove', function (e) {});
    });

    //点击 + -
    $('.count-btn').click(function () {
        var num = $('.count-input').val();
        if (num > 1) {
            num--;
            $('.count-input').val(num);
        }
        if (num == 1) {
            $('.count-btn i').css('background-position', '0 -1390px');
        }
    });

    $('.count-btn-active').click(function () {
        var num = $('.count-input').val();
        num++
        $('.count-input').val(num);
        $('.count-btn i').css('background-position', '0 -1356px');
    });


    //版本选择
    $('.color li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        console.log($(this).text());
        var color = $('<span></span>').text(' ' + $(this).text())
        $('.goodname').append(color);
        $('.goodname span').last().siblings().remove();
    });

    //固定tag
    $(window).on("scroll", function () {
        var dist = $(window).scrollTop();
        var oNav = $('.nav-title')[0];
        if (dist > 557) {
            oNav.style.position = 'fixed';
            oNav.style.top = '52px';
        } else {
            oNav.style.position = 'static';
        }
    });

    $('.product .intro').siblings().css('display', 'none');

    //点击切换详细信息
    $('.nav-title li').click(function (event) {
        let num = $(this).index();
        $('.nav-arr').stop().animate({
            left: (128 * num)
        }, .2);
        $('.product>div').css('display', 'none');
        $('.product>div').eq(num).css('display', 'block');
    });


});