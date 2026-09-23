/* =================================
   GET HTML ELEMENTS
================================= */

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");
const remainingTasks = document.getElementById("remainingTasks");

const emptyMessage = document.getElementById("emptyMessage");

const clearCompleted = document.getElementById("clearCompleted");

const filterButtons = document.querySelectorAll(".filter-btn");


/* =================================
   TASK ARRAY
================================= */

let tasks = [];

let currentFilter = "all";


/* =================================
   ADD TASK
================================= */

function addTask() {

  // Get input value and remove extra spaces
  const taskText = taskInput.value.trim();

  // Don't add an empty task
  if (taskText === "") {
    taskInput.focus();
    return;
  }

  // Create a new task object
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  // Add task to the array
  tasks.push(newTask);

  // Clear input
  taskInput.value = "";

  // Display tasks
  renderTasks();

  // Keep cursor inside input
  taskInput.focus();
}


/* =================================
   DISPLAY TASKS
================================= */

function renderTasks() {

  // Clear existing list
  taskList.innerHTML = "";

  // Filter tasks according to selected filter
  const filteredTasks = tasks.filter(function (task) {

    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });


  // Show empty message if there are no tasks
  if (filteredTasks.length === 0) {

    emptyMessage.style.display = "block";

  } else {

    emptyMessage.style.display = "none";
  }


  // Create every task
  filteredTasks.forEach(function (task) {

    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");


    // Add completed class
    if (task.completed) {
      taskItem.classList.add("completed");
    }


    /* -----------------------------
       CHECKBOX
    ----------------------------- */

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.classList.add("task-checkbox");

    checkbox.checked = task.completed;


    // Handle checkbox click
    checkbox.addEventListener("change", function () {

      task.completed = checkbox.checked;

      renderTasks();
    });


    /* -----------------------------
       TASK TEXT
    ----------------------------- */

    const taskText = document.createElement("span");

    taskText.classList.add("task-text");

    taskText.textContent = task.text;


    /* -----------------------------
       DELETE BUTTON
    ----------------------------- */

    const deleteButton = document.createElement("button");

    deleteButton.classList.add("delete-btn");

    deleteButton.textContent = "×";

    deleteButton.setAttribute("aria-label", "Delete task");


    // Delete task
    deleteButton.addEventListener("click", function () {

      tasks = tasks.filter(function (item) {

        return item.id !== task.id;

      });

      renderTasks();
    });


    /* -----------------------------
       ADD ELEMENTS TO TASK
    ----------------------------- */

    taskItem.appendChild(checkbox);

    taskItem.appendChild(taskText);

    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

  });


  // Update counters
  updateCounters();
}


/* =================================
   UPDATE COUNTERS
================================= */

function updateCounters() {

  // Total number of tasks
  taskCount.textContent = tasks.length;


  // Count incomplete tasks
  const remaining = tasks.filter(function (task) {

    return !task.completed;

  }).length;


  // Update remaining text
  if (remaining === 1) {

    remainingTasks.textContent = "1 task remaining";

  } else {

    remainingTasks.textContent =
      `${remaining} tasks remaining`;
  }
}


/* =================================
   FILTER TASKS
================================= */

filterButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    // Remove active class from all buttons
    filterButtons.forEach(function (btn) {

      btn.classList.remove("active");

    });


    // Add active class to clicked button
    button.classList.add("active");


    // Store selected filter
    currentFilter = button.dataset.filter;


    // Update task list
    renderTasks();

  });

});


/* =================================
   CLEAR COMPLETED TASKS
================================= */

clearCompleted.addEventListener("click", function () {

  // Keep only incomplete tasks
  tasks = tasks.filter(function (task) {

    return !task.completed;

  });


  // Update UI
  renderTasks();
});


/* =================================
   BUTTON CLICK EVENT
================================= */

addBtn.addEventListener("click", addTask);


/* =================================
   ENTER KEY SUPPORT
================================= */

taskInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {

    addTask();

  }

});


/* =================================
   INITIAL DISPLAY
================================= */

renderTasks();