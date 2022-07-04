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
        //get todos from local storage
        let todos = JSON.parse(localStorage.getItem('todo-list')) || [];
        let task_info = {
            task: task_input.value,
            status: 'pending'
        }
        //add task to todos array
        todos.push(task_info);
        saveTodos(todos);
        task_input.value = '';
        showTodos();
        //check if its the first task
        if (todos.length === 1) {
            window.location.reload();
        }
    } else {
        setTimeout(() => {
            alert_message.classList.remove('hide');
            alert_message.classList.add('show');
            alert_message.innerHTML = 'Please enter a task first !';
        }, 0);
        setTimeout(() => {
            alert_message.classList.remove('show');
            alert_message.classList.add('hide');
        }, 3000);
    }
});


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
    if(todos){
        todos.forEach((todo, id) => {
            todos_list.innerHTML += `
                <div class="todo-item">
                    <div class="form-control mr-6">
                        <input type="checkbox" class="checkbox checkbox-secondary checkbox-md" onclick="updateTodoStatus(this, todos)" id=${id}>
                    </div>
                    <p class="task-body">
                        ${todo.task}
                    </p>
                    <div class="todo-actions">
                        <button class="btn btn-success" onclick="editTodo(${id})">
                            <i class="bx bx-edit-alt bx-sm"></i>
                        </button>
                        <button class="btn btn-error" onclick="deleteTodo(${id})">
                            <i class="bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }
}

//update todo status
function updateTodoStatus(selected_checkbox, todos) {
    //get the task paragraph
    let task_name = selected_checkbox.parentElement.parentElement.querySelector('.task-body');
    //get the task index

    //change the status of the selected task
    if (selected_checkbox.checked) {
        task_name.style.textDecoration = 'line-through';
        task_name.style.opacity = '0.6';
        todos[selected_checkbox.id].status = 'completed';
    }else{
        task_name.style.textDecoration = 'none';
        task_name.style.opacity = '1';
        todos[selected_checkbox.id].status = 'pending';
    }
}

//delete todo
function deleteTodo(todo_id) {
    todos.splice(todo_id, 1);
    saveTodos(todos);
    showTodos();
}

//edit todo
function editTodo(todo_id) {
    let task_name = todos[todo_id].task;
    task_input.value = task_name;
    add_btn.innerHTML = '<i class="bx bx-check bx-sm"></i>';
    deleteTodo(todo_id);
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