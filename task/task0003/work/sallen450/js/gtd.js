/**
 * Created by qinghua on 15/5/20.
 */


/* ========================================
 描述：状态

 */

var cStatus = {};
cStatus.renderTaskData = [];
cStatus.categorySelected = null;
cStatus.taskSelected = null;


function $(id) {
    return document.getElementById(id);
}

/* ========================================
 描述：数据部分

 */
var data = {};
data.categoryData = [
    {
        'categoryName': '所有任务',
        'isEditable': false,
        'categoryID': 'category1',
        'categoryLevel': 'categoryLevel1',
        'categoryParentID': ''
    },
    {
        'categoryName': '分类列表',
        'isEditable': true,
        'categoryID': 'category2',
        'categoryLevel': 'categoryLevel1',
        'categoryParentID': ''
    },
    {
        'categoryName': '默认分类',
        'isEditable': false,
        'categoryID': 'category3',
        'categoryLevel': 'categoryLevel2',
        'categoryParentID': 'category2'
    },
    {
        'categoryName': '分类1',
        'isEditable': true,
        'categoryID': 'category4',
        'categoryLevel': 'categoryLevel2',
        'categoryParentID': 'category2'
    },
    {
        'categoryName': '分类2',
        'isEditable': true,
        'categoryID': 'category5',
        'categoryLevel': 'categoryLevel2',
        'categoryParentID': 'category2'
    },
    {
        'categoryName': '分类3',
        'isEditable': true,
        'categoryID': 'category6',
        'categoryLevel': 'categoryLevel3',
        'categoryParentID': 'category5'
    }
];

data.taskData = [
    {
        'taskFinished': false,
        'taskDate': '2015-05-28',
        'taskDescription': '我是段落1，我是段落1，我是段落1，我是段落1，我是段落1，',
        'taskName': 'todo1',
        'taskID': 'task1',
        'taskCategoryID': 'category4'
    },
    {
        'taskFinished': true,
        'taskDate': '2015-05-27',
        'taskDescription': '我是段落1，我是段落1，我是段落1，我是段落1，我是段落1，',
        'taskName': 'todo4',
        'taskID': 'task2',
        'taskCategoryID': 'category4'
    },
    {
        'taskFinished': false,
        'taskDate': '2015-05-27',
        'taskDescription': '我是段落1，我是段落1，我是段落1，我是段落1，我是段落1，',
        'taskName': 'todo2',
        'taskID': 'task4',
        'taskCategoryID': 'category4'
    },
    {
        'taskFinished': false,
        'taskDate': '2015-06-02',
        'taskDescription': '我是段落1，我是段落1，我是段落1，我是段落1，我是段落1，',
        'taskName': 'todo3',
        'taskID': 'task3',
        'taskCategoryID': 'category3'
    }
];

//查询指定id的类别数据项
//用途1：添加分类的时候，查找父分类数据，用来得到level
function findCategoryData (categoryID) {
    for (var i = 1; i < data.categoryData.length; i++) {
        if (data.categoryData[i].categoryID === categoryID) {
            return data.categoryData[i];
        }
    }

    return null;
}

function findTaskDataByID(id) {
    var dataItem = null;
    data.taskData.forEach(function (element) {
        if (element.taskID === id) {
            dataItem = element;
        }
    });

    return dataItem;
}

function saveDetailData() {
    var dataItem = findTaskDataByID(cStatus.taskSelected.id);

    dataItem.taskName = $('detail-title-content').innerHTML;
    dataItem.taskDate = $('detail-date-content').innerHTML;
    dataItem.taskDescription = $('detail-discribe-content').innerHTML;
}

function findTaskDataViaCategoryID(categoryID) {
    //清空上次的task数据
    cStatus.renderTaskData = [];
    data.taskData.forEach(function (element) {
        if (element.taskCategoryID === categoryID) {
            cStatus.renderTaskData.push(element);
        }
    });

    return cStatus.renderTaskData;
}

function sortCategory(a, b) {
    var la = parseInt(a.categoryLevel.match(/\d+/)[0]);
    var lb = parseInt(b.categoryLevel.match(/\d+/)[0]);
    if (la > lb) {
        return 1;
    }
    else if (la < lb) {
        return -1;
    }
    else {
        return 0;
    }
}

function sortTaskData(a, b) {
    var da = a.taskDate;
    var db = b.taskDate;
    if (da < db) {
        return -1;
    }
    else if (da > db) {
        return 1;
    }
    else {
        return 0;
    }
}

/* ========================================
 描述：页面渲染部分

 */

//获取当天日期，格式YYYY-MM-DD
function getTodayFormattedDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return "" + year + "-" + ((month >= 10) ? month : ('0' + month)) + "-" + ((day >= 10) ? day : ('0' + day));
}

