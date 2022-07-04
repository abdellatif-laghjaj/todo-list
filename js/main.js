const task_input = document.querySelector('input');
const add_btn = document.querySelector('.add-task-button');
const todos_list = document.querySelector('.todos-list');
const alert_message = document.querySelector('.alert-message');

add_btn.addEventListener('click', () => {
    if (task_input.value.length > 0) {
        //get todos from local storage
        let todos = localStorage.getItem('todos');
        if (!todos) {
            todos = [];
        }
        let task_info = {
            task: task_input.value,
            status: 'pending'
        }
        //add task to todos array
        todos.push(task_info);
        saveTodos(todos);
        task_input.value = '';
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