/**
 * Created by jiqinghua on 15/5/3.
 */

var tid = undefined;
var spentTime = undefined;
var showTime = '';
var regexp = new RegExp(/^(\d{4}-\d{2}-\d{2})[ ]?(\d{2}:\d{2}:\d{2})?$/);
var endTime = null;

/**
 * @description 倒计时功能
 */

function clock() {
    if (spentTime <= 0) {
        clearInterval(tid);
        return;
    }

    var tempTime = spentTime;
    var day = parseInt(tempTime/86400000);
    tempTime = tempTime % 86400000;
    var hour = parseInt(tempTime / 3600000);
    tempTime = tempTime % 3600000;
    var minute = parseInt(tempTime / 60000);
    tempTime = tempTime % 60000;
    var second = parseInt(tempTime / 1000);
    showTime = "距离" + endTime + "还有" + day + "天" + hour + "小时" + minute + "分" + second + "秒";
    $('#show').innerHTML = showTime;
    spentTime -= 1000;
}

$('#begin').onclick = function() {
    //防止多次点击按钮产生问题
    if (endTime === null) {
        endTime = $('#end-time').value.match(regexp);

        if (endTime !== null) {
            endTime = endTime[1] + " " + (endTime[2] || "00:00:00");

            spentTime = Date.parse(endTime) - Date.now();
            if (spentTime > 0) {
                tid = setInterval(clock, 1000);
            }
        }
        else {
            alert('Invalid input');
        }
    }
};