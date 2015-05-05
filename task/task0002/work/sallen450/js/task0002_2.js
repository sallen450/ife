/**
 * Created by jiqinghua on 15/5/3.
 */

$('#begin').onclick = function() {
    var endTime = $('#end-time').value;
    var spentTime = undefined;
    var showTime = '';

    if (!isNaN(Date.parse(endTime)) && /^\d{4}-\d{2}-\d{2}$/.test(endTime)) {
        spentTime = Date.parse(endTime + " 00:00:00") - Date.now();
        if (spentTime > 0) {
            setInterval(function() {
                var tempTime = spentTime;
                var day = parseInt(tempTime/86400000);
                tempTime = tempTime % 86400000;
                var hour = parseInt(tempTime / 3600000);
                tempTime = tempTime % 3600000;
                var minute = parseInt(tempTime / 60000);
                tempTime = tempTime % 60000;
                var second = parseInt(tempTime / 1000);
                showTime = "距离" + endTime + "还有" + day + "天" + hour + "小时" + minute + "分" + second + "秒";
                $("#show").innerHTML = showTime;
                spentTime -= 1000;
            },1000);
        }
    }


};