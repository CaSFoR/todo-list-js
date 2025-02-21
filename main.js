let tasks = [];
let bg = "green";

function getTasksFormLocalStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks =  retrievedTasks ?? [];
}
getTasksFormLocalStorage();
function getData() {
  document.getElementById("tasks").innerHTML = "";

  tasks.forEach((task, index) => {
    let bg = task.isDone ? "rgb(180, 10, 10)" : "green";
    let taskClass = task.isDone ? "done" : "";

    let content = `
      <!-- Task -->
      <div class="task ${taskClass}" >
        <!-- Task Info -->
        <div class="task-info">
          <h2>${task.title}</h2>
          <div style="display: flex; align-items: center;">
            <span class="material-symbols-outlined">calendar_month</span>
            <span>${task.date}</span>
          </div>
        </div>
        <!--// Task Info //-->

        <!-- Task Action -->
        <div class="task-action">
          <button class="ciruler" onclick="toggleTaskCompleted(${index})" style="background-color: ${bg}; color: #FFF;">
            ${
              taskClass
                ? '<span class="material-symbols-outlined">close</span>'
                : '<span class="material-symbols-outlined">check</span>'
            }
           
          </button>
          <button class="ciruler" onclick="editTask(${index})" style="background-color: rgb(42, 146, 243); color: #FFF;">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="ciruler" onclick="deleteTask(${index})"  style="background-color: #aa0000; color: #FFF;">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <!--// Task Action //-->
      </div>
      <!--// Task //-->
    `;
    document.getElementById("tasks").innerHTML += content;
  });
}

getData();

let form = document.getElementById("form");

function toggleForm() {
  if (form.style.display == "flex") {
    form.style.display = "none";
  } else {
    form.style.display = "flex";
    form.style.justifyContent = "center";
    form.style.alignItems = "center";
  }
}

document
  .getElementById("add-btn")
  .addEventListener("click", addTask);

let titleElement = document.getElementById("title");
let dateElement = document.getElementById("date");


function addTask() {
  let title = titleElement.value;
  let date = new Date(dateElement.value);

  if (title && dateElement.value) {
    let formattedDate = date.toLocaleDateString("en-US");
    let objTask = {
      title: title,
      date: formattedDate,
      isDone: false,
    };
    tasks.push(objTask);
    storeTasks();
    toggleForm();
    getData();

    // Clear input fields
    titleElement.value = "";
    dateElement.value = "";
  } else {
    alert("يرجى إدخال العنوان والتاريخ.");
  }
}

function editTask(index) {
  let task = tasks[index];

  let newTitle = prompt("الرجاء ادخل العنوان الجديد", task.title);
  let newDate = prompt("الرجاء ادخل التاريخ الجديد", task.date);

  if (newTitle) {
    task.title = newTitle;
  }

  if (newDate) {
    let date = new Date(newDate);
    if (!isNaN(date)) {
      task.date = date.toLocaleDateString("en-US");
    } else {
      alert("تاريخ غير صالح. الرجاء إدخال التاريخ بتنسيق MM/DD/YYYY");
    }
  }
  tasks[index] = task;
  storeTasks();
  getData();
}

function deleteTask(index) {
  let isConfirmed = confirm(
    `هل انت متأكد من حذف المهمة ؟ ( ${tasks[index].title} )`
  );
  if (isConfirmed) {
    tasks.splice(index, 1);
    storeTasks();
    getData();
  }
}


function toggleTaskCompleted(index) {
  tasks[index].isDone = !tasks[index].isDone;
  storeTasks();
  getData();
}


//==========STORE TASKS =============//

function storeTasks() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}