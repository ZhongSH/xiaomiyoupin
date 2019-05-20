$(function () {

    console.log(getCookie('user'));

    if (getCookie('user')) {

        var user = "'" + getCookie('user') + "'";

        var getlist = new Promise(function (resolve) {
            $.ajax({
                type: "post",
                url: "../api/cartlist.php",
                data: "user=" + user,
                success: function (str) {
                    console.log(str);
                    var arr = JSON.parse(str);
                    resolve(arr)
                }
            });
        })

        getlist.then(function (data) {

            var res = data.cartlist.map(function (item) {
                return `
                        <div class="good-items clearfix" data-id="${item.cid}">
                            <div class="goodselect fl">
                                <a class="select-btn"></a>
                            </div>
                            <div class="goodimg fl">
                                <img src="${item.gimg}" alt="">
                            </div>
                            <div class="goodname fl" data-id="${item.gid}">
                                <p>${item.gname}</p>
                            </div>
                            <div class="goodprice fl">
                                <span>${item.gprice}</span>
                            </div>
                            <div class="goodnum fl">
                                <div class="num-edit">
                                    <div>
                                        <a href="javascript:void(0)" class="num-sub">-</a>
                                        <span class="text">${item.gnum}</span>
                                        <a href="javascript:void(0)" class="num-add">+</a>
                                    </div>
                                </div>
                            </div>
                            <div class="goodtotal fl">
                                <span>${item.gnum*item.gprice}</span>
                            </div>
                            <div class="gooddel fl">
                                <a href="javascript:void(0)" class="del"></a>
                            </div>
                        </div>
                        `
            }).join('')
            $('.main-content').html(res);

            console.log($('.good-items').size());

            if (!$('.good-items').size()) {
                $('.no-goods').css('display', 'block');
                $('.main-title').css('display', 'none');
                $('.main-content').css('display', 'none');
                $('.main-foot').css('display', 'none');
            }

            $('.goodname').on('click', function () {
                console.log($(this).data('id'));
                location.href = '../html/detail.html?' + $(this).data('id');
            });

            //删除商品
            $('.good-items').on('click', '.del', function () {
                var cid = $(this).parent().parent().data('id');

                if (confirm('确定要从购物车移除该商品吗？')) {
                    $.ajax({
                        type: "post",
                        url: "../api/cartdel.php",
                        data: "cid=" + cid,
                        success: function (response) {

                        }
                    });
                    $(this).parent().parent().remove();
                    cartnum();
                }

                if (!$('.good-items').size()) {
                    $('.no-goods').css('display', 'block');
                    $('.main-title').css('display', 'none');
                    $('.main-content').css('display', 'none');
                    $('.main-foot').css('display', 'none');
                }
            });

            //点击+-
            $('.good-items').on('click', '.num-add', function () {
                var cid = $(this).parent().parent().parent().parent().data('id');
                var num = $(this).prev().html();
                num++;
                $(this).prev().html(num);

                var price = $(this).parent().parent().parent().parent().find('.goodprice span');

                var total = $(this).parent().parent().parent().parent().find('.goodtotal span');
                console.log(total);

                total.html(price.html() * num);

                $.ajax({
                    type: "post",
                    url: "../api/cartnum.php",
                    data: "cid=" + cid + "&num=" + num,
                    success: function (response) {

                    }
                });
                cartnum();
                all();
            });

            $('.good-items').on('click', '.num-sub', function () {
                var cid = $(this).parent().parent().parent().parent().data('id');
                var num = $(this).next().html();
                num--;
                if (num <= 1) {
                    num = 1;
                } else {

                }
                $(this).next().html(num);
                console.log(cid);

                var price = $(this).parent().parent().parent().parent().find('.goodprice span')

                var total = $(this).parent().parent().parent().parent().find('.goodtotal span');
                console.log(total);

                total.html(price.html() * num);

                $.ajax({
                    type: "post",
                    url: "../api/cartnum.php",
                    data: "cid=" + cid + "&num=" + num,
                    success: function (response) {

                    }
                });
                cartnum();
                all();
            });


            //全选
            $('.main-title,.main-foot').on('click', '.select-btn', function () {
                if ($(this).hasClass('select')) {
                    $(this).removeClass('select');
                    $('.main-content .select-btn').removeClass('select');
                } else {
                    $(this).addClass('select');
                    $('.main-content .select-btn').addClass('select')
                }
                all();
            });

            //单选
            $('.main-content').on('click', '.select-btn', function () {

                if ($(this).hasClass('select')) {
                    $(this).removeClass('select');
                } else {
                    $(this).addClass('select');
                }

                all();
            });

            var arr = [];

            function all(now) {
                var len = $('.good-items').size();
                var check = $('.main-content .select-btn.select').size();

                if (len == check) {
                    $('.main-title .select-btn').addClass('select');
                    $('.main-foot .select-btn').addClass('select');
                } else {
                    $('.main-title .select-btn').removeClass('select');
                    $('.main-foot .select-btn').removeClass('select');
                }

                $('.select-num span').html(check);

                $('.main-content .select-btn').each(function (i, item) {
                    if ($(item).hasClass('select')) {
                        arr.push(i);
                    }
                });

                var num = 0;
                var price = 0;
                arr.forEach(function (item) { //0 1 
                    num += $('.goodnum .text').eq(item).html() * 1;
                    price += $('.goodtotal span').eq(item).html() * 1;
                });

                $('.select-num span').html(num);
                arr = [];
                $('.totol-price .totol').html(price.toFixed(2));

            }

            function cartnum() {
                var num = 0;
                var len = $('.good-items').size();
                for (var i = 0; i < len; i++) {
                    num += $('.goodnum .text').eq(i).html() * 1;
                }
                $('.cart_info').html(num);
            }
        });
    } else {
        if (!$('.good-items').size()) {
            $('.no-goods').css('display', 'block');
            $('.no-goods p,.no-goods a').css('display', 'none');
            $('.no-goods .p2,.no-goods .a2').css('display', 'block');
            $('.main-title').css('display', 'none');
            $('.main-content').css('display', 'none');
            $('.main-foot').css('display', 'none');
        }
    }

});