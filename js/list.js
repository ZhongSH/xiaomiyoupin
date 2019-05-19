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

    $.ajax({
        type: "get",
        url: "../api/getlist.php",
        data: "val=" + val,
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
            }).join('')
            $('#goodslist').html(res);
            setCookie('val', val, -1);

            $('.search-tit span').html($('#goodslist li').size());

            $('#goodslist li').on('click', function () {
                console.log($(this).data('id'));
                dhtml = 'detail.html?' + $(this).data('id');
                open(dhtml);
            });
        }
    });




})