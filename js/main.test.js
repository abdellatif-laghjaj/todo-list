const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest
.dontMock('fs');

const { TodoItemFormatter, TodoManager, ThemeSwitcher } = require('./main');

describe('TodoItemFormatter', () => {
  const formatter = new TodoItemFormatter();

  test('truncates long tasks', () => {
    expect(formatter.formatTask('This is a very long task name')).toBe('This is a very ...');
  });

  test('returns full task if short', () => {
    expect(formatter.formatTask('Short')).toBe('Short');
  });

  test('formats due date', () => {
    expect(formatter.formatDueDate('2025-06-12')).toBe('2025-06-12');
    expect(formatter.formatDueDate('')).toBe('No due date');
  });

  test('formats status', () => {
    expect(formatter.formatStatus(true)).toBe('Completed');
    expect(formatter.formatStatus(false)).toBe('Pending');
  });
});

describe('TodoManager', () => {
  let manager;
  beforeEach(() => {
    localStorage.clear();
    manager = new TodoManager(new TodoItemFormatter());
  });

  test('adds a todo', () => {
    const todo = manager.addTodo('Test', '2025-06-12');
    expect(manager.todos.length).toBe(1);
    expect(todo.task).toBe('Test');
  });

  test('edits a todo', () => {
    const todo = manager.addTodo('Test', '');
    manager.editTodo(todo.id, 'Updated');
    expect(manager.todos[0].task).toBe('Updated');
  });

  test('deletes a todo', () => {
    const todo = manager.addTodo('Test', '');
    manager.deleteTodo(todo.id);
    expect(manager.todos.length).toBe(0);
  });

  test('toggles todo status', () => {
    const todo = manager.addTodo('Test', '');
    manager.toggleTodoStatus(todo.id);
    expect(manager.todos[0].completed).toBe(true);
  });

  test('clears all todos', () => {
    manager.addTodo('Test', '');
    manager.clearAllTodos();
    expect(manager.todos.length).toBe(0);
  });

  test('filters todos', () => {
    manager.addTodo('A', '');
    const b = manager.addTodo('B', '');
    manager.toggleTodoStatus(b.id);
    expect(manager.filterTodos('all').length).toBe(2);
    expect(manager.filterTodos('pending').length).toBe(1);
    expect(manager.filterTodos('completed').length).toBe(1);
  });
});

describe('ThemeSwitcher', () => {
  test('sets and gets theme from localStorage', () => {
    const html = { setAttribute: jest.fn() };
    const themes = [];
    const switcher = new ThemeSwitcher(themes, html);
    switcher.setTheme('dark');
    expect(html.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    switcher.saveThemeToLocalStorage('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});