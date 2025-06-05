const form = document.getElementById('todo-form');
const input = document.getElementById('new-task');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleDone(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push({ text: input.value, done: false });
  input.value = '';
  saveTasks();
  renderTasks();
});

window.toggleDone = (index) => {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
};

window.deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

renderTasks();
