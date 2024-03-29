'use-strict';

const loginContainer = document.getElementById('login-form');
const todoAppContainer = document.getElementById('todo-app-container');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const loginBtn = document.getElementById('login-btn');
const todoForm = document.getElementById('todo-form');
const newTodo = document.getElementById('todo-submit');
const removeBtn = document.getElementById('remove-btn');
const todosContainer = document.getElementById('todos-section');
const credentials = {
  username: 'AdminSEF123',
  password: 'SeF@ctORy$$456',
};

let todos = [];

function inputsReset() {
  userName.value = '';
  userEmail.value = '';
}

function switchInterface() {
  loginContainer.classList.remove('active');
  loginContainer.classList.add('hidden');
  todoAppContainer.classList.remove('hidden');
  todoAppContainer.classList.add('active');
}

function renderTodos() {
  todosContainer.innerHTML = '';

  todos.forEach((task) => {
    todosContainer.innerHTML += todo(task);
  });

  saveTodosToLocalStorage();
}

function login(e) {
  e.preventDefault();

  const inputedUserName = userName.value;
  const inputedUserEmail = userEmail.value;

  if (credentials.username === inputedUserName && credentials.password === inputedUserEmail) {
    switchInterface();
    renderTodos();
  } else {
    alert('Invalid UserName or Email');
    inputsReset();
  }
}

function todo(task) {
  return ` <div id=${task.id} class="item mini-border-radius">
      <input type="checkbox" />
      <p id="todo-text">${task.description}</p>
      <button id="remove-btn" class="remove-btn">❌</button>
    </div>`;
}

function AddUsersTodoItem(e) {
  e.preventDefault();

  const task = {
    id: Date.now(),
    description: `${newTodo.value}`,
    completed: false,
  };

  newTodo.value = '';
  todos.push(task);
  renderTodos();
}

function removeTodoItem(e) {
  if (e.target.classList.contains('remove-btn')) {
    const item = e.target.closest('.item');
    todos = todos.filter((task) => task.id !== parseInt(item.id));
    renderTodos();
  }
}

function saveTodosToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Retrieving Todos from Local Storage on Page Load:
document.addEventListener('DOMContentLoaded', function () {
  const storedTodos = JSON.parse(localStorage.getItem('todos'));

  if (storedTodos) {
    todos = storedTodos;
    renderTodos();
  }
});

// Event Listeners :
loginBtn.addEventListener('click', login);
todoForm.addEventListener('submit', AddUsersTodoItem);
todosContainer.addEventListener('click', removeTodoItem);
