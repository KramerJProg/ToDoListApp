var picker = datepicker("#due");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getElement("add");
    addItem.onclick = main;
    loadSavedItem();
};
function loadSavedItem() {
    var item = getToDo();
    displayToDoItem(item);
}
function getInput(id) {
    return document.getElementById(id);
}
function getElement(id) {
    return document.getElementById(id);
}
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var myItem = new ToDoItem();
    var titleInput = getInput("title");
    myItem.title = titleInput.value;
    var dueInput = getInput("due");
    myItem.due = new Date(dueInput.value);
    var isCompleted = getInput("complete");
    myItem.isCompleted = isCompleted.checked;
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.due.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("complete");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedToDo = getElement("done");
        completedToDo.appendChild(itemDiv);
    }
    else {
        var incompleteToDo = getElement("to-do");
        incompleteToDo.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("complete");
    var completeItems = getElement("done");
    console.log(completeItems);
    completeItems.appendChild(itemDiv);
}
function saveToDo(item) {
    var itemString = JSON.stringify(item);
    localStorage.setItem(todokey, itemString);
}
var todokey = "todo";
function getToDo() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
