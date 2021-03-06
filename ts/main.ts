
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

    // Load saved item
    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getToDoItems(); // Reads it from web storage
    
    for (let i = 0; i < itemArray.length; i++) {
        displayToDoItem(itemArray[i]);
    }
    
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
        saveToDo(item);
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

    let itemText = document.createElement("h3")
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    // itemDate.innerText = item.due.toDateString();
    let dueDate = new Date(item.due.toString());
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

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

function markAsComplete() {
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("complete");

    let completeItems = getElement("done");
    console.log(completeItems);
    completeItems.appendChild(itemDiv);
}

/* Tasks: 
    - Store ToDoItems in web storage
*/

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if (currItems == null){
        currItems = new Array();
    }
    currItems.push(item); // Adds new item to current item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

/**
 * Get stored ToDo items or return null if
 * none are found.
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

