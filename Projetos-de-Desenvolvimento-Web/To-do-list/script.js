const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(taskText) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-button">×</button>
  `;

  listItem.querySelector('.delete-button').addEventListener('click', () => {
    listItem.remove();
  });

  listItem.addEventListener('click', () => {
    listItem.classList.toggle('completed');
  });

  taskList.appendChild(listItem);
}


//Exemplo de como carregar tarefas salvas no localStorage (adicional)
window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);
        tasksArray.forEach(task => addTask(task));
    }
});

//Exemplo de como salvar tarefas no localStorage (adicional)
// Isso seria chamado antes de atualizar a página ou no evento de fechar/minimizar a página
function saveTasks(){
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li span');
    taskItems.forEach(item => tasks.push(item.textContent));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Exemplo de uso:
window.addEventListener('beforeunload', saveTasks);