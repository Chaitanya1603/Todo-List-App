// Getting all required elements
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

// We will call this function while adding, deleting, and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  // If tasks' length is 0, then pending num text content will be "no"; if not, then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  todoLists.innerHTML = savedTasks.join("");
  allTasks();
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = Array.from(todoLists.children).map((li) => li.outerHTML);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task while we put value in the textarea and press Enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();

  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = `<li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = "";
    saveTasksToLocalStorage();
    allTasks();
  }
});

// Checking and unchecking the checkbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  saveTasksToLocalStorage();
  allTasks();
}

// Deleting task while we click on the delete icon
function deleteTask(e) {
  e.parentElement.remove();
  saveTasksToLocalStorage();
  allTasks();
}

// Editing task when user clicks on the task content
todoLists.addEventListener("click", (e) => {
  const taskSpan = e.target.closest(".task");
  if (taskSpan) {
    const newText = prompt("Edit task:", taskSpan.textContent);
    if (newText !== null) {
      taskSpan.textContent = newText;
      saveTasksToLocalStorage();
    }
  }
});

// Deleting all the tasks while we click on the clear button
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  saveTasksToLocalStorage();
  allTasks();
});
