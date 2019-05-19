$(function () {

    //随机验证码
    function ranCode() {
        var html = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var num = "";
        for (i = 0; i < 4; i++) {
            var ran = parseInt(Math.random() * html.length);
            num += html[ran];
        }
        return num;
    }

    //初始化
    function codeVal() {
        $('#code').val(ranCode())
    }

    codeVal();

    //点击切换
    $('#code').click(function () {
        codeVal();
    });

    // //设置Cookie
    // function setCookie(key, val, iday) {
    //     //key:键名  val:键值  iday：失效时间
    //     //document.cookie = 'name=malin;expires=date;path=/';
    //     var now = new Date();
    //     now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
    //     document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
    // }

    // function getCookie(key) {
    //     var str = document.cookie; //name=malin; psw=123456
    //     var arr = str.split('; '); //[name=malin,psw=123456]
    //     for (var ele of arr) {
    //         var arr2 = ele.split('='); //[name,malin]
    //         if (key == arr2[0]) {
    //             return arr2[1];
    //         }
    //     }
    // }

    // function removeCookie(key) {
    //     setCookie(key, '', -1);
    // }

    $('#username,#password,#incode').focus(function (event) {
        $(this).css('border-color', '#e0e0e0');
        $('.tip').css('display', 'none');
    });


    $('#loginbtn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var judge = true;

        if (!username) {
            $('.tip').css('display', 'block');
            $('.tip span').html('请输入用户名');
            $('#username').css('border-color', '#f56700');
            judge = false;
        } else if (!password) {
            $('.tip').css('display', 'block');
            $('.tip span').html('请输入密码');
            $('#password').css('border-color', '#f56700');
            judge = false;
        } else if (!$('#incode').val()) {
            $('.tip').css('display', 'block');
            $('.tip span').html('请输入验证码');
            $('#incode').css('border-color', '#f56700');
            judge = false;
        }

        if (judge) {
            //验证验证码
            if ($('#incode').val().toLowerCase() == $('#code').val().toLowerCase()) {

                if (getCookie('user')) {
                    alert('你应经登陆了');
                    location.href = '../index.html';
                } else {
                    $.ajax({
                        type: 'post',
                        url: '../api/login.php',
                        data: 'name=' + username + '&psw=' + password,
                        success: function (str) {
                            console.log(str);
                            if (str == 'yes') {
                                setCookie('user', username, 1);
                                if (getCookie('gid')) {
                                    location.href = '../html/detail.html?' + getCookie('gid');
                                } else {
                                    location.href = '../index.html';
                                }
                            } else {
                                $('.tip').css('display', 'block');
                                $('.tip span').html('用户名或密码不正确');
                            }
                        }
                    });
                }
            } else {
                $('.tip').css('display', 'block');
                $('#incode').val('');
                $('#incode').css('border-color', '#f56700');
                $('.tip span').html('验证码不正确');
                codeVal();
            }
        }
    });
});