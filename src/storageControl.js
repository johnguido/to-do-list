import { project } from "./projects.js";
import { task } from "./tasks.js";

const storageControl = () => {
  const clearProjectStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)[0] === "p") {
        let key = localStorage.key(i);
        localStorage.removeItem(key);
      }
    }
  };

  const storeProject = () => {
    let projectName = document.querySelector(".modal-project-input").value;
    let project = {
      name: projectName,
    };
    const projectSerialized = JSON.stringify(project);
    let name = "project " + projectName;
    localStorage.setItem(name, projectSerialized);
  };

  const storeAllTasks = (taskList) => {
    console.log(taskList);
    taskList.forEach((element) => {
      storeTask(element);
    });
  };

  const storeTask = (task) => {
    const taskSerialized = JSON.stringify(task);
    let name = "task " + task.getName();
    localStorage.setItem(name, taskSerialized);
  };

  const convertProjects = (storageProjects) => {
    let projectArray = [];
    storageProjects.forEach((element) => {
      let projectInfo = JSON.parse(element);
      const name = projectInfo.name;
      const newProject = project(name);
      projectArray.push(newProject);
    });
    return projectArray;
  };

  const convertTasks = (storageTasks) => {
    let taskArray = [];
    storageTasks.forEach((element) => {
      let taskInfo = JSON.parse(element);
      const name = taskInfo.name;
      const description = taskInfo.description;
      const priority = taskInfo.priority;
      const date = taskInfo.date;
      const project = taskInfo.project;
      const newTask = task(name, description, priority, date, project);
      taskArray.push(newTask);
    });
    return taskArray;
  };

  const getTasksFromStorage = () => {
    let values = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)[0] === "t") {
        //t for task
        values.push(localStorage.getItem(localStorage.key(i)));
      }
    }

    return values;
  };

  const getProjectsFromStorage = () => {
    let values = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)[0] === "p") {
        //t for task
        values.push(localStorage.getItem(localStorage.key(i)));
      }
    }

    return values;
  };

  const clearTaskStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)[0] === "t") {
        let key = localStorage.key(i);
        localStorage.removeItem(key);
      }
    }
  };

  return {
    storeTask,
    getTasksFromStorage,
    convertTasks,
    clearTaskStorage,
    storeAllTasks,
    storeProject,
    clearProjectStorage,
    getProjectsFromStorage,
    convertProjects,
  };
};

export { storageControl };
