const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');
const delete_btns = document.querySelectorAll('.delete-btn');
const edit_btns = document.querySelectorAll('.edit-btn');

let todos = getTodos();
showTodos();


delete_all_btn.addEventListener('click', deleteAllTodos);

add_btn.addEventListener('click', () => {
    if (task_input.value.length > 0) {
        addTodo(task_input);
    } else {
        showAlertMessage('Please enter a task first');
    }
});

//add todo
function addTodo(task_input) {
    //get todos from local storage
    let todos = JSON.parse(localStorage.getItem('todo-list')) || [];
    let task_info = {
        task: task_input.value,
        status: 'pending'
    }
    //add task to todos array
    todos.push(task_info);
    saveTodos(todos);
    window.location.reload();
    showTodos();
    task_input.value = '';
}

//show alert message
function showAlertMessage(message) {
    setTimeout(() => {
        alert_message.classList.remove('hide');
        alert_message.classList.add('show');
        alert_message.innerHTML = message;
    }, 0);
    setTimeout(() => {
        alert_message.classList.remove('show');
        alert_message.classList.add('hide');
    }, 3000);
}


//save todos to local storage
function saveTodos(todos) {
    localStorage.setItem('todo-list', JSON.stringify(todos));
}


//get todos from local storage
function getTodos() {
    return JSON.parse(localStorage.getItem('todo-list')) || [];
}

//render todos to DOM
function showTodos() {
    if (todos) {
        todos.forEach((todo, id) => {
            todos_list.innerHTML += `
                <div class="todo-item">
                    <p class="task-body">
                        ${todo.task}
                    </p>
                    <div class="todo-actions">
                        <button class="btn btn-success edit-btn" id="${id}">
                            <i class="bx bx-edit-alt bx-sm"></i>
                        </button>
                        <button class="btn btn-error delete-btn" id="${id}">
                            <i class="bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

//delete todo
delete_btns.forEach((btn) => {
    alert(btn.id);
    btn.addEventListener('click', () => {
        let id = btn.getAttribute('id');
        alert(id)
        deleteTodo(id);
    });
});

//edit todo

//function to delete todo
function deleteTodo(id) {
    todos.splice(id, 1);
    saveTodos(todos);
    showTodos();
}

//function to edit todo
function editTodo(id) {
    let todo = todos[id];
    task_input.value = todo.task;
    todos.splice(id, 1);
    saveTodos(todos);
    showTodos();
}

//delete all todos
function deleteAllTodos() {
    todos = [];
    saveTodos(todos);
    showTodos();
    window.location.reload();
}

//check if todos are empty
if (todos.length === 0) {
    todos_list.innerHTML = '<p class="text-center">No todos yet!</p>';
}