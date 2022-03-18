import { blurContent } from "./content.js";

const blur = blurContent();

const project = (name) => {
  const projectName = name;
  let tasks = [];

  const addTaskToProject = (task) => {
    tasks.push(task);
  };

  return { addTaskToProject, projectName };
};

const projectController = () => {
  let projectList = [];

  const storeProject = (Project) => {
    if (Project) {
      projectList.push(Project);
    } else {
      let projectName = document.querySelector(".modal-project-input").value;
      let newProject = project(projectName);
      projectList.push(newProject);
    }
  };

  const removeProject = (projectName) => {
    projectList.forEach((element, index) => {
      if (projectName === element.projectName) {
        projectList.splice(index, 1);
      }
    });
  };

  return { projectList, storeProject, removeProject };
};

const projectModalController = () => {
  let modal = document.querySelector("#project-add-modal");

  const activateProjectModal = () => {
    modal.classList.remove("bg-modal-project-inactive");
    modal.classList.add("bg-modal-project-active");
    blur.blur();
  };

  const deactivateProjectModal = () => {
    modal.classList.remove("bg-modal-project-active");
    modal.classList.add("bg-modal-project-inactive");
    blur.unBlur();
  };

  return {
    activateProjectModal,
    deactivateProjectModal,
  };
};

export { project, projectModalController, projectController };
