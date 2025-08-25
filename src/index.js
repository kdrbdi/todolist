import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { formatDistance } from "date-fns";

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
  // TODO: checkList methods

  getDone() {
    return this.done;
  }
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
  removeTask(task) {
    this.tasks = this.tasks.filter((item) => item.id !== task.id);
  }
}

class ProjectList {
  #projects = [];
  getProjects() {
    return this.#projects;
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
    projectList.getProjects().forEach((element) => {
      const proj = document.createElement("div");
      proj.classList.add("project-title");
      proj.textContent = element.title;
      this.sidebar.appendChild(proj);
    });
  }
  getSidebar() {
    return this.sidebar;
  }
}

class TodosView {
  constructor() {
    this.container = document.createElement("div");
    this.container.setAttribute("id", "container");
  }
  displayTodoInline(todolist) {
    // If container already exists, clear it.
    if (document.querySelector("#container")) {
      document.querySelector("#container").innerHTML = "";
    }
    todolist.forEach((element) => {
      const task = document.createElement("div");
      const taskTitle = document.createElement("div");
      taskTitle.textContent = element.title;
      task.appendChild(taskTitle);
      this.container.appendChild(task);
      document.body.appendChild(this.container);
    });
  }
}

// Sidebar menu
const projects = new ProjectList();
const inbox = new Project("inbox");
const home = new Project("home");
const work = new Project("work");
const week = new Project("this week");
const month = new Project("this month");
projects.addProject(inbox, home, work, week, month);

const task1 = new Task("Do laundry");
const task2 = new Task("Work-out");
inbox.addTask(task1);
inbox.addTask(task2);

const displaySidebar = (() => {
  const sidebar = new Sidebar();
  sidebar.createLogo();
  sidebar.createProjects(projects);
  document.body.appendChild(sidebar.getSidebar());
})();

const displayContainer = (() => {})();

const inboxView = new TodosView();

document.addEventListener(
  "DOMContentLoaded",
  inboxView.displayTodoInline(inbox.tasks)
);
