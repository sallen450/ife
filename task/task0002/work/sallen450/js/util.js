/**
 * Created by jiqinghua on 15/5/3.
 */

/**
 * Created by jiqinghua on 15/5/3.
 */

/**
 * Created by jiqinghua on 15/4/29.
 */


// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (typeof(arr) === 'object' && arr.constructor === Array) {
        return true;
    }

    return false;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if (typeof(fn) === 'function') {
        return true;
    }

    return false;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
//todo 不熟练 需要巩固
function cloneObject(src) {
    var srcType = typeof src;
    var retObject = undefined;
    if (srcType === 'number' || srcType === 'string' || srcType === 'boolean' || src === null || src === undefined) {
        retObject = src;
    }
    else if (Array.isArray(src)) {
        retObject = [];
        src.forEach(function (element) {
            retObject.push(cloneObject(element));
        });
    }
    else if (srcType === 'object' && src.constructor === Date) {
        return new Date(src.parse());
    }
    else if (srcType === 'object') {
        retObject = {};
        for (var index in src) {
            if (src.hasOwnProperty(index)) {
                retObject[index] = cloneObject(src[index]);
            }
        }
    }
    return retObject;
}

// 测试用例：
/*
 var srcObj = {
 a: 1,
 b: {
 b1: ["hello", "hi"],
 b2: "JavaScript"
 }
 };
 var abObj = srcObj;
 var tarObj = cloneObject(srcObj);

 srcObj.a = 2;
 srcObj.b.b1[0] = "HELLO";

 console.log(abObj.a);
 console.log(abObj.b.b1[0]);

 console.log(tarObj.a);      // 1
 console.log(tarObj.b.b1[0]);    // "hello"
 */

function uniqArray(arr) {
    if (Array.isArray(arr)) {
        var retArr = new Array();
        arr.forEach(function (element) {
            if (retArr.indexOf(element) === -1) {
                retArr.push(element);
            }
        });
        return retArr;
    }
    else {
        return "argument is not an array";
    }
}

// 使用示例
/*
 var a = [1, 3, 5, 7, 5, 3];
 var b = uniqArray(a);
 console.log(b); // [1, 3, 5, 7]
 */

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
//todo 不熟练，需要巩固
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/*
 var str = '   hi!  ';
 str = trim(str);
 console.log(str); // 'hi!'
 */


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = arr.length - 1; i >= 0; --i) {
        fn(arr[i], i);
    }
}

// 使用示例
/*
 var arr = ['java', 'c', 'php', 'html'];
 function output(item) {
 console.log(item)
 }
 each(arr, output);  // java, c, php, html
 */


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    if (typeof obj === 'object') {
        var subItemCount = 0;
        for (var index in obj) {
            if (obj.hasOwnProperty(index)) {
                subItemCount++;
            }
        }

        return subItemCount;
    }
}

// 使用示例
/*
 var obj = {
 a: 1,
 b: 2,
 c: {
 c1: 3,
 c2: 4
 }
 };
 console.log(getObjectLength(obj)); // 3
 */

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return (emailStr.match(/^[a-zA-Z]\w*@[\d\w]+\.\w+[\.\w+]*/g)) ? true : false;
}
/*
 console.log(isEmail("jqh101@sina.com"));
 console.log(isEmail("jqh_101@sina.com"));
 console.log(isEmail("jqh101@163.com.cn"));
 console.log(isEmail("jqh101@163.com"));

 console.log(isEmail("_jqh101@163.com.cn"));
 console.log(isEmail("1jqh101@163.com"));
 console.log(isEmail("jqh101@163com"));
 */

// 判断是否为手机号
function isMobilePhone(phone) {
    return (phone.toString().match(/^1[3587][0-9]{9}$/)) ? true : false;
}

/*
 console.log(isMobilePhone(13112341234));
 console.log(isMobilePhone(131123412341));
 console.log(isMobilePhone(23112341234));
 */


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.className += newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    element = element.replace(oldClassName, "");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var childNodes = element.parentNode.childNodes;
    for (var i = childNodes.length - 1; i >= 0; --i) {
        if (childNodes[i] === siblingNode) {
            return true;
        }
    }

    return false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var position = {};
    position.x = element.getBoundingClientRect().left;
    position.y = element.getBoundingClientRect().top;
}


