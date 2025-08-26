import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { add, formatDistance } from "date-fns";

const container = document.createElement("div");
container.setAttribute("id", "container");

class Task {
  constructor(title, description, dueDate, priority, notes, checkList) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = [];
    this.done = false;
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
  }
  createAddProjectButton() {
    const addBtn = document.createElement("button");
    addBtn.setAttribute("id", "btn-add-project");
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
    container.appendChild(projectTitle);
    const todos = new TodosView();
    const todosDisplay = todos.displayTodosInline(this.tasks);
    container.appendChild(todosDisplay);
    document.body.appendChild(container);
  }
}

class TodosView {
  constructor() {
    this.tasksContainer = document.createElement("div");
    this.tasksContainer.setAttribute("id", "container-tasks");
  }
  displayTodosInline(todolist) {
    // If container already exists, clear it.
    if (document.querySelector("#container-tasks")) {
      document.querySelector("#container-tasks").innerHTML = "";
    }
    todolist.forEach((element) => {
      const task = document.createElement("div");
      const taskTitle = document.createElement("div");
      const taskControls = document.createElement("div");
      const taskCheck = document.createElement("button");
      const taskDelete = document.createElement("button");

      taskTitle.textContent = element.getTitle();
      taskTitle.classList.add("task-title");
      task.classList.add("task");
      if (element.getDone()) {
        task.classList.add("done");
      }
      taskCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`;
      taskDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;
      taskCheck.classList.add("task-check");
      taskDelete.classList.add("task-delete");

      taskControls.classList.add("task-controls");
      taskControls.appendChild(taskCheck);
      taskControls.appendChild(taskDelete);
      task.appendChild(taskTitle);
      task.appendChild(taskControls);
      task.setAttribute("data-attribute", `${element.getId()}`);
      this.tasksContainer.appendChild(task);
    });
    return this.tasksContainer;
  }
}

// Sidebar
const projects = new ProjectList();
const inbox = new Project("inbox");
const home = new Project("home");
const work = new Project("work");
const week = new Project("this week");
const month = new Project("this month");
projects.addProject(inbox, home, work, week, month);

const task1 = new Task("Do laundry");
task1.toggleDone();
const task2 = new Task("Work-out");
inbox.addTask(task1);
inbox.addTask(task2);

const task3 = new Task("Do X");
const task4 = new Task("Do Y");
home.addTask(task3);
home.addTask(task4);

const task5 = new Task("Do A");
const task6 = new Task("Do B");
work.addTask(task5);
work.addTask(task6);

const displaySidebar = (() => {
  const sidebar = new Sidebar();
  sidebar.createLogo();
  sidebar.createProjects(projects);
  sidebar.createAddProjectButton();
  document.body.appendChild(sidebar.getSidebar());
})();

// Render default project on load
const defaultProject = inbox;
document.addEventListener("DOMContentLoaded", () => {
  let view = new ProjectView(defaultProject);
  view.displayProject();
  let currentProject = defaultProject;

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
      currentProject = project;
      console.log("current project", project);
      const view = new ProjectView(project);
      view.displayProject();
    }
  });

  // Task controls handler
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
      // Update Display
      view = new ProjectView(currentProject);
      view.displayProject();
    }
  });
});
