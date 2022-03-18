import green from "./img/green_circle.png";
import yellow from "./img/yellow_circle.png";
import red from "./img/red_circle.png";
import trash from "./img/trashcan.png";
import edit from "./img/edit.png";

function buildTask(task, i) {
  const main = document.createElement("div");
  main.classList.add("task-div");
  main.setAttribute("id", i);
  const taskBulletDiv = createTaskBulletInput();
  const taskNameDiv = createTaskNameDiv(task.getName());
  const taskSeparatorDiv = createTaskSepDiv();
  const taskDueDateDiv = createTaskDueDateDiv(task.getDate());
  const taskPriorityDiv = createTaskPriorityImg(task.getPriority());
  const taskDeleteButton = createTaskDeleteButton();
  const taskEditButton = createTaskEditButton();
  main.appendChild(taskBulletDiv);
  main.appendChild(taskNameDiv);
  main.appendChild(taskSeparatorDiv);
  main.appendChild(taskDueDateDiv);
  main.appendChild(taskPriorityDiv);
  main.appendChild(taskDeleteButton);
  main.appendChild(taskEditButton);
  return main;
}

function createTaskBulletInput() {
  const div = document.createElement("input");
  div.classList.add("task-button-bullet");
  div.setAttribute("type", "checkbox");
  div.innerHTML = "&#8226;";
  return div;
}

function createTaskNameDiv(taskName) {
  const div = document.createElement("div");
  div.classList.add("task-div-name");
  if (taskName != "") {
    div.innerHTML = taskName;
  } else {
    div.innerHTML = "";
  }
  return div;
}

function createTaskSepDiv() {
  const div = document.createElement("div");
  div.classList.add("task-div-sep");
  return div;
}

function createTaskDeleteButton() {
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.classList.add("task-div-trash");
  img.src = trash;
  button.classList.add("task-div-trash");
  button.appendChild(img);
  return button;
}

function createTaskEditButton() {
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.classList.add("task-div-edit");
  img.src = edit;
  button.classList.add("task-div-edit");
  button.appendChild(img);
  return button;
}

function createTaskDueDateDiv(taskDate) {
  const div = document.createElement("div");
  div.classList.add("task-div-date");
  if (taskDate != "") {
    div.innerHTML = taskDate;
  } else {
    div.innerHTML = "";
  }
  return div;
}

function createTaskPriorityImg(taskPriority) {
  const img = document.createElement("img");
  img.classList.add("task-div-priority");
  if (taskPriority === "Low") {
    img.src = green;
  } else if (taskPriority === "Medium") {
    img.src = yellow;
  } else {
    img.src = red;
  }
  return img;
}

export { buildTask };
