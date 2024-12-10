const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const prioritySelect = document.getElementById('priority-select');
const filterAllButton = document.getElementById('filter-all');
const filterCompletedButton = document.getElementById('filter-completed');
const filterPendingButton = document.getElementById('filter-pending');
const darkModeToggle = document.getElementById('dark-mode-toggle');

function addTask(taskText, priority) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span class="task-text" contenteditable="true">${taskText}</span>
    <span class="priority ${priority}">${priority}</span>
    <button class="delete-button">×</button>
  `;
  listItem.classList.add(`priority-${priority}`);

  listItem.querySelector('.delete-button').addEventListener('click', () => {
    if (confirm("Você quer realmente excluir este item?")) {
      listItem.remove();
      saveTasks();
    }
  });

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    saveTasks();
  });

  taskList.appendChild(listItem);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll('#task-list li');
  taskItems.forEach(item => {
    const taskText = item.querySelector('.task-text').textContent;
    const priority = item.querySelector('.priority').textContent;
    const completed = item.classList.contains('completed');
    tasks.push({ text: taskText, priority: priority, completed: completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      addTask(task.text, task.priority);
      if (task.completed) {
        const taskItem = document.querySelectorAll(`#task-list li span:contains(${task.text})`)[0].parentNode;
        taskItem.classList.add('completed');
      }
    });
  }
}

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText !== "") {
    addTask(taskText, priority);
    taskInput.value = "";
    prioritySelect.value = "media";
  }
});

filterAllButton.addEventListener('click', () => filterTasks(""));
filterCompletedButton.addEventListener('click', () => filterTasks(".completed"));
filterPendingButton.addEventListener('click', () => filterTasks(":not(.completed)"));

function filterTasks(filterClass) {
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    if (task.matches(filterClass) || filterClass === "") {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

window.addEventListener('load', loadTasks);
window.addEventListener('beforeunload', saveTasks);


taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains("task-text")) {
    event.target.focus();
    event.target.addEventListener('blur', (e) => {
      saveTasks();
    });
  }
});

taskList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains("task-text")) {
    e.target.blur();
  }
});