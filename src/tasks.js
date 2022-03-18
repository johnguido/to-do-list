import { blurContent } from "./content";

const blur = blurContent(); //init blur screen handler

//task object
const task = (
  taskName,
  taskDescription,
  taskPriority,
  taskDate,
  taskProject
) => {
  let name = taskName;
  let description = taskDescription;
  let priority = taskPriority;
  let date = taskDate;
  let project = taskProject;

  const getName = () => name;
  const getDesc = () => description;
  const getPriority = () => priority;
  const getDate = () => date;
  const getProject = () => project;

  return {
    getName,
    getDesc,
    getPriority,
    getDate,
    getProject,
    name,
    description,
    priority,
    date,
    project,
  };
};

const taskController = () => {
  //cache DOM
  const taskName = document.querySelector(".modal-task-text-input");
  const taskDate = document.querySelector(".modal-task-date-input");
  const taskDescription = document.querySelector(".modal-task-desc-input");
  const taskPriority = document.querySelector(".modal-task-priority-input");
  const project = document.querySelector(".modal-task-projects-input");

  let taskList = [];

  const createTask = () => {
    const name = taskName.value;
    const date = taskDate.value;
    const description = taskDescription.value;
    const priority = taskPriority.options[taskPriority.selectedIndex].text;
    const projectName = project.options[project.selectedIndex].text;
    let newTask = task(name, description, priority, date, projectName);
    return newTask;
  };

  const completeTask = (e) => {
    if (e.path[1].childNodes[1].className === "task-div-name-done") {
      e.path[1].childNodes[1].className = "task-div-name";
    } else {
      e.path[1].childNodes[1].className = "task-div-name-done";
    }
  };

  const replaceTask = (index, task) => {
    taskList.splice(index, 1, task);
  };

  const addTaskToList = (aTask) => {
    taskList.push(aTask);
  };

  const removeTaskFromList = (index) => {
    taskList.splice(index, 1);
  };

  return {
    addTaskToList,
    removeTaskFromList,
    completeTask,
    replaceTask,
    createTask,
    taskList,
  };
};

const taskModalController = () => {
  //cache add task modal DOM
  let modal = document.querySelector("#task-add-modal");
  let name = document.querySelector(".modal-task-text-input");
  let date = document.querySelector(".modal-task-date-input");
  let taskPriority = document.querySelector(".modal-task-priority-input");
  let project = document.querySelector(".modal-task-projects-input");
  let description = document.querySelector(".modal-task-desc-input");

  const activateTaskModal = (projectName) => {
    if (projectName) {
      for (let i = 0; i < project.childElementCount; i++) {
        if (projectName === project.children[i].innerHTML) {
          project.selectedIndex = i;
        }
      }
    }
    modal.classList.remove("bg-modal-task-inactive");
    modal.classList.add("bg-modal-task-active");
    blur.blur();
  };

  const deactivateTaskModal = () => {
    modal.classList.remove("bg-modal-task-active");
    modal.classList.add("bg-modal-task-inactive");
    blur.unBlur();
  };

  const clearTaskInputs = () => {
    name.value = "";
    date.value = "";
    taskPriority.selectedIndex = 0;
    project.selectedIndex = 0;
    description.value = "";
  };

  return { activateTaskModal, deactivateTaskModal, clearTaskInputs };
};

export { taskController, taskModalController, task };
