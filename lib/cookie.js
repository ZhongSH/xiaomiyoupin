//设置Cookie
function setCookie(key, val, iday) {
    //key:键名  val:键值  iday：失效时间
    //document.cookie = 'name=malin;expires=date;path=/';
    var now = new Date();
    now.setDate(now.getDate() + iday); //iday==5:5天后失效，-1：立即失效
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

function getCookie(key) {
    var str = document.cookie; //name=malin; psw=123456
    var arr = str.split('; '); //[name=malin,psw=123456]
    for (var ele of arr) {
        var arr2 = ele.split('='); //[name,malin]
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

function removeCookie(key) {
    setCookie(key, '', -1);
}