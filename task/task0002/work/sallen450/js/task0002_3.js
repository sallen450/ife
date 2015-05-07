/**
 * Created by jiqinghua on 15/5/4.
 */

//todo 定时器用的不好
//todo 函数的作用域有点忘记了
//todo 有重复点击可能的地方，设置定时器之前要先清除定时器

//todo bug 多次连续点击一个原点，会出现不自动轮播问题

/*
 var spans = document.querySelectorAll('span');
 var imgs = document.querySelectorAll('img');
 var tid = undefined;
 var moveTid = undefined;
 var currentIndex = 0;
 var nextIndex = 1;
 var maxIndex = imgs.length - 1;
 var movedStep = 0;

 function move() {
 imgs[currentIndex].style.left = "-" + movedStep + "%";
 imgs[nextIndex].style.left = (100 - movedStep) + "%";
 console.log(imgs[currentIndex].style.left);
 console.log(imgs[nextIndex].style.left);
 if (movedStep == 100) {
 clearTimeout(moveTid);
 currentIndex = nextIndex;
 imgs[currentIndex].className = "img-active";
 spans[currentIndex].className = "circle-active";
 tid = setTimeout(changeImg, 2000);
 }
 else {
 moveTid = setTimeout(move, 1);
 movedStep++;
 }
 }

 function changeImg() {
 imgs[currentIndex].className = "";
 spans[currentIndex].className = "";
 if (currentIndex == maxIndex) {
 nextIndex = 0;
 }
 else {
 nextIndex = currentIndex + 1;
 }

 movedStep = 0;
 moveTid = setTimeout(move, 1);
 }

 for (var i = 0; i < spans.length; ++i) {
 spans[i].onclick = (function(index) {
 return function() {
 clearTimeout(moveTid);
 clearTimeout(tid);
 imgs[currentIndex].className = "";
 imgs[currentIndex].style.left = "";
 spans[currentIndex].className = "";
 currentIndex = index;
 imgs[currentIndex].className = "img-active";
 imgs[currentIndex].style.left = "";
 spans[currentIndex].className = "circle-active";
 tid = setTimeout(changeImg, 2000);
 }
 }(i));
 }

 tid = setTimeout(changeImg, 2000);
 */

/*
 todo 为何多次点击一个按钮，count一直为101
 var spans = document.querySelectorAll('span');
 var imgs = document.querySelectorAll('img');

 var moveIntervalID = undefined;     //图片移动定时器
 var waitIntervalID = undefined;     //图片自动切换间隔定时器

 var currentIndex = 0;       //当前显示的图片的index
 var maxIndex = imgs.length - 1;

 function moveLeft(nextIndex) {
 var count = 0;

 console.log("currentIndex: " + currentIndex);
 console.log("nextIndex: " + nextIndex);
 function move() {
 console.log("left count: " + count);
 if (count == 101) {
 clearTimeout(moveIntervalID);
 spans[currentIndex].className = "";
 spans[nextIndex].className = "circle-active";
 currentIndex = nextIndex;
 return;
 }
 imgs[currentIndex].style.left = -count + "%";
 imgs[nextIndex].style.left = 100 - count + "%";
 count++;
 }

 moveIntervalID = setInterval(move, 1);
 }

 function moveRight(nextIndex) {
 var count = 0;

 console.log("currentIndex: " + currentIndex);
 console.log("nextIndex: " + nextIndex);
 function move() {
 console.log("right count: " + count);
 if (count == 101) {
 console.log("count: " + count);
 clearTimeout(moveIntervalID);
 spans[currentIndex].className = "";
 spans[nextIndex].className = "circle-active";
 currentIndex = nextIndex;
 return;
 }
 imgs[currentIndex].style.left = count + "%";
 imgs[nextIndex].style.left = -100 + count + "%";
 count++;
 }

 moveIntervalID = setInterval(move, 1);
 }

 //图片切换前，将当前显示的图片left设置为0，其他的保持默认的-100%
 function preScroll() {
 for (var i = 0; i < imgs.length; i++) {
 spans[i].className = "";
 imgs[i].style.left = "";
 }

 imgs[currentIndex].style.left = "0";
 spans[currentIndex].className = "circle-active";
 }

 //返回值：要切换下一个图片的index
 function getNextIndex(direction) {
 //未传入nextIndex的情况，表示自动轮播图片
 if (direction !== 'left' || direction !== 'right') {
 direction = 'left';
 }

 if (direction === 'left') {
 if (currentIndex == maxIndex) {
 nextIndex = 0;
 }
 else {
 nextIndex = currentIndex + 1;
 }
 }
 else if (direction === 'right') {
 if (currentIndex == 0) {
 nextIndex = maxIndex
 }
 else {
 nextIndex--;
 }
 }

 return nextIndex;
 }

 function scrollImg() {
 preScroll();
 var nextIndex = getNextIndex('left');
 moveLeft(nextIndex);
 }

 for (var i = 0; i < spans.length; ++i) {
 spans[i].onclick = (function (index) {
 return function () {
 if (index > currentIndex) {
 clearInterval(moveIntervalID);
 preScroll();
 moveLeft(index);
 }
 else {
 clearInterval(moveIntervalID);
 preScroll();
 moveRight(index);
 }
 }
 }(i));
 }

 document.getElementById("slide-img").onmouseover = function () {
 preScroll();
 clearInterval(waitIntervalID);
 };

 document.getElementById("slide-img").onmouseout = function () {
 waitIntervalID = setInterval(scrollImg, 3000);
 };

 waitIntervalID = setInterval(scrollImg, 3000);

 */


