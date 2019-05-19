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
            location.href = 'index.html';
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
        });

        //搜索
        $('.icon-search').click(function () {
            var val = $('#search-val').val();
            location.href = './html/list.html';
            setCookie('val', val);
        });
    
        //点击购物车
        $('.shopping').click(function () {
            if (getCookie('user')) {
                location.href = './html/cart.html';
            } else if (confirm('你还没有登陆,现在登录吗？')) {
                location.href = './html/login.html';
            }
        });
    
        //获取购物车数量
        var thisNum = 0
        var gid = 1;
    
        function getCartNum() {
            $.ajax({
                type: "post",
                url: "./api/getcartnum.php",
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

    $('#nav li').on('click', 'a', function () {
        location.href = './html/list.html?' + $(this).text();
    });

    //生成二级菜单
    $('#nav li').on('mouseenter', function () {
        var group1 = $(this).find('a').eq(0).html();
        var group2 = $(this).find('a').eq(1).html();

        $(`
            <div class="nav2">
                <div class="group clearfix">
                    <p class="title">${group1}</p>
                    <ul>

                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                    </ul>
                </div>
                <div class="group clearfix">
                    <p class="title">${group2}</p>
                    <ul>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                        <li class="item">
                            <img src="./img/hot1.jpg" alt="">
                            <span>商品</span>
                        </li>
                    </ul>
                </div>
            </div>
        `).appendTo($(this));
    });

    $('#nav li').on('mouseleave', function () {
        $('#nav .nav2').remove();
    });

    //轮播图
    var swiper = $('.swiper').eq(0);
    var ul = swiper.find("ul");
    var oBtns = $(".swiper").find("ol").find("span");

    var index = 0;

    // 复制第一张图
    ul.append(ul.children().eq(0).clone(true));

    // 获取图片个数
    var len = ul.children().size();

    // 设置ul宽度
    ul.css('width', swiper.width() * len + 'px');
    console.log(ul.css('width'));

    // 自动播放
    var timer1 = setInterval(autoPlay, 2000);

    swiper.on("mouseenter", function () {
        clearInterval(timer1);
    })

    swiper.on("mouseleave", function () {
        timer1 = setInterval(autoPlay, 2000);
    })

    // 点击切换
    oBtns.click(function () {
        index = $(this).index();
        show();
    })

    // 上一张
    $('.swiper .scr_arrow_l').click(function () {
        index--;
        show();
    });

    // 下一张
    $('.swiper .scr_arrow_r').click(function () {
        index++;
        show();
        console.log(index);
    });

    // 自动切换
    function autoPlay() {
        index++;
        show()
    }

    function show() {
        ul.stop();
        if (index >= len) {
            ul.css('left', '0');
            oBtns.eq(0).attr('class', 'active');
            index = 1;
        } else if (index < 0) {
            index = len - 2;
        }

        // 切换
        ul.animate({
            left: -index * swiper.width()
        });

        //排他
        oBtns.attr('class', '');

        if (index == len - 1) {
            oBtns.eq(0).attr('class', 'active');
        } else {
            oBtns.eq(index).attr('class', 'active');
        }
    }


    // 限时购
    var startTime = '2019-5-25 00:29:00';
    var start = Date.parse(startTime);

    function showTime() {
        var now = Date.now();
        var dix = parseInt((start - now) / 1000);

        if (dix <= 0) {
            clearInterval(timer2);
        } else {
            var time = getTime(dix);
            $('#hours').html(toDb(time.hours));
            $('#mins').html(toDb(time.mins));
            $('#secs').html(toDb(time.secs));
        }
    }

    var timer2 = setInterval(showTime, 1000)

    function getTime(time) {
        var sec = time % 60;
        var min = parseInt(time / 60) % 60;
        var hour = parseInt(time / 60 / 60) % 24;
        var day = parseInt(time / 60 / 60 / 24);
        return {
            secs: sec,
            mins: min,
            hours: hour,
            days: day
        }
    }

    function toDb(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return '' + num;
        }
    }


    // 左右切换
    function listTab(node, n) {
        node.animate({
            left: n * -271
        }, function () {});
    }

    //推荐左右切换
    var rec_n = 0;
    $('#recommend .scr_arrow_l').click(function () {
        console.log(123)
        if (rec_n > 0) {
            rec_n--;
            listTab($('#recomlist'), rec_n);
        }
    });
    $('#recommend .scr_arrow_r').click(function () {
        console.log(123)
        if (rec_n < ($('#recomlist li').size() - 4)) {
            rec_n++;
            listTab($('#recomlist'), rec_n);
        }
    });
});