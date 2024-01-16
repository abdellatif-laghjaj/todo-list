// Abstract class for TodoItemFormatter
class TodoItemFormatter {
  formatTask(task) {
    return task.length > 14 ? task.slice(0, 14) + "..." : task;
  }

  formatDueDate(dueDate) {
    return dueDate || "No due date";
  }

  formatStatus(completed) {
    return completed ? "Completed" : "Pending";
  }
}

// Class responsible for managing Todo items
class TodoManager {
  constructor(todoItemFormatter) {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todoItemFormatter = todoItemFormatter;
  }

  addTodo(task, dueDate) {
    const newTodo = {
      id: this.getRandomId(),
      task: this.todoItemFormatter.formatTask(task),
      dueDate: this.todoItemFormatter.formatDueDate(dueDate),
      completed: false,
      status: "pending",
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return newTodo;
  }

  editTodo(id, updatedTask) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.task = updatedTask;
        this.saveToLocalStorage();
      }
      return todo;
    }
  
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveToLocalStorage();
    }
  
    toggleTodoStatus(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveToLocalStorage();
      }
    }
  
    clearAllTodos() {
      if (this.todos.length > 0) {
        this.todos = [];
        this.saveToLocalStorage();
      }
    }
  
    filterTodos(status) {
      switch (status) {
        case "all":
          return this.todos;
        case "pending":
          return this.todos.filter((todo) => !todo.completed);
        case "completed":
          return this.todos.filter((todo) => todo.completed);
        default:
          return [];
      }
    }
  
    getRandomId() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    }
  
    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}

// Class responsible for managing the UI and handling events
class UIManager {
  constructor(todoManager, todoItemFormatter) {
    this.todoManager = todoManager;
    this.todoItemFormatter = todoItemFormatter;
    this.taskInput = document.querySelector("input");
    this.dateInput = document.querySelector(".schedule-date");
    this.addBtn = document.querySelector(".add-task-button");
    this.todosListBody = document.querySelector(".todos-list-body");
    this.alertMessage = document.querySelector(".alert-message");
    this.deleteAllBtn = document.querySelector(".delete-all-btn");

  this.addEventListeners();
  this.showAllTodos();
  }

  addEventListeners() {
      // Event listener for adding a new todo
      this.addBtn.addEventListener("click", () => {
          this.handleAddTodo();
      });

      // Event listener for pressing Enter key in the task input
      this.taskInput.addEventListener("keyup", (e) => {
          if (e.keyCode === 13 && this.taskInput.value.length > 0) {
              this.handleAddTodo();
          }
      });

      // Event listener for deleting all todos
      this.deleteAllBtn.addEventListener("click", () => {
          this.handleClearAllTodos();
      });

      // Event listeners for filter buttons
      const filterButtons = document.querySelectorAll(".todos-filter li");
      filterButtons.forEach((button) => {
          button.addEventListener("click", () => {
              const status = button.textContent.toLowerCase();
              this.handleFilterTodos(status);
          });
      });
  }

  handleAddTodo() {
    const task = this.taskInput.value;
    const dueDate = this.dateInput.value;
    if (task === "") {
      this.showAlertMessage("Please enter a task", "error");
    } else {
      const newTodo = this.todoManager.addTodo(task, dueDate);
      this.showAllTodos();
      this.taskInput.value = "";
      this.dateInput.value = "";
      this.showAlertMessage("Task added successfully", "success");
    }
  }

  handleClearAllTodos() {
    this.todoManager.clearAllTodos();
    this.showAllTodos();
    this.showAlertMessage("All todos cleared successfully", "success");
  }

  showAllTodos() {
    const todos = this.todoManager.filterTodos("all");
    this.displayTodos(todos);
  }

  displayTodos(todos) {

      this.todosListBody.innerHTML = "";
      
      if (todos.length === 0) {
          this.todosListBody.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
          return;
        }
        
      todos.forEach((todo) => {
        this.todosListBody.innerHTML += `
          <tr class="todo-item" data-id="${todo.id}">
            <td>${this.todoItemFormatter.formatTask(todo.task)}</td>
            <td>${this.todoItemFormatter.formatDueDate(todo.dueDate)}</td>
            <td>${this.todoItemFormatter.formatStatus(todo.completed)}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="uiManager.handleEditTodo('${
                todo.id
              }')">
                <i class="bx bx-edit-alt bx-bx-xs"></i>    
              </button>
              <button class="btn btn-success btn-sm" onclick="uiManager.handleToggleStatus('${
                todo.id
              }')">
                <i class="bx bx-check bx-xs"></i>
              </button>
              <button class="btn btn-error btn-sm" onclick="uiManager.handleDeleteTodo('${
                todo.id
              }')">
                <i class="bx bx-trash bx-xs"></i>
              </button>
            </td>
          </tr>
        `;
      });
    }
    

  
handleEditTodo(id) {
  const todo = this.todoManager.todos.find((t) => t.id === id);
  if (todo) {
    this.taskInput.value = todo.task;
    this.todoManager.deleteTodo(id);

    const handleUpdate = () => {
      this.addBtn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
      this.showAlertMessage("Todo updated successfully", "success");
      this.showAllTodos();
      this.addBtn.removeEventListener("click", handleUpdate);
    };

    this.addBtn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
    this.addBtn.addEventListener("click", handleUpdate);
  }
}


handleToggleStatus(id) {
this.todoManager.toggleTodoStatus(id);
this.showAllTodos();
}

handleDeleteTodo(id) {
this.todoManager.deleteTodo(id);
this.showAlertMessage("Todo deleted successfully", "success");
this.showAllTodos();
}


handleFilterTodos(status) {
  const filteredTodos = this.todoManager.filterTodos(status);
  this.displayTodos(filteredTodos);
}


showAlertMessage(message, type) {
const alertBox = `
  <div class="alert alert-${type} shadow-lg mb-5 w-full">
    <div>
      <span>${message}</span>
    </div>
  </div>
`;
this.alertMessage.innerHTML = alertBox;
this.alertMessage.classList.remove("hide");
this.alertMessage.classList.add("show");
setTimeout(() => {
  this.alertMessage.classList.remove("show");
  this.alertMessage.classList.add("hide");
}, 3000);
}
}

// Class responsible for managing the theme switcher
class ThemeSwitcher {
constructor(themes, html) {
  this.themes = themes;
  this.html = html;
  this.init();
}

init() {
  const theme = this.getThemeFromLocalStorage();
  if (theme) {
    this.setTheme(theme);
  }

  this.addThemeEventListeners();
}

addThemeEventListeners() {
  this.themes.forEach((theme) => {
    theme.addEventListener("click", () => {
      const themeName = theme.getAttribute("theme");
      this.setTheme(themeName);
      this.saveThemeToLocalStorage(themeName);
    });
  });
}

setTheme(themeName) {
  this.html.setAttribute("data-theme", themeName);
}

saveThemeToLocalStorage(themeName) {
  localStorage.setItem("theme", themeName);
}

getThemeFromLocalStorage() {
  return localStorage.getItem("theme");
}
}



// Instantiating the classes
const todoItemFormatter = new TodoItemFormatter();
const todoManager = new TodoManager(todoItemFormatter);
const uiManager = new UIManager(todoManager, todoItemFormatter);
const themes = document.querySelectorAll(".theme-item");
const html = document.querySelector("html");
const themeSwitcher = new ThemeSwitcher(themes, html);
