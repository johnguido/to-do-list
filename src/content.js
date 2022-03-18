const upperContentControl = () => {
  const upperText = document.querySelector(".upper-content-text");

  const changeText = (text) => {
    upperText.innerHTML = text;
  };

  return { changeText };
};

const blurContent = () => {
  const mainInfo = document.querySelector(".main-info");
  const sideBar = document.querySelector(".sidebar");

  const blur = () => {
    mainInfo.classList.add("blur");
    sideBar.classList.add("blur");
  };

  const unBlur = () => {
    mainInfo.classList.remove("blur");
    sideBar.classList.remove("blur");
  };

  return { blur, unBlur };
};

function updateInputTaskProjects(projectList) {
  const input = document.querySelector(".modal-task-projects-input");
  while (input.firstChild) {
    input.removeChild(input.firstChild);
  }
  if (projectList.length > 0) {
    const defaultValue = createOption("Default");
    input.appendChild(defaultValue);
    for (let i = 0; i < projectList.length; i++) {
      const option = createOption(projectList[i].projectName);
      input.append(option);
    }
  } else {
    const option1 = createOption("Default");
    input.appendChild(option1);
  }
}

function createOption(value) {
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.innerHTML = value;
  return option;
}

function updateInputTaskProjectsEdit(projectList) {
  const input = document.querySelector(".modal-task-projects-input-edit");
  while (input.firstChild) {
    input.removeChild(input.firstChild);
  }
  if (projectList.length > 0) {
    const defaultValue = createOption("Default");
    input.appendChild(defaultValue);
    for (let i = 0; i < projectList.length; i++) {
      const option = createOption(projectList[i].projectName);
      input.append(option);
    }
  } else {
    const option1 = createOption("Default");
    input.appendChild(option1);
  }
}

function returnFormatDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

export {
  upperContentControl,
  updateInputTaskProjects,
  updateInputTaskProjectsEdit,
  blurContent,
  returnFormatDate,
};
