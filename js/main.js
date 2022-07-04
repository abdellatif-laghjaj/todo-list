const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');


<div class="todo-item" data-id="1">
    <p class="task-body">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, minus impedit
    </p>
    <div class="todo-actions">
        <button class="btn btn-success">
            <i data-feather="check"></i>
        </button>
        <button class="btn btn-error">
            <i data-feather="trash-2"></i>
        </button>
    </div>
</div>


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
    if(!isInputEmpty(task_input)) {
        const task_body = task_input.value;
        const task_id = todo_list.length + 1;
        const todo = new Todo(task_id, task_body, false);
        todo.addTodo();
        todo_list.push(todo);
        task_input.value = '';
    }
}

//check the input field is not empty
function isInputEmpty(task_input) {
    let isEmpty = false;
    if (task_input.value.length > 0) {
        add_btn.disabled = false;
        isEmpty = true;
    }
    else {
        add_btn.disabled = true;
        isEmpty = false;
    }
    return isEmpty;
}