function formatString(str) {
    for (var i = 1; i < arguments.length; i++) {
        str = str.replace('%s', arguments[i]);
    }

    return str;
}

//生成一项 类别的html 字符串
function generateCategoryItem(categoryDataObj) {
    var editableClassName = categoryDataObj.isEditable ? 'category-editable' : 'category-uneditable';
    var categoryTemplateString = '<li id="%s" data-category-level="%s" class="%s"><a>%s</a></li>';

    return formatString(categoryTemplateString, categoryDataObj.categoryID, categoryDataObj.categoryLevel, editableClassName, categoryDataObj.categoryName);
}

function generateTaskDateItem(date) {
    return formatString('<h2>%s</h2><ul></ul>', date);
}

function generateTaskNameItem(taskID, taskName, isFinish) {
    var className = isFinish ? "task-done" : "task-doing";
    return formatString('<li id="%s" class="%s"><a>%s</a></li>', taskID, className, taskName);
}

function renderCategory() {
    var categoryDataArray = data.categoryData;
    categoryDataArray.sort(sortCategory);
    for (var i = 0, length = categoryDataArray.length; i < length; i++) {
        var htmlData = generateCategoryItem(categoryDataArray[i]);
        var parentNodeID = categoryDataArray[i].categoryParentID || 'category-list';
        addCategoryItem(htmlData, $(parentNodeID));
    }
}

//控制最右侧显示
function renderDetail(id) {
    var dataItem = findTaskDataByID(id);
    $('detail-title-content').innerHTML = dataItem.taskName;
    $('detail-date-content').innerHTML = dataItem.taskDate;
    $('detail-discribe-content').innerHTML = dataItem.taskDescription;
}

//过滤得到 点击的分类下的所有task，   that入参为点击的对象的this值
function renderTaskWhenClickCategory(that) {
    findTaskDataViaCategoryID(that.id);

    renderTask();
}

//将 cStatus.renderTaskData中的数据 渲染到页面中
function renderTask(isFinished) {
    //清空页面上的task
    $('task-list').innerHTML = '';

    cStatus.renderTaskData.sort(sortTaskData);
    for (var i = 0; i < cStatus.renderTaskData.length; i++) {
        var element = cStatus.renderTaskData[i];
        if (!element.taskFinished === isFinished) {
            continue;
        }
        addTaskItem(element);
    }

}

function clearDetail() {
    $('detail-title-content').innerHTML = '';
    $('detail-date-content').innerHTML = '';
    $('detail-discribe-content').innerHTML = '';
}

/* ========================================
 描述：事件部分

 */
// 添加任务种类
function addCategoryItem(htmlData, parentNode) {
    var ul = null;
    if (parentNode.childElementCount <= 1) {
        // 添加ul标签，然后再添加li>a标签
        ul = document.createElement('ul');
        parentNode.appendChild(ul);
    }
    else {
        //直接添加li>a标签
        ul = parentNode.firstElementChild.nextElementSibling;
    }

    if (ul !== null) {
        //ul.innerHTML += htmlData;
        ul.insertAdjacentHTML('beforeend', htmlData);
    }

    ul.lastElementChild.onclick = categoryItemClick;
}

//添加新的任务
function addTaskItem(element) {
    var taskDates = document.querySelectorAll('#task-list h2');
    var addDate = null;
    for (var i = 0; i < taskDates.length; i++) {
        if (taskDates[i].innerHTML === element.taskDate) {
            addDate = taskDates[i];
            break;
        }
    }

    if (addDate === null) {
        var div = document.createElement('div');
        div.innerHTML = generateTaskDateItem(element.taskDate);
        $('task-list').insertBefore(div, $('task-list').firstElementChild);
        addDate = div.firstElementChild;
    }

    addDate.nextElementSibling.insertAdjacentHTML('beforeend', generateTaskNameItem(element.taskID, element.taskName, element.taskFinished));

    addDate.nextElementSibling.lastElementChild.onclick = taskItemClick;

    return addDate.nextElementSibling.lastElementChild;
}

//种类点击高亮事件处理程序
function categoryItemClick(event) {
    //1. 点击高亮
    if (cStatus.categorySelected) {
        cStatus.categorySelected.firstElementChild.classList.toggle('active');
    }
    this.firstElementChild.classList.toggle('active');
    cStatus.categorySelected = this;

    //2. 加载task列的内容
    renderTaskWhenClickCategory(this);

    //3. 重置detail列
    cStatus.taskSelected = null;
    clearDetail();

    event.stopPropagation();     //如果不加上这个，会冒泡到最开始的li元素，导致this始终指向最顶端的li元素
}

