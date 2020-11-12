
// @ts-ignore: Ignoring issue with js-datepicker, no intellisense
const picker = datepicker("#due");
picker.setMin(new Date());

class ToDoItem {
    title:string;
    due:Date;
    isCompleted:boolean;
}
/*
let item = new ToDoItem();
item.title = "Testing";
item.due = new Date(2020, 11, 2);
item.complete = false;
*/

window.onload = function() {
    let addItem = getElement("add");
    addItem.onclick = main;
}

function getInput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function getElement(id):HTMLElement {
    return <HTMLElement>document.getElementById(id);
}

function main() {
    if (isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/**
 * Checks if the form data is valid
 */
function isValid():boolean {
    return true;
}

/**
 * Gets all the input off the form and
 * wraps in a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let myItem = new ToDoItem();
    
    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    let dueInput = getInput("due");
    myItem.due = new Date(dueInput.value);

    let isCompleted = getInput("complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

/**
 * Displays the given ToDoItem on the web page
 */
function displayToDoItem(item:ToDoItem):void {

    let itemText = document.createElement("h2")
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.due.toDateString();

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("todo")
    if (item.isCompleted) {
        itemDiv.classList.add("complete");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if (item.isCompleted) {
        let completedToDo = getElement("done");
        completedToDo.appendChild(itemDiv);
    }
    else {
        let incompleteToDo = getElement("to-do");
        incompleteToDo.appendChild(itemDiv);
    }
}

/* Tasks: 
    - Allow user to make a ToDoItem when completed
    - Store ToDoItems in web storage
*/