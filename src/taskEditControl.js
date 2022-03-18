import { task } from "./tasks.js";
import { blurContent } from "./content.js";

const blur = blurContent();

const taskEditModalController = () => {
  let modal = document.querySelector("#task-edit-modal");

  const activateTaskModal = () => {
    modal.classList.remove("bg-modal-task-editor-inactive");
    modal.classList.add("bg-modal-task-editor-active");
    blur.blur();
  };

  const deactivateTaskModal = () => {
    modal.classList.remove("bg-modal-task-editor-active");
    modal.classList.add("bg-modal-task-editor-inactive");
    blur.unBlur();
  };

  return { activateTaskModal, deactivateTaskModal };
};

const taskEditFormController = () => {
  const fillForm = (task) => {
    let name = document.querySelector(".modal-task-text-input-edit");
    let date = document.querySelector(".modal-task-date-input-edit");
    let taskPriority = document.querySelector(
      ".modal-task-priority-input-edit"
    );
    let project = document.querySelector(".modal-task-projects-input-edit");
    let description = document.querySelector(".modal-task-desc-input-edit");
    name.value = task.getName();
    date.value = task.getDate();
    if (task.getPriority() === "Low") {
      taskPriority.selectedIndex = 0;
    } else if (task.getPriority() === "Medium") {
      taskPriority.selectedIndex = 1;
    } else {
      taskPriority.selectedIndex = 2;
    }
    description.value = task.getDesc();
    let projectNumber = project.children.length;
    let projectName = task.getProject();
    for (let i = 0; i < projectNumber; i++) {
      if (projectName === project.options[i].text) {
        project.selectedIndex = i;
      }
    }
  };

  const createEditTask = () => {
    let name = document.querySelector(".modal-task-text-input-edit").value;
    let date = document.querySelector(".modal-task-date-input-edit").value;
    let taskPriority = document.querySelector(
      ".modal-task-priority-input-edit"
    );
    let priority = taskPriority.options[taskPriority.selectedIndex].text;
    let project = document.querySelector(".modal-task-projects-input-edit");
    let projectName = project.options[project.selectedIndex].text;
    let description = document.querySelector(
      ".modal-task-desc-input-edit"
    ).value;
    let newTask = task(name, description, priority, date, projectName);
    return newTask;
  };

  return { fillForm, createEditTask };
};

export { taskEditModalController, taskEditFormController };
