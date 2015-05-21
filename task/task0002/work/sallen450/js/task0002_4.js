/**
 * Created by jiqinghua on 15/5/5.
 */

//todo 与后端交互
    //todo 需要重构
var suggestData = ['Simon', 'Erik', 'Kener', 'Some', 'Siri'];

function createSuggestItem(value) {
    var suggestList = document.getElementById('suggest-list');
    var item = document.createElement("li");
    item.innerHTML = value;
    suggestList.appendChild(item);

    //q: 这里的日志，为什么会打印出全部的li元素，但是下断点调试，就会正常打印
    //a: 控制台里面的折叠，是点击展开的“三角号” 的时候，才去读取的这个ul元素的子元素，而不是保持执行时的状态，（所以当点击的时候，代码都
    //   已经执行完了，所以点击输出的三个元素，实际上都是展示执行后的，console打印出来一个ul对象，实际上点开的时候显示 等价于
    //   当时调试器elment标签下这个ul的子元素个数，展开后这个调试ul折叠的内容就不会再变了，即使ul中的li元素还在增加）
    //console.log(suggestList);
}

document.getElementById("suggest-list").onclick = function () {
    var event = arguments[0] || window.event;
    var target = event.srcElement ? event.srcElement : event.target;        //srcElement兼容IE

    document.getElementById("suggest-input").value = target.innerHTML;
    document.getElementById("suggest-list").innerHTML = "";
};

var focusedItem = null;
//todo 这里应该有更好的方法，后续学习后，优化一下
//todo 思路：事件添加到父元素上，事件委托
document.getElementById("suggest-box").onkeyup = function () {
    var event = arguments[0] || window.event;
    var suggestList = document.getElementById('suggest-list');

    switch (event.keyCode) {
        //up
        case 38:
            if (focusedItem === null) {
                focusedItem = suggestList.firstElementChild;
            }
            else if (focusedItem !== null && focusedItem.previousElementSibling === null) {
                focusedItem.className = "";
                focusedItem = suggestList.lastElementChild;
            }
            else {
                focusedItem.className = "";
                focusedItem = focusedItem.previousElementSibling;
            }

            focusedItem.className = "hover";
            break;
        //down
        case 40:
            if (focusedItem === null) {
                focusedItem = suggestList.firstElementChild;
            }
            else if (focusedItem !== null && focusedItem.nextElementSibling === null) {
                focusedItem.className = "";
                focusedItem = suggestList.firstElementChild;
            }
            else {
                focusedItem.className = "";
                focusedItem = focusedItem.nextElementSibling;
            }

            focusedItem.className = "hover";
            break;
        //Enter
        case 13:
            document.getElementById("suggest-input").value = focusedItem.innerHTML;
            suggestList.innerHTML = "";
            break;
        default :
            document.getElementById("suggest-list").innerHTML = "";
            var inputText = document.getElementById('suggest-input').value;
            var pattern = new RegExp("^" + inputText + ".*", "i");
            suggestData.forEach(function (element) {
                if (pattern.test(element) && inputText !== "") {
                    createSuggestItem(element);
                }
            });
            break;
    }

};

