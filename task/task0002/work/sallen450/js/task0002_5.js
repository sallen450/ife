/**
 * Created by jiqinghua on 15/5/5.
 */

var offsetX = 0;    //记录鼠标点击点，距离红色方块的左上角偏移
var offsetY = 0;
var movingElement = null;      //正在移动的元素

//todo 逻辑可以重新组织一下
//参数：一个容器内所有可移动元素的上下左右坐标，基于可视窗口
function CreateBox(boxName, top, right, bottom, left) {
    var o = new Object();
    o.elementNum = 0;
    o.clientLeft = left;
    o.clientRight = right;
    o.clientTop = top;
    o.clientBottom = bottom;
    o.box = document.getElementById(boxName);
    o.name = boxName;

    o.initElement = function (element) {
        element.parentBoxName = o.name;
        o.box.appendChild(element);
        o.elementNum++;
    };

    o.appendElement = function (movingElement) {
        movingElement.parentBoxName = o.name;
        o.box.appendChild(movingElement);
        o.elementNum++;
    };

    o.popElement = function (movingElement) {
        o.elementNum--;
        return o.box.removeChild(movingElement);
    };

    o.canAppend = function (movingElementVMiddle, movingElementHMiddle, movingElement) {
        console.log(o.name + ": " + o.clientLeft +  "<" +  movingElementHMiddle + "<" + o.clientRight);
        console.log(o.name + ": " + o.clientTop +  "<" +  movingElementVMiddle + "<" + o.clientBottom);

        if (   (movingElementHMiddle > o.clientLeft)
            && (movingElementHMiddle < o.clientRight)
            && (movingElementVMiddle > o.clientTop)
            && (movingElementVMiddle < o.clientBottom) ) {

            return true;
        }

        return false;
    };

    return o;
}

var leftBox = CreateBox('left', 30, 132, 502+30, 30);
var rightBox = CreateBox('right', 30,  30+132+60+102, 502+30, 30+102+60);



function init() {
    for (var i = 0; i < 4; i++) {
        var element = document.createElement("div");
        element.className = "sub";
        element.parentBoxName = 'left';
        leftBox.initElement(element);

        element = document.createElement("div");
        element.parentBoxName = 'right';
        element.className = "sub";
        rightBox.initElement(element);
    }
}

function resetMovingElement(element) {
    element.className = "sub";
    element.style.left = "";
    element.style.top = "";
    element.mouseDown = false;
    element = null;
}

init();
var subBoxes = document.querySelectorAll(".sub");

for(var i = 0; i < subBoxes.length; ++i) {
    subBoxes[i].onmousedown = function(event) {
        movingElement = this;
        movingElement.mouseDown = true;         //这个不可以用全局变量，否则会导致在d1中mousedown、 d2中mouseup的情况。现象就是不用按下鼠标，移动到d1上就会移动d1.

        offsetX = event.offsetX;
        offsetY = event.offsetY;

        this.className = "moving " + this.className;
        this.style.left = (event.pageX - offsetX) + "px";
        this.style.top = (event.pageY - offsetY) + "px";
    };

    //这里mousemove的对象不应该设置到subBoxs[i]上，否则鼠标在div以外松开（拖动过快，div没跟上的情况），不会响应mouseup事件。

    //所以这里需要设置到document上
    document.onmouseup = function(event) {
        if (leftBox.canAppend((event.pageY - offsetY + movingElement.clientHeight / 2), (event.pageX - offsetX + movingElement.clientWidth / 2), movingElement) && leftBox.name !== movingElement.parentBoxName) {
            rightBox.popElement(movingElement);
            leftBox.appendElement(movingElement);
        }
        else if(rightBox.canAppend((event.pageY - offsetY + movingElement.clientHeight / 2), (event.pageX - offsetX + movingElement.clientWidth / 2), movingElement) && rightBox.name !== movingElement.parentBoxName) {
            leftBox.popElement(movingElement);
            rightBox.appendElement(movingElement);
        }
        resetMovingElement(movingElement);
    };


    document.onmousemove = function(event) {
        if (movingElement !== null && movingElement.mouseDown === true) {
            movingElement.style.left = (event.pageX - offsetX) + "px";
            movingElement.style.top = (event.pageY - offsetY) + "px";
        }
    };
}

