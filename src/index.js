import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { add, formatDistanceToNowStrict } from "date-fns";

const container = document.createElement("div");
container.setAttribute("id", "container");

class Task {
  constructor(
    title,
    done = false,
    description,
    dueDate,
    priority,
    notes,
    checkList
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = [];
    this.done = done;
    this.dateAdded = new Date();
  }
  toggleDone() {
    this.done = !this.done;
  }
  setDescription(description) {
    this.description = description;
  }
  setDueDate(date) {
    this.dueDate = date;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  setNotes(notes) {
    this.notes = notes;
  }
  getId() {
    return this.id;
  }
  getDone() {
    return this.done;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getDueDate() {
    return this.dueDate;
  }
  getPriority() {
    return this.priority;
  }
  getNotes() {
    return this.notes;
  }
  getDateAdded() {
    return this.dateAdded;
  }
  // TODO: checkList methods
}

class Project {
  constructor(title, tasks = []) {
    this.id = uuidv4();
    this.title = title;
    this.tasks = tasks;
  }
  addTask(task) {
    this.tasks.push(task);
  }
  addTaskToTop(task) {
    this.tasks.unshift(task);
  }
  removeTask(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }
  getTask(id) {
    return this.tasks.find((item) => item.id == id);
  }
}

class ProjectList {
  #projects = [];
  getProjects() {
    return this.#projects;
  }
  getProject(id) {
    return this.#projects.find((item) => item.id == id);
  }
  getDefaultProject() {
    return this.#projects[0];
  }
  addProject(...project) {
    this.#projects.push(...project);
  }
  removeProject(project) {
    this.#projects = this.#projects.filter((item) => item.id !== project.id);
  }
}

class Sidebar {
  constructor() {
    this.sidebar = document.createElement("div");
    this.sidebar.setAttribute("id", "sidebar");
  }
  createLogo() {
    const logo = document.createElement("div");
    logo.classList.add("logo");
    const logoTitle = document.createElement("div");
    const logoIcon = document.createElement("div");
    logoTitle.textContent = "2dos";
    logoTitle.classList.add("logo-title");
    logoIcon.classList.add("icon-logo");
    logo.appendChild(logoIcon);
    logo.appendChild(logoTitle);

    this.sidebar.appendChild(logo);
  }
  createProjects(projectList) {
    const projectGroup = document.createElement("div");
    projectGroup.classList.add("project-group");
    projectList.getProjects().forEach((element) => {
      const proj = document.createElement("button");
      proj.classList.add("project-title");
      proj.setAttribute("data-attribute", element.id);
      proj.textContent = element.title;
      projectGroup.appendChild(proj);
    });
    this.sidebar.appendChild(projectGroup);
    return projectGroup;
  }
  createAddProjectButton() {
    const addBtn = document.createElement("button");
    addBtn.setAttribute("id", "btn-add-project");
    addBtn.classList.add("btn-project");
    addBtn.textContent = "Add Project";
    this.sidebar.appendChild(addBtn);
  }
  getSidebar() {
    return this.sidebar;
  }
}

class ProjectView {
  constructor(project) {
    this.id = project.id;
    this.title = project.title;
    this.tasks = project.tasks;
  }
  displayProject() {
    container.innerHTML = "";
    const projectTitle = document.createElement("div");
    projectTitle.classList.add("view-title");
    projectTitle.textContent = this.title;

    const todos = new TodosView();
    const todosDisplay = todos.displayTodosInline(this.tasks);

    container.appendChild(projectTitle);
    container.appendChild(todosDisplay);
    document.body.appendChild(container);
  }
}

class TodosView {
  constructor() {
    this.tasksContainer = document.createElement("div");
    this.tasksContainer.setAttribute("id", "container-tasks");
  }
  displayTaskForm() {
    if (document.querySelector("#container-tasks")) {
      document.querySelector("#container-tasks").innerHTML = "";
    }
    const inputWrapper = document.createElement("div");
    const input = document.createElement("input");
    const btnSubmit = document.createElement("button");

    inputWrapper.classList.add("input-wrapper");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Add a task");
    btnSubmit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;
    btnSubmit.classList.add("btn-add-task");

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(btnSubmit);

    this.tasksContainer.appendChild(inputWrapper);
  }
  displayTodosInline(todolist) {
    this.displayTaskForm();
    if (todolist) {
      todolist.forEach((element) => {
        const task = document.createElement("div");
        const taskTitle = document.createElement("div");
        const taskControls = document.createElement("div");
        const taskCheck = document.createElement("button");
        const taskDelete = document.createElement("button");
        const taskDateAdded = document.createElement("div");

        taskTitle.textContent = element.getTitle();
        taskTitle.classList.add("task-title");
        task.classList.add("task");
        if (element.getDone()) {
          task.classList.add("done");
        }
        taskCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`;
        taskCheck.classList.add("task-check");
        taskDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;
        taskDelete.classList.add("task-delete");

        taskDateAdded.classList.add("date-added");
        taskDateAdded.textContent = `Added 
        ${formatDistanceToNowStrict(element.getDateAdded())} ago`;

        taskControls.classList.add("task-controls");
        taskControls.appendChild(taskCheck);
        taskControls.appendChild(taskDelete);
        task.appendChild(taskTitle);
        task.appendChild(taskDateAdded);
        task.appendChild(taskControls);
        task.setAttribute("data-attribute", `${element.getId()}`);
        this.tasksContainer.appendChild(task);
      });
    }
    return this.tasksContainer;
  }
}

function createProjectModal() {
  const modal = document.createElement("dialog");
  const modalTitle = document.createElement("p");
  const input = document.createElement("input");
  const btnSubmit = document.createElement("button");
  const btnClose = document.createElement("button");

  modal.classList.add("modal");
  modal.classList.add("modal-project");
  modalTitle.classList.add("modal-title");
  modalTitle.innerText = "Project title";
  input.setAttribute("type", "text");
  input.classList.add("modal-input");
  input.setAttribute("required", "");
  btnSubmit.innerText = "Submit";
  btnSubmit.classList.add("btn-submit-project");
  btnClose.innerText = "Close";
  btnClose.classList.add("btn-close-modal");

  modal.appendChild(modalTitle);
  modal.appendChild(input);
  modal.appendChild(btnSubmit);
  modal.appendChild(btnClose);

  document.body.appendChild(modal);
  return modal;
}

// localStorage

// Reconstruct Project list recursively (ProjectList -> Project -> Tasks)
const projects = (() => {
  const retrievedProjList = localStorage.getItem("projects");
  if (!retrievedProjList) {
    const projects = new ProjectList();
    const inbox = new Project("inbox");
    const task = new Task("Do Laundry");
    inbox.addTask(task);
    projects.addProject(inbox);
    localStorage.setItem("projects", JSON.stringify(projects.getProjects()));
    return projects;
  } else {
    const retrievedData = JSON.parse(retrievedProjList);
    const reconstructedProjList = new ProjectList();
    for (let project of retrievedData) {
      console.log(project.tasks);
      let tempProj = new Project(project.title);
      project.tasks.forEach((item) => {
        console.log(item);
        let tempTask = new Task(
          item.title,
          item.done,
          item.description,
          item.dueDate,
          item.priority,
          item.notes,
          item.checkList
        );
        console.log("temp task", tempTask);
        tempProj.addTask(tempTask);
      });
      console.log(tempProj);
      reconstructedProjList.addProject(tempProj);
    }
    console.log(reconstructedProjList);
    return reconstructedProjList;
  }
})();

function saveProjects(projects) {
  localStorage.setItem(`projects`, JSON.stringify(projects.getProjects()));
}

const displaySidebar = (() => {
  const sidebar = new Sidebar();
  sidebar.createLogo();
  sidebar.createProjects(projects);
  sidebar.createAddProjectButton();
  document.body.appendChild(sidebar.getSidebar());

  function updateSidebarProjects(newProjects) {
    const oldProjectsList = document.querySelector(".project-group");
    const newProjectsList = sidebar.createProjects(newProjects);
    document
      .querySelector("#sidebar")
      .replaceChild(newProjectsList, oldProjectsList);
  }
  return { updateSidebarProjects };
})();

// Render default project on load
const defaultProject = projects.getDefaultProject();
let currentProject = defaultProject;
const modal = createProjectModal();

// Helper - update display of projects
function updateDisplay(proj) {
  let view = new ProjectView(proj);
  view.displayProject();

  return view;
}

document.addEventListener("DOMContentLoaded", (e) => {
  let view = updateDisplay(defaultProject);

  // Sidebar/Projects Handler
  document.querySelector("#sidebar").addEventListener("click", (e) => {
    if (e.target.classList.contains("project-title")) {
      // Mark tab as active (for styling) and remove class from
      // other buttons
      const tabs = document.querySelectorAll(".project-title");
      tabs.forEach((item) => {
        if (item.classList.contains("current-tab")) {
          item.classList.toggle("current-tab");
        }
      });
      e.target.classList.toggle("current-tab");
      const project = projects
        .getProjects()
        .find((item) => item.id == e.target.getAttribute("data-attribute"));
      console.log("here", project);
      currentProject = project;
      console.log("current project", currentProject);
      updateDisplay(currentProject);
    }
  });
});

// Clicks handler
document.body.addEventListener("click", (e) => {
  console.log("event fired", e.target);

  if (e.target.closest(".task-controls")) {
    // Detect current task
    const taskId =
      e.target.parentNode.parentNode.getAttribute("data-attribute");

    // Handler - delete task
    if (e.target.classList.contains("task-delete")) {
      currentProject.removeTask(taskId);
    }

    // Handler - mark task as DONE
    if (e.target.classList.contains("task-check")) {
      currentProject.getTask(taskId).toggleDone();
    }

    saveProjects(projects);
    updateDisplay(currentProject);
  }
  if (e.target.classList.contains("btn-add-task")) {
    const input = document.querySelector(".input-wrapper input");
    const inputValue = input.value;
    console.log("current project", currentProject);
    console.log("current project tasks", currentProject.tasks);
    console.log("input value", inputValue);
    const addedTask = new Task(inputValue);
    console.log(addedTask);
    currentProject.addTaskToTop(addedTask);
    console.log("current project AFTER", currentProject);
    console.log("current project tasks AFTER", currentProject.tasks);
    // Update localStorage
    saveProjects(projects);
    updateDisplay(currentProject);
  }

  // Handle Add project modal
  if (e.target.classList.contains("btn-project")) {
    modal.showModal();
  }
  // Handle modal controls
  if (e.target.closest(".modal")) {
    if (e.target.classList.contains("btn-submit-project")) {
      const addedProjTitle = document.querySelector(
        ".modal .modal-input"
      ).value;
      if (addedProjTitle) {
        const addedProj = new Project(addedProjTitle);
        projects.addProject(addedProj);
        currentProject = addedProj;
        saveProjects(projects);
        updateDisplay(currentProject);
        document.querySelector(".modal .modal-input").value = "";
        displaySidebar.updateSidebarProjects(projects);
      }
    }
  }
  document
    .querySelector(".modal .btn-close-modal")
    .addEventListener("click", () => {
      modal.close();
    });
  console.log("I want to add project");
});

document.body.addEventListener("keydown", function (e) {
  if (e.target.closest(".input-wrapper")) {
    if (e.key === "Enter") {
      document.querySelector(".btn-add-task").click();
    }
  }
  if (e.target.closest(".modal")) {
    console.log("inside modal");
    if (e.key === "Enter") {
      document.querySelector(".btn-submit-project").click();
      document.querySelector(".modal-project").close();
      // document.querySelector(".modal").close();
    }
  }
});
