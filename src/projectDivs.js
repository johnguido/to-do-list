import trash from "./img/trashcan.png";
import add from "./img/add.png";

function buildProject(nameOfProject) {
  const main = document.createElement("div");
  main.classList.add("project-div");
  main.setAttribute("id", nameOfProject);
  const capsule = document.createElement("div");
  capsule.classList.add("project-div-capsule");
  const text = document.createElement("p");
  text.innerHTML = nameOfProject;
  const bullet = document.createElement("input");
  bullet.classList.add("project-button-bullet");
  bullet.setAttribute("type", "checkbox");
  bullet.innerHTML = "&#8226;";
  const adder = createAddProjectButton();
  const delButton = createDeleteProjectButton();
  const projectSeparatorDiv = createTaskSepDiv();
  capsule.appendChild(bullet);
  capsule.appendChild(text);
  capsule.appendChild(projectSeparatorDiv);
  capsule.appendChild(delButton);
  capsule.appendChild(adder);
  main.appendChild(capsule);
  return main;
}

function createDeleteProjectButton() {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("project-div-trash");
  img.src = trash;
  div.classList.add("project-div-trash");
  div.appendChild(img);
  return div;
}

function createAddProjectButton() {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("project-div-add");
  img.src = add;
  div.classList.add("project-div-add");
  div.appendChild(img);
  return div;
}

function createTaskSepDiv() {
  const div = document.createElement("div");
  div.classList.add("project-div-sep");
  return div;
}

export { buildProject };
