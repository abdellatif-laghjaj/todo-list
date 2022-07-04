const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');
const delete_btns = document.querySelectorAll('.delete-btn');
const edit_btns = document.querySelectorAll('.edit-btn');



let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', showAllTodos);

function addToDo(task_input) {
    let task = {
        id: todos.length + 1,
        task: task_input.value,
        completed: false
    }
    todos.push(task);
}

task_input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && task_input.value.length > 0) {
        addToDo(task_input);
        saveToLocalStorage();
        task_input.value = '';
        showAllTodos();
    }
});

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Please enter a task', 'error');
    } else {
        addToDo(task_input);
        saveToLocalStorage();
        showAllTodos();
        task_input.value = '';
        showAlertMessage('Task added successfully', 'success');
    }
});

delete_all_btn.addEventListener('click', clearAllTodos);

//show all todos
function showAllTodos() {
    todos_list.innerHTML = '';
    todos.forEach((todo) => {
        todos_list.innerHTML += `
            <li class="todo-item">
                <p class="task-body">
                    ${todo.task}
                </p>
                <div class="todo-actions">
                    <button class="btn btn-success">
                        <i class="bx bx-edit-alt bx-sm"></i>    
                    </button>
                    <button class="btn btn-error">  
                        <i class="bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>
        `;
    });
}

//save todos to local storage
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//show alert message
function showAlertMessage(message, type) {
    let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `
    alert_message.innerHTML = alert_box;
    alert_message.classList.remove('hide');
    alert_message.classList.add('show');
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}

todos_list.addEventListener('click', (e) => {
    switch (e.target.tagName) {
        case 'BUTTON':
            if (e.target.classList.contains('btn-success')) {
                editTodo(e.target);
            }
            if (e.target.classList.contains('btn-error')) {
                deleteTodo(e.target);
            }
            break;
        default:
            break;
    }
}, false);



//delete todo
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveToLocalStorage();
    showAllTodos();
}

//edit todo
function editTodo(id) {
    let todo = todos.find((todo) => todo.id === id);
    task_input.value = todo.task;
}


//clear all todos
function clearAllTodos() {
    todos = [];
    saveToLocalStorage();
    showAlertMessage('All todos cleared successfully', 'success');
    showAllTodos();
}

//check if todos are empty
if (todos.length === 0) {
    todos_list.innerHTML = '<p class="text-center">No todos yet</p>';
}