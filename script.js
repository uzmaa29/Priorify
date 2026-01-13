let tasks = [];

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasksEl = document.getElementById("totalTasks");
const activeTasksEl = document.getElementById("activeTasks");
const completedTasksEl = document.getElementById("completedTasks");
const urgentTasksEl = document.getElementById("urgentTasks");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const dueDate = document.getElementById("taskDueDate").value;

  if (!title) {
    alert("Task title is required!");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  updateDashboard();
  clearForm();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-card";

    div.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description || "No description"}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due:</strong> ${task.dueDate || "N/A"}</p>
      <button class="complete-btn" onclick="toggleTask(${task.id})">
        ${task.completed ? "Undo" : "Complete"}
        </button>

    `;

    if (task.completed) {
      div.style.opacity = "0.6";
      div.style.textDecoration = "line-through";
    }

    taskList.appendChild(div);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  renderTasks();
  updateDashboard();
}

function updateDashboard() {
  totalTasksEl.textContent = tasks.length;
  activeTasksEl.textContent = tasks.filter(t => !t.completed).length;
  completedTasksEl.textContent = tasks.filter(t => t.completed).length;
  urgentTasksEl.textContent = tasks.filter(t => t.priority === "High").length;
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskPriority").value = "Medium";
  document.getElementById("taskDueDate").value = "";
}
