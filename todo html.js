let listContainer = document.getElementById("listItemsContainer");
let inputEl = document.getElementById("userInput");


function getItemsfromLocalStorage() {
    let items = localStorage.getItem("todoList");
    if (items === null) {
        return [];
    } else {
        try {
            let parsedList = JSON.parse(items);
            return Array.isArray(parsedList) ? parsedList : [];
        } catch (error) {
            console.error("Error parsing todoList from localStorage:", error);
            return [];
        }
    }
}


let list1 = getItemsfromLocalStorage();

function clickedSave() {
    localStorage.setItem("todoList", JSON.stringify(list1));
}



function deleteItem(listId) {
    let itemNumber = listId.slice(4);
    let item = document.getElementById(listId);
    listContainer.removeChild(item);
    let itemIndex = list1.findIndex(
        function(eachItem) {
            if (parseInt(itemNumber) === eachItem.number) {
                return true;
            } else {
                return false;
            }
        }
    );
    list1.splice(itemIndex, 1);
}

function clickedCheckBox(labelId) {
    let element = document.getElementById(labelId);
    element.classList.toggle("checked");

    let itemNumber = labelId.slice(5);
    let itemIndex = list1.findIndex(
        function(eachItem) {
            if (parseInt(itemNumber) === eachItem.number) {
                return true;
            } else {
                return false;
            }
        }
    );
    let checkBoxItem = list1[itemIndex];
    if (checkBoxItem.isChecked === true) {
        checkBoxItem.isChecked = false;
    } else if (checkBoxItem.isChecked === false) {
        checkBoxItem.isChecked = true;
    }

}



function createAndAppendTodo(item) {
    let checkBoxId = "checkBox" + item.number;
    let listId = "list" + item.number;
    let labelId = "label" + item.number;

    let listItemEl = document.createElement("li");
    listItemEl.classList.add("d-flex", "flex-row", "listItem1");
    listItemEl.id = listId;
    listContainer.appendChild(listItemEl);

    let checkBoxEl = document.createElement("input");
    checkBoxEl.type = "checkbox";
    checkBoxEl.id = checkBoxId;
    checkBoxEl.classList.add("checkBox1");
    checkBoxEl.checked = item.isChecked;
    checkBoxEl.onclick = function() {
        clickedCheckBox(labelId);
    };
    listItemEl.appendChild(checkBoxEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("labelContainer1", "d-flex", "flex-row");
    listItemEl.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.textContent = item.text;
    labelEl.classList.add("labelStyle1");
    labelEl.id = labelId;
    if (item.isChecked === true) {
        labelEl.classList.add("checked");
    } else if (item.isChecked === false) {
        labelEl.classList.remove("checked");
    }
    labelEl.setAttribute("for", checkBoxId);
    labelContainerEl.appendChild(labelEl);

    let deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-trash", "fa-solid", "delteIcon1");
    deleteIconEl.onclick = function() {
        deleteItem(listId);
    };
    labelContainerEl.appendChild(deleteIconEl);

}

function clickedAdd() {
    let userText = inputEl.value;
    if (userText === "") {
        alert("Enter tasks need to be done");
        return;
    }
    let lengths = list1.length;
    lengths = lengths + 1;
    let newtodo = {
        text: userText,
        number: lengths,
        isChecked: false
    };
    console.log(typeof(list1));
    list1.push(newtodo);
    createAndAppendTodo(newtodo);
    inputEl.value = "";
}

for (let item of list1) {
    createAndAppendTodo(item);
}
