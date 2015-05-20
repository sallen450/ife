/**
 * @description 以入参数组的内容为基础，动态创建并添加复选项
 * @param {Array} showArray - checkbox content array
 */
function showLabel(showArray) {
    for (var i = 0; i < showArray.length; i++) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = "hobby-checkbox";
        label.appendChild(input);
        label.appendChild(document.createTextNode(showArray[i]));
        $('#select-hobby').appendChild(label);
    }
}

$('#button').onclick = function() {
    var showArray = $("#hobby").value.split(/[,， 　、;\n]/);

    showArray.forEach(function(element, index, array) {
        array[index] = element.trim();
    });


    showArray = showArray.filter(function(element, index, array) {
        if (element === '' || array.indexOf(element) < index) {
            return false;
        }

        return true;
    });

    if (showArray.length > 10 || showArray.length <= 0) {
        $('#caution-text').innerHTML = '错误！重新输入！';
        return false;
    }

    $('#select-hobby').innerHTML = '';
    $('#caution-text').innerHTML = '';
    if (showArray.length > 10 || showArray.length <= 0) {
        $('#caution-text').innerHTML = '错误！重新输入！';
        return false;
    }
    else {
        showLabel(showArray);
    }

};