//任务列表点击高亮事件处理程序
function taskItemClick(event) {
    if (cStatus.taskSelected) {
        cStatus.taskSelected.firstElementChild.classList.toggle('active');
    }
    this.firstElementChild.classList.toggle('active');
    cStatus.taskSelected = this;

    //控制最右栏的内容显示
    renderDetail(cStatus.taskSelected.id);

    event.stopPropagation();     //如果不加上这个，会冒泡到最开始的li元素，导致this始终指向最顶端的li元素
}

$("task-filter-all").onclick = function () {
    renderTask();
};

$("task-filter-doing").onclick = function () {
    renderTask(false);
};

$("task-filter-done").onclick = function () {
    renderTask(true);
};

//对话框
$('btn-ok').onclick = function () {
    $('detail-title-content').innerHTML = $('dialog-name').value;
    $('detail-date-content').innerHTML = $('dialog-date').value;
    $('detail-discribe-content').innerHTML = $('dialog-detail').value;

    saveDetailData();
    renderTask();

    $('dialog').style.display = 'none';
    $('dialog-name').value = '';
    $('dialog-date').value = '';
    $('dialog-detail').value = '';
};

$('btn-cancel').onclick = function () {
    $('dialog').style.display = 'none';
    $('dialog-name').value = '';
    $('dialog-date').value = '';
    $('dialog-detail').value = '';
};

// 修改，确定 按钮的事件，使任务的 标题、事件、详细内容 可修改。
$('btn-edit').onclick = function () {
    if (cStatus.taskSelected) {
        $('dialog-name').value = $('detail-title-content').innerHTML;
        $('dialog-date').value = $('detail-date-content').innerHTML;
        $('dialog-detail').value = $('detail-discribe-content').innerHTML;

        $('dialog').style.display = 'block';
    }
};

$('btn-finish').onclick = function () {
    // 搜索selectid的数据
    var dataItem = findTaskDataByID(cStatus.taskSelected.id);
    // 更改数据
    dataItem.taskFinished = true;
    // 渲染task列
    cStatus.taskSelected.className = 'task-done';
};

$('add-task').onclick = function () {
    var taskName = prompt('输入任务名称：') || '新建任务';

    var dataItem = {
        'taskFinished': false,
        'taskDate': '',
        'taskDescription': '',
        'taskName': '',
        'taskID': '',
        'taskCategoryID': ''
    };
    dataItem.taskDate = getTodayFormattedDate();
    dataItem.taskName = taskName;
    dataItem.taskID = 'task' + (++data.taskMaxID);
    dataItem.taskCategoryID = cStatus.categorySelected.id;

    data.taskData.push(dataItem);
    cStatus.renderTaskData.push(dataItem);

    if (cStatus.taskSelected) {
        cStatus.taskSelected.firstElementChild.classList.remove('active');
    }
    cStatus.taskSelected = addTaskItem(dataItem);

    cStatus.taskSelected.firstElementChild.classList.add('active');
    renderDetail(cStatus.taskSelected.id);
};

$('add-category').onclick = function () {
    if (cStatus.categorySelected === null) {
        cStatus.categorySelected = $('category2');
    }

    if (cStatus.categorySelected.className.match(/category-uneditable/)) {
        return false;     //不可编辑项
    }

    var categoryName = prompt('请输入类别名称：');
    if (categoryName === null || categoryName === '') {
        return false;     //未输入有效信息
    }

    var dataItem = {
        'categoryName': '',
        'isEditable': true,
        'categoryID': '',
        'categoryLevel': '',
        'categoryParentID': ''
    };
    dataItem.categoryName = categoryName;
    dataItem.categoryID = 'category' + (++data.categoryMaxID);
    dataItem.categoryParentID = cStatus.categorySelected.id;
    dataItem.categoryLevel = 'categoryLevel' + (parseInt(cStatus.categorySelected.dataset.categoryLevel.match(/\d+/g)[0]) + 1);

    data.categoryData.push(dataItem);

    var htmlData = generateCategoryItem(dataItem);
    addCategoryItem(htmlData, cStatus.categorySelected);
};



/* ========================================
 描述：初始化部分

 */
function init() {
    data.categoryMaxID = data.categoryData.length;
    data.taskMaxID = data.taskData.length;
    renderCategory();
    renderTask();


    cStatus.categorySelected = $('category3');
    cStatus.categorySelected.firstElementChild.classList.toggle('active');
    renderTaskWhenClickCategory(cStatus.categorySelected);


    cStatus.categorySelected.className += 'active';

    var categoryItems = document.querySelectorAll('#category-list li');
    for (var i = 0; i < categoryItems.length; ++i) {
        categoryItems[i].onclick = categoryItemClick;
    }

}

init();
