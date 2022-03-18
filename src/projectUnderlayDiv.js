function buildProjectUnderlayDiv(task) {
  const main = document.createElement("div");
  const nameDiv = createNameDiv(task);
  const dateDiv = createDateDiv(task);
  main.classList.add("project-underlay-div");
  main.appendChild(nameDiv);
  main.appendChild(dateDiv);
  return main;
}

function createNameDiv(task) {
  const div = document.createElement("div");
  div.classList.add("project-underlay-name");
  div.innerHTML = task.getName();
  return div;
}

function createDateDiv(task) {
  const date = document.createElement("div");
  date.classList.add("project-underlay-date");
  date.innerHTML = task.getDate();
  return date;
}

export { buildProjectUnderlayDiv };
