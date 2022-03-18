import "./style.css";
import { taskController, taskModalController, task } from "./tasks.js";
import { projectController, projectModalController } from "./projects.js";
import { displayController } from "./displayControl.js";
import { storageControl } from "./storageControl";
import {
  taskEditModalController,
  taskEditFormController,
} from "./taskEditControl.js";
import {
  upperContentControl,
  updateInputTaskProjects,
  updateInputTaskProjectsEdit,
} from "./content.js";

import icon from "./img/checkmark.png";
const logo = document.querySelector(".logo");
logo.src = icon;

const taskModal = taskModalController();
const projectControl = projectController();
const projectModal = projectModalController();
const upperControl = upperContentControl();
const displayControl = displayController();
const taskControl = taskController();
const storageCont = storageControl();
const taskEditModal = taskEditModalController();
const taskEditFormControl = taskEditFormController();

let taskINDEX = 0;

let taskInfoFromStorage = storageCont.getTasksFromStorage(); //grab all task info from storage
let tasks = storageCont.convertTasks(taskInfoFromStorage); //create tasks array using info ^
tasks.forEach((element) => {
  taskControl.addTaskToList(element);
});

let projectInfoFromStorage = storageCont.getProjectsFromStorage();
let projects = storageCont.convertProjects(projectInfoFromStorage);
projects.forEach((element) => {
  projectControl.storeProject(element);
});

//check for click on any of the sidebar buttons
addEventListener("click", function (e) {
  if (e.target.innerHTML === "Add Task") {
    updateInputTaskProjects(projectControl.projectList); //update input for projects with current projects
    taskModal.activateTaskModal();
  } else if (e.target.innerHTML === "Add Project") {
    projectModal.activateProjectModal();
  } else if (e.target.innerHTML === "Tasks") {
    upperControl.changeText("Tasks");
    displayControl.displayTasks(taskControl.taskList);
  } else if (e.target.innerHTML === "Today") {
    upperControl.changeText("Due today");
    displayControl.displayTodayTasks(taskControl.taskList);
  } else if (e.target.innerHTML === "Projects") {
    upperControl.changeText("Projects");
    displayControl.removeTasks();
    displayControl.displayProjects(projectControl.projectList);
  }
});

//check for click on Add Task modal 'Submit' and 'Cancel' buttons
addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-task-button-input")) {
    if (e.target.innerHTML === "Submit") {
      let task = taskControl.createTask();
      taskControl.addTaskToList(task);
      storageCont.storeTask(task);
      displayControl.displayTasks(taskControl.taskList); //check for both cases
      displayControl.displayTodayTasks(taskControl.taskList); //check for both cases
      displayControl.updateProjectDivShow(e, taskControl.taskList, task);
      taskModal.deactivateTaskModal();
      taskModal.clearTaskInputs();
    } else if (e.target.innerHTML === "Cancel") {
      taskModal.deactivateTaskModal();
      taskModal.clearTaskInputs();
    }
  }
});

//check for click on the delete and edit buttons on tasks themselves
addEventListener("click", function (e) {
  if (e.target.classList.contains("task-div-trash")) {
    taskControl.removeTaskFromList(e.path[1].id); //remove task at this index inside of the taskList
    displayControl.removeTasks();
    displayControl.displayTasks(taskControl.taskList);
    storageCont.clearTaskStorage();
    storageCont.storeAllTasks(taskControl.taskList);
  } else if (e.target.classList.contains("task-div-edit")) {
    console.log(taskControl.taskList);
    console.log(e.path[2].id);
    //taskINDEX = e.path[2].id; //store index of tasks thats being edited just incase its submitted
    updateInputTaskProjectsEdit(projectControl.projectList); //update project list to show all projects inside edit form
    taskEditFormControl.fillForm(taskControl.taskList[e.path[2].id]); //fill form with task info from tasklist @ index
    taskEditModal.activateTaskModal();
  }
});

//check on task edit form if submit or cancel has been clicked
addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-task-button-input-edit")) {
    if (e.target.innerHTML === "Submit") {
      const task = taskEditFormControl.createEditTask();
      console.log(taskControl.taskList);
      taskControl.replaceTask(taskINDEX, task); //task index already stored above..will use that inside of replaceTask()
      displayControl.removeTasks();
      displayControl.displayTasks(taskControl.taskList);
      displayControl.displayTodayTasks(taskControl.taskList);
      taskEditModal.deactivateTaskModal();
      storageCont.clearTaskStorage();
      storageCont.storeAllTasks(taskControl.taskList);
    } else if (e.target.innerHTML === "Cancel") {
      taskEditModal.deactivateTaskModal();
    }
  }
});

//check if project modal submit or cancel has been clicked
addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-project-submit")) {
    storageCont.storeProject();
    projectControl.storeProject();
    displayControl.clearProjectInput();
    projectModal.deactivateProjectModal();
    displayControl.displayProjects(projectControl.projectList);
  } else if (e.target.classList.contains("modal-project-cancel")) {
    displayControl.clearProjectInput();
    projectModal.deactivateProjectModal();
  }
});

//check for bullet click either on task or project divs
addEventListener("click", function (e) {
  if (e.target.classList.contains("task-button-bullet")) {
    taskControl.completeTask(e);
  } else if (e.target.classList.contains("project-button-bullet")) {
    displayControl.updateProjectDivShow(e, taskControl.taskList, false);
  }
});

//check for click on add sign inside of projects tab (can only see if project is availale)
addEventListener("click", function (e) {
  if (e.target.classList.contains("project-div-add")) {
    const projectName = e.path[3].id;
    updateInputTaskProjects(projectControl.projectList);
    taskModal.activateTaskModal(projectName);
  } else if (e.target.classList.contains("project-div-trash")) {
    const projectName = e.path[3].id;
    projectControl.removeProject(projectName);
    storageCont.clearProjectStorage();
    displayControl.displayProjects(projectControl.projectList);
  }
});

displayControl.displayTasks(taskControl.taskList);
