const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');
const delete_all_btn = document.querySelector('.delete-all-btn');
const delete_btns = document.querySelectorAll('.delete-btn');
const edit_btns = document.querySelectorAll('.edit-btn');



let todos = [];


function addToDo(task_input) {
    let task = {
        id: todos.length + 1,
        task: task_input.value,
        completed: false
    }
    todos.push(task);
}

add_btn.addEventListener('click', () => {
    if (task_input.value === '') {
        showAlertMessage('Please enter a task', 'error');
    }else {
        addToDo(task_input);

    }
});


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

//check if todos are empty
if (todos.length === 0) {
    todos_list.innerHTML = '<p class="text-center">No todos yet!</p>';
}