// 实现一个简单的Query
function $(selector) {
    var idName = selector.match(/#([\w-]+)/);
    var className = selector.match(/\.([\w-]+)/);
    var propertyName = selector.match(/\[(\w[\w-]+)\]/);
    var propertyWithValueName = selector.match(/\[(\w[\w-]+)=([\w-]+)\]/);
    var typeName = selector.match(/^[a-zA-Z]+$/);

    if (idName && className === null) {
        return document.querySelector(idName[0]);
    }
    else if (className && idName === null) {
        return document.querySelector(className[0])
    }
    else if (idName && className) {
        var baseElement = document.getElementById(idName[1]);
        return baseElement.querySelector(className[0]);
    }
    else if (propertyName) {
        return document.querySelector(propertyName[0])
    }
    else if (propertyWithValueName) {
        return document.querySelector(propertyWithValueName[0].replace(/\[(\w[\w-]+)=([\w-]+)\]/, "[$1=\"$2\"]"));
    }
    else {
        return document.querySelector(typeName);
    }

}

/*
 // 可以通过id获取DOM对象，通过#标示，例如
 console.log($("#adom")); // 返回id为adom的DOM对象

 // 可以通过tagName获取DOM对象，例如
 console.log($("a")); // 返回第一个<a>对象

 // 可以通过样式名称获取DOM对象，例如
 console.log($(".classa")); // 返回第一个样式定义包含classa的对象

 // 可以通过attribute匹配获取DOM对象，例如
 console.log($("[data-log]")); // 返回第一个包含属性data-log的对象

 console.log($("[data-time=2015]")); // 返回第一个包含属性data-time且值为2015的对象

 // 可以通过简单的组合提高查询便利性，例如
 console.log($("#adom .classa")); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
 */


//console.log($("#doma"));
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, eventType, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventType, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + eventType, listener);
    }
    else {
        element["on" + eventType] = listener;
    }
}

// 例如：
/*
 function clicklistener(event) {
 alert("bind event to element success");
 }

 addEvent($("#doma"), "click", clicklistener);

 */

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, eventType, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(eventType, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent(eventType, listener);
    }
    else {
        element['on' + eventType] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.onkeydown = function (event) {
        var that = this;
        if (event.keyCode == 13) {
            event.preventDefault();
            listener.apply(element);
        }
    }
}

/*
 function clicklistener() {
 alert(this.a);
 }

 $("#doma").a = "element";
 addEnterEvent($("#doma"), clicklistener);
 */


$.on = function(element, eventType, listener) {
    addEvent(element, eventType, listener);
};

$.un = function (element, eventType, listener){
    removeEvent(element, eventType, listener);
};

$.click = function(element, listener) {
    addClickEvent(element, listener);
};

$.enter = function(element, listener) {
    addEnterEvent(element, listener);
};

/*
 function clickListener(event) {
 console.log(event.target);
 }

 each($("#list").getElementsByTagName('li'), function(element) {
 addClickEvent(element, clickListener);
 });
 */

//
//function clickListener(event) {
//    console.log(event);
//}
//
//function renderList() {
//    $("#list").innerHTML = '<li>new item</li>';
//}
//
//function init() {
//    each($("#list").getElementsByTagName('li'), function(item) {
//        $.click(item, clickListener);
//    });
//
//    $.click($("#btn"), renderList);
//}
//init();
//

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, listener);
}

/*
 function clickHandle (event) {
 console.log(event);
 }

 function renderList() {
 $("#list").innerHTML = '<li>new item</li>';
 }


 $.click($("#btn"), renderList);


 $.delegate = delegateEvent;

 // 使用示例
 // 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
 $.delegate($("#list"), "li", "click", clickHandle);
 */


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent;
    var version = -1;
    if (/MSIE ([^;]+)/.test(ua)) {
        version = parseFloat(RegExp['$1']);
    }

    return version;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = cookieName + "=" + cookieValue + ";expires=" + expiredays.toUTCString();
}

// 获取cookie值
function getCookie(cookieName) {
    var pattern = new RegExp(cookieName+"=([^;]+)");
    return pattern.test(document.cookie) ? RegExp['$1'] : "";
}

//options是一个对象，里面可以包括的参数为：
//
//type: post或者get，可以有一个默认值
//data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
//onsuccess: 成功时的调用函数
//onfail: 失败时的调用函数
function serializeData(data) {
    var serializedData = undefined;
    if (typeof data === 'object' && data !== null) {
        serializedData = {};
        for (var key in data) {
            serializedData[encodeURIComponent(key)] = encodeURIComponent(data[key]);
        }
        return serializedData;
    }
    else if (typeof data === 'string') {
        serializedData = data.replace(/(\w)=(\w)&/g, function(match, p1, p2) {
            return encodeURIComponent(p1) + "=" + encodeURIComponent(p2) + "&";
        });
        return serializedData;
    }
    else {
        return "";
    }
}

function ajax(url, options) {
    var xhr = new XMLHttpRequest();
    var type = options.type || 'get';
    var data = serializeData(options.data);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                options.onsuccess();
            }
            else {
                options.onfail();
            }
        }
    };


    if (type === 'get') {
        url = url + "?" + data;
        xhr.open(type, url, false);
        xhr.send(null);
    }
    else {
        xhr.open(type, url, false);
        xhr.send(data);
    }


}
