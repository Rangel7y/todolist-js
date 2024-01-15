// Querys Selector

/* Select form-todo */
const formTodo = document.getElementById("form-todo");

/* Select inp-todo */
const inputTodo = document.getElementById("inp-todo");

/* Select form-edit-todo */
const formEditTodo = document.getElementById("form-edit-todo");

/* Select inp-edit */
const inputEdit = document.getElementById("inp-edit");

/* Select btn-cancel-edit */
const btnCancelEdit = document.getElementById("btn-cancel-edit");

/* Select toolbar */
const toolBar = document.getElementById("toolbar");

/* Select todo-list */
const todoList = document.getElementById("todo-list");

/* Select inp-search */
const inputSearch = document.getElementById("inp-search");

/* Select btn-erase */
const btnErase = document.getElementById("btn-erase");

/* Select filter-select */
const btnFilter = document.getElementById("filter-select");

// Variables

/* Save old input value */
let oldInputValue = "";

// Functions

/* Save Todo */
const SaveTodo = (text, done = 0, save = 1) => {
    let todo, todoTitle, buttonFinish, buttonEdit, buttonRemove;

    /* Todo Container */
    todo = document.createElement("section");
    todo.setAttribute("class", "todo");

    /* Todo Title (h3) */
    todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    /* Button Finish Todo */
    buttonFinish = document.createElement("button");
    buttonFinish.setAttribute("class", "finish-todo");
    buttonFinish.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg>';
    todo.appendChild(buttonFinish); 

    /* Button Edit Todo */
    buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("class", "edit-todo");
    buttonEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/></svg>';
    todo.appendChild(buttonEdit);

    /* Button Remove Todo */
    buttonRemove = document.createElement("button");
    buttonRemove.setAttribute("class", "remove-todo");
    buttonRemove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>';
    todo.appendChild(buttonRemove);

    // Local Storage Data
    if(done){
        todo.classList.add("done");
    }

    if(save){
        saveTodoLocalS({text, done});
    }

    /* Set todo object to todo-list-container */
    todoList.appendChild(todo);

    inputTodo.value = "";
    inputTodo.focus();

}

/* Toggle Forms */
const ToggleForms = () => {
    formEditTodo.classList.toggle("hide");

    formTodo.classList.toggle("hide");

    toolBar.classList.toggle("hide");

    todoList.classList.toggle("hide");

    if(toolBar.classList.contains("hide")){
        toolBar.style.display = "none";
    }
    else{
        toolBar.style.display = "flex";
    }
}

/* Update Todo */
const UpdateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;

            updateTodoTitleLocalS(oldInputValue, text);
        }
    })
}

/* Get Search Todos */
const GetSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(search.toLowerCase())){
            todo.style.display = "none";
        }
    })
}

/* Filter Todos */
const FilterTodos = (select) => {
    const todos = document.querySelectorAll(".todo");

    switch(select){
        case "all":{
            todos.forEach((todo) => todo.style.display = "flex");
            break;
        }
        case "done":{
            todos.forEach((todo) => todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        }
        case "todo":{
            todos.forEach((todo) => !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        }
        default:
            break;
    }
}

/* Form Todo */
formTodo.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputValue = inputTodo.value;

    if(inputValue){
        SaveTodo(inputValue);
    }
});

/* Buttons (finish-todo, edit-todo, remove-todo) */
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("section");

    let titleTodo;

    if(parentEl && parentEl.querySelector("h3")){
        titleTodo = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");

        updateTodoStatusLocalS(titleTodo);
    }

    if(targetEl.classList.contains("edit-todo")){
        ToggleForms();

        inputEdit.value = titleTodo;
        oldInputValue = titleTodo;
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();

        removeTodoLocalS(titleTodo);
    }
});

/* Form Edit Todo */
formEditTodo.addEventListener("submit", (event) => {
    event.preventDefault();

    if(inputEdit.value){
        UpdateTodo(inputEdit.value);
    }
    ToggleForms();
});

/* Button Cancel Edit */
btnCancelEdit.addEventListener("click", (event) => {
    event.preventDefault();

    ToggleForms();
});

// Toolbar

/* Input Search */
inputSearch.addEventListener("keyup", (event) => {
    const search = event.target.value;

    GetSearchTodos(search);
});

/* Button Erase */
btnErase.addEventListener("click", (event) => {
    event.preventDefault();

    inputSearch.value = "";

    inputSearch.dispatchEvent(new Event("keyup"));
});

/* Filter Select */
btnFilter.addEventListener("change", (event) => {
    FilterTodos(event.target.value);
});

// Local Storage

/* Get */
const getTodoLocalS = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
}

/* Load */
const loadTodosLocalS = () => {
    const todos  = getTodoLocalS();

    todos.forEach((todo) => {
        SaveTodo(todo.text, todo.done, 0);
    })
}

/* Save */
const saveTodoLocalS = (todo) => {
    const todos  = getTodoLocalS();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

/* Remove */
const removeTodoLocalS = (todoText) => {
    const todos  = getTodoLocalS();

    localStorage.setItem("todos", JSON.stringify(todos.filter((todo) => todo.text !== todoText)));
}

/* Update Status */
const updateTodoStatusLocalS = (todoText) => {
    const todos  = getTodoLocalS();

    todos.map((todo) => todo.text === todoText ? (todo.done = !todo.done) : null)

    localStorage.setItem("todos", JSON.stringify(todos));  
}

/* Update Title */
const updateTodoTitleLocalS = (oldText, newText) => {
    const todos  = getTodoLocalS();

    todos.map((todo) => todo.text === oldText ? (todo.text = newText) : null)

    localStorage.setItem("todos", JSON.stringify(todos));  
}

/* Load when first initialize/reload page */
loadTodosLocalS();

