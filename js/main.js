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
};
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
    var itemText = document.createElement("h2");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.due.toDateString();
    var itemDiv = document.createElement("div");
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
