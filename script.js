window.onload = updateTodo
let storageArray = localStorage.getItem("items");
const itemsArray = storageArray ? JSON.parse(storageArray) : [];
const inputBox = document.querySelector(".input-box");
const inputText = document.querySelector(".input-box input[type=text]");
const todoListItem = document.querySelector(".todo-list-item");
inputBox.addEventListener("submit", (event) => {
    event.preventDefault()
    let inputValue = inputText.value
    if (inputValue.length === 0) {
        alert("Please add some task!");
        return;
    }
    itemsArray.push(inputValue)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    inputText.value = "";
    updateTodo();

})
function updateTodo() {
    todoListItem.replaceChildren()
    const itemArray = JSON.parse(localStorage.getItem("items"));
    for (let i = 0; i < itemArray.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `<span type="text" class="task-text" >${itemArray[i]}</span>
    <button class="delete">Delete</button>
    <button class="done">Done</button>`
        li.setAttribute("id", i)
        todoListItem.append(li)
    }
}
let taskDelete = document.querySelector(".delete");
let taskDone = document.querySelector(".done");
todoListItem.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        let deleteId = +event.target.parentNode.id;
        let itemsBeforeDelete = JSON.parse(localStorage.getItem("items"));
        let itemsAfterDelete = [];
        for (i = 0; i < itemsBeforeDelete.length; i++) {
            if (i !== deleteId) {
                itemsAfterDelete.push(itemsBeforeDelete[i])
            }
        }

        localStorage.setItem("items", JSON.stringify(itemsAfterDelete))
        updateTodo()
        location.reload();
    } else if (event.target.classList.contains("done")) {
        if (event.target.innerText === "Done") {
            let doneText = event.target.previousElementSibling.previousElementSibling.style;
            doneText.textDecoration = "line-through";
            doneText.color = "#A9A9A9";
            event.target.innerText = "Undo";
        }
        else {
            let doneText = event.target.previousElementSibling.previousElementSibling.style;
            doneText.textDecoration = "none";
            doneText.color = "#D5CEA3";
            event.target.innerText = "Done";
        }
    }
})

