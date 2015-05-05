$('#button').onclick = function() {
    var value = $("#hobby").value;
    var tempArray = value.split(/[,， 　、;\n]/);

    var multiSelectHobby = $('#select-hobby');

    tempArray.forEach(function(element, index, array) {
        array[index] = element.trim();
    });

    var showArray = tempArray.filter(function(element, index, array) {
        if (element === '' || array.indexOf(element) < index) {
            return false;
        }

        return true;
    });

    if (showArray.length > 10 || showArray.length <= 0) {
        $('#caution-text').innerHTML = '错误！重新输入！';
        return false;
    }

    $('#caution-text').innerHTML = '';
    multiSelectHobby.innerHTML = "";

    for (var i = 0; i < showArray.length; i++) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = "hobby-checkbox";
        label.appendChild(input);
        label.appendChild(document.createTextNode(showArray[i]));
        multiSelectHobby.appendChild(label);
    }

};