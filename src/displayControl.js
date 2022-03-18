import { buildTask } from "./taskDivs.js";
import { buildProject } from "./projectDivs.js";
import { buildProjectUnderlayDiv } from "./projectUnderlayDiv.js";
import { returnFormatDate } from "./content.js";

const displayController = () => {
  //cache DOM
  const content = document.querySelector(".lower-content");
  const upper = document.querySelector(".upper-content-text");

  const removeTasks = () => {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  };

  const displayTasks = (taskList) => {
    if (upper.innerHTML === "Tasks") {
      removeTasks();
      for (let i = 0; i < taskList.length; i++) {
        let div = buildTask(taskList[i], i);
        content.appendChild(div);
      }
    }
  };

  const displayTodayTasks = (taskList) => {
    if (upper.innerHTML === "Due today") {
      let today = returnFormatDate();
      removeTasks();
      for (let i = 0; i < taskList.length; i++) {
        if (today === taskList[i].getDate()) {
          let div = buildTask(taskList[i], i);
          content.appendChild(div);
        }
      }
    }
  };

  const removeProjects = () => {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  };

  const displayProjects = (projectList) => {
    if (upper.innerHTML === "Projects") {
      removeProjects();
      for (let i = 0; i < projectList.length; i++) {
        let div = buildProject(projectList[i].projectName, i);
        content.appendChild(div);
      }
    }
  };

  const clearProjectInput = () => {
    let input = document.querySelector(".modal-project-input");
    input.value = "";
  };

  const underlayProject = (e, tasks) => {
    let content = e.path[2];
    let nameProject = e.path[1].innerText;
    let allProjectTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (nameProject === tasks[i].getProject()) {
        allProjectTasks.push(tasks[i]);
        let underlayDiv = buildProjectUnderlayDiv(tasks[i]);
        content.appendChild(underlayDiv);
      }
    }
  };

  const updateProjectDivShow = (e, tasks, task) => {
    if (task) {
      const projects = document.querySelectorAll(".project-div-capsule");
      const projectName = task.getProject();
      projects.forEach((project) => {
        if (
          project.children[1].innerHTML === projectName &&
          project.parentElement.classList.contains("project-div-show")
        ) {
          let underlayDiv = buildProjectUnderlayDiv(task);
          project.parentElement.appendChild(underlayDiv);
        }
      });
    } else if (e.path[2].className === "project-div") {
      e.path[2].className = "project-div-show";
      underlayProject(e, tasks);
    } else {
      e.path[2].className = "project-div";
      let content = e.path[2];
      while (content.childNodes.length > 1) {
        content.removeChild(content.lastChild);
      }
    }
  };

  return {
    displayTasks,
    removeTasks,
    displayProjects,
    clearProjectInput,
    updateProjectDivShow,
    displayTodayTasks,
  };
};

export { displayController };
