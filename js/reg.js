$(function () {

    // 用户名

    var userok = false;
    $('#username').focus(function () {
        $(this).css('border-color', '#e0e0e0');
        $('#name_er span').html('');
        $('#name_er').css('display', 'none');
    });

    $('#username').blur(function () {
        if ($('#username').val()) {
            $.ajax({
                type: "post",
                url: "../api/checkname.php",
                data: 'name=' + $('#username').val(),
                success: function (str) {
                    if (str == 'yes') {
                        userok = true
                    } else {
                        $('#username').css('border-color', '#ff6700');
                        $('#name_er').css('display', 'block');
                        $('#name_er span').html('该用户名已被注册');
                    }
                }
            });
        } else {
            $('#username').css('border-color', '#e0e0e0');
            $('#name_er').css('display', 'none');
            $('#name_er span').html('');
        }
    });

    // 手机
    var phoneok = false
    $('#phone').keypress(function () {
        $(this).css('border-color', '#e0e0e0');
        // $(this).parent().css('border-color', '#e0e0e0');
        $('#phone_er span').html('');
        $('#phone_er').css('display', 'none');
    })

    $('#phone').blur(function () {
        var phonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!phonereg.test($('#phone').val())) {
            if ($('#phone').val()) {
                $('#phone_er span').html('手机号码格式错误');
            } else {
                $('#phone_er span').html('请输入手机号码');
            }
            $('#phone').css('border-color', '#ff6700');
            $('#phone_er').css('display', 'block');
        } else {
            $.ajax({
                type: "post",
                url: "../api/checkphone.php",
                data: 'phone=' + $('#phone').val(),
                success: function (str) {
                    if (str == 'yes') {
                        phoneok = true
                    } else {
                        $('#phone').css('border-color', '#ff6700');
                        $('#phone_er').css('display', 'block');
                        $('#phone_er span').html('该手机已被注册');
                    }
                }
            });
        }
    });

    // 密码
    $('#password').focus(function () {
        $(this).css('border-color', '#e0e0e0');
        $('#psw_er span').html('');
        $('#psw_er').css('display', 'none');
    });

    $('#password2').focus(function () {
        $(this).css('border-color', '#e0e0e0');
        $('#psw_er2 span').html('');
        $('#psw_er2').css('display', 'none');
    });

    var pswok = false
    $('#password').blur(function () {
        if ($('#password').val()) {
            var pswreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if (!pswreg.test($('#password').val())) {
                $('#psw_er span').html('密码长度8~16位,必须包含数字和字母');
                $('#password').css('border-color', '#ff6700');
                $('#psw_er').css('display', 'block');
            } else {
                pswok = true;
            }
        } else {
            $('#psw_er').css('display', 'block');
            $('#psw_er span').html('请输入密码');
            $('#password').css('border-color', '#f56700');
        }
    });

    // 二次密码
    $('#password2').blur(function (event) {
        if ($('#password2').val()) {
            if ($('#password').val() !== $('#password2').val()) {
                $('#psw_er2').css('display', 'block');
                $('#psw_er2 span').html('密码输入不一致');
                $('#password2').css('border-color', '#f56700');
                pswok = false;
            } else {
                pswok = true;;
            }
        } else {
            $('#psw_er2').css('display', 'block');
            $('#psw_er2 span').html('请输入确认密码');
            $('#password2').css('border-color', '#f56700');
            pswok = false;

            if (!$('#password').val()) {
                $('#psw_er2').css('display', 'none');
                $('#password2').css('border-color', '#e0e0e0');
            }
        }
    });

    $('#sendcode').click(function () {
        var num = 60;

        function showTime() {
            if (num <= 0) {
                $('#sendcode').removeAttr('disabled');
                $('#sendcode').val('重新发送');
                clearInterval(timer)
            } else {
                $('#sendcode').attr('disabled', 'disabled');
                $('#sendcode').val('重新发送' + '(' + num + ')');
                num--;
            }
        }

        showTime();
        var timer = setInterval(showTime, 1000);

        // $.ajax({
        //     type: "post",
        //     url: "../api/duanxin.php",
        //     data: {
        //         phone: $('#phone').val()
        //     },
        //     async: true,
        //     success: function (str) {
        //         var arr = JSON.parse(str);
        //         console.log(arr.phonecode);
        //     }
        // });

    });

    $('#regbtn').click(function () {

        console.log(userok, pswok, phoneok);

        if (userok && pswok && phoneok) {
            $.ajax({
                type: "post",
                url: "../api/reg.php",
                data: 'name=' + $('#username').val() + '&psw=' + $('#password').val() + '&phone=' + $('#phone').val(),
                success: function (str) {
                    console.log(str);
                    alert('注册成功');
                    location.href = '../html/login.html';
                }
            });
        }

    });
})