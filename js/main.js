const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');

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
                        <button class="btn btn-success">
                            <i class="bx bx-edit-alt bx-sm"></i>
                        </button>
                        <button class="btn btn-error">
                            <i class="bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

//delete todo
function deleteTodo(selected_btn, todos) {
    todos.splice(selected_btn.id, 1);
    saveTodos(todos);
    showTodos();
}

//edit todo
function editTodo(selected_btn, todos) {
    let task_name = selected_btn.parentElement.parentElement.querySelector('.task-body');
    const value = task_name.innerHTML;
    task_name.value = value.trim();
    add_btn.innerHTML = '<i class="bx bx-check bx-sm"></i>';
    todos.splice(selected_btn.id, 1);
    saveTodos(todos);
    showTodos();
    add_btn.innerHTML = '<i class="bx bx-plus bx-sm"></i>';
}

//delete all todos
function deleteAllTodos() {
    todos = [];
    saveTodos(todos);
    showTodos();
}

//check if todos are empty
if (todos.length === 0) {
    todos_list.innerHTML = '<p class="text-center">No todos yet!</p>';
}