var spans = document.querySelectorAll('span');
var imgs = document.querySelectorAll('img');

var moveIntervalID = undefined;     //图片移动定时器
var waitIntervalID = undefined;     //图片自动切换间隔定时器

var currentIndex = 0;       //当前显示的图片的index
var maxIndex = imgs.length - 1;

var count = 0;

//todo 为什么连续点击一个小圆点的时候，会出现count一直为101的情况，并且图片卡住，不切换
function moveLeft(nextIndex) {
    count = 0;

    console.log("currentIndex: " + currentIndex);
    console.log("nextIndex: " + nextIndex);
    function move() {
        console.log("left count: " + count);
        if (count == 101) {
            clearTimeout(moveIntervalID);
            spans[currentIndex].className = "";
            spans[nextIndex].className = "circle-active";
            currentIndex = nextIndex;
            return;
        }
        imgs[currentIndex].style.left = -count + "%";
        imgs[nextIndex].style.left = 100 - count + "%";
        count++;
    }

    moveIntervalID = setInterval(move, 1);
}

function moveRight(nextIndex) {
    count = 0;

    console.log("currentIndex: " + currentIndex);
    console.log("nextIndex: " + nextIndex);
    function move() {
        console.log("right count: " + count);
        if (count == 101) {
            console.log("count: " + count);
            clearTimeout(moveIntervalID);
            spans[currentIndex].className = "";
            spans[nextIndex].className = "circle-active";
            currentIndex = nextIndex;
            return;
        }
        imgs[currentIndex].style.left = count + "%";
        imgs[nextIndex].style.left = -100 + count + "%";
        count++;
    }

    moveIntervalID = setInterval(move, 1);
}

//图片切换前，将当前显示的图片left设置为0，其他的保持默认的-100%
function preScroll() {
    for (var i = 0; i < imgs.length; i++) {
        spans[i].className = "";
        imgs[i].style.left = "";
    }

    imgs[currentIndex].style.left = "0";
    spans[currentIndex].className = "circle-active";
}

//返回值：要切换下一个图片的index
function getNextIndex(direction) {
    //未传入nextIndex的情况，表示自动轮播图片
    if (direction !== 'left' || direction !== 'right') {
        direction = 'left';
    }

    if (direction === 'left') {
        if (currentIndex == maxIndex) {
            nextIndex = 0;
        }
        else {
            nextIndex = currentIndex + 1;
        }
    }
    else if (direction === 'right') {
        if (currentIndex == 0) {
            nextIndex = maxIndex
        }
        else {
            nextIndex--;
        }
    }

    return nextIndex;
}

function scrollImg() {
    preScroll();
    var nextIndex = getNextIndex('left');
    moveLeft(nextIndex);
}

for (var i = 0; i < spans.length; ++i) {
    spans[i].onclick = (function (index) {
        return function () {
            if (index > currentIndex) {
                clearInterval(moveIntervalID);
                preScroll();
                moveLeft(index);
            }
            else if (index < currentIndex){
                clearInterval(moveIntervalID);
                preScroll();
                moveRight(index);
            }
        }
    }(i));
}

document.getElementById("slide-img").onmouseover = function () {
    preScroll();
    clearInterval(waitIntervalID);
};

document.getElementById("slide-img").onmouseout = function () {
    waitIntervalID = setInterval(scrollImg, 3000);
};

waitIntervalID = setInterval(scrollImg, 3000);

