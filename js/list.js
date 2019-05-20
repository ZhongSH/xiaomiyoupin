$(function () {

    var title = decodeURI(location.search.slice(1));
    console.log(title);
    if (title) {
        $('.path').html(title);
        $('title').html(title + '-小米有品');
    } else {
        $('.path').html('所有商品');
    }

    if (getCookie('val')) {
        console.log(getCookie('val'));
        var val = "'%" + getCookie('val') + "%'";
        $('.list-nav').css('display', 'none');
        $('.search-tit').css('display', 'block');
        $('.group h2').css('display', 'none');
    } else {
        val = '';
    }

    var ipage = 1;
    var num = 8;
    var pages = 0;

    function init() {
        $.ajax({
            type: "get",
            url: "../api/getlist.php",
            data: "val=" + val + "&page=" + ipage + "&num=" + num,
            success: function (str) {
                console.log(str);
                var arr = JSON.parse(str);
                var res = arr.goodslist.map(function (item) {
                    return `
                            <li data-id="${item.gid}">
                                <a href="#"><img src="${item.imgsrc}" alt=""></a>
                                <h3>${item.name}</h3>
                                <p>${item.intro}</p>
                                <span>${item.price}</span>
                            </li>
                        `
                }).join('');

                $('#goodslist').append(res);
                setCookie('val', val, -1);

                $('.search-tit span').html($('#goodslist li').size());

                pages = Math.ceil(arr.total / arr.num);

                $('#goodslist li').on('click', function () {
                    console.log($(this).data('id'));
                    dhtml = 'detail.html?' + $(this).data('id');
                    open(dhtml);
                });
            }
        });
    }

    init();

    var isok = true
    $(window).scroll(function () {
        var iH = $('#goodslist').outerHeight() - $(window).innerHeight() + $('#goodslist').offset().top;
        if ($(window).scrollTop() >= iH) {
            if (ipage == pages) {
                return;
            } else {
                if (isok) {
                    isok = false;
                    ipage++;
                    setTimeout(function () {
                        init(); //开关的功能：阻止临界点的多次触发，造成一次加载多页的bug
                        isok = true;
                    }, 1000);
                }
            }
        }
    })

})