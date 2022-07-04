const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');

//load todos from local storage
loadTodos();

//Todo Class
class Todo {
    constructor(task_id, task_body, is_completed) {
        this.task_id = task_id;
        this.task_body = task_body;
        this.is_completed = is_completed;
    }

    addTodo() {
        const todo_item = document.createElement('div');
        todo_item.classList.add('todo-item');
        todo_item.setAttribute('data-id', this.task_id);
        todo_item.innerHTML = `
            <p class="task-body">${this.task_body}</p>
            <div class="todo-actions">
                <button class="btn btn-success">
                    <i data-feather="check"></i>
                </button>
                <button class="btn btn-error">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        `;
        todos_list.appendChild(todo_item);
    }

    removeTodo(id) {
        const todo_item = document.querySelector(`[data-id="${id}"]`);
        todos_list.removeChild(todo_item);
    }

    markAsCompleted(id) {
        const todo_item = document.querySelector(`[data-id="${id}"]`);
        todo_item.classList.add('completed');
    }
}


const todo_list = [];


add_btn.addEventListener('click', () => {
    if (task_input.value.length > 0) {
        const task_body = task_input.value;
        const task_id = todo_list.length + 1;
        const todo = new Todo(task_id, task_body, false);
        todo.addTodo();
        todo_list.push(todo);
        task_input.value = '';
        saveTodos();

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


//save to local storage
function saveTodos() {
    localStorage.setItem('todo_list', JSON.stringify(todo_list));
}

//load todos from local storage
function loadTodos() {
    const todo_list_json = localStorage.getItem('todo_list');
    const todo_list_array = JSON.parse(todo_list_json);
    if(todo_list_array === null) {
        return;
    }

    todo_list_array.forEach(todo => {
        const todo_item = document.createElement('div');
        todo_item.classList.add('todo-item');
        todo_item.setAttribute('data-id', todo.task_id);
        todo_item.innerHTML = `
            <p class="task-body">${todo.task_body}</p>
            <div class="todo-actions">
                <button class="btn btn-success">
                    <i data-feather="check"></i>
                </button>
                <button class="btn btn-error">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        `;
        todos_list.appendChild(todo_item);
    }
    );
}


//check if theer is no todo in list
if(todo_list.length === 0) {
    todos_list.innerHTML = '<p class="no-todos">No todos yet!</p>';
}else{
    todos_list.innerHTML = '';
}