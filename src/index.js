import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { formatDistance } from "date-fns";

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
      const proj = document.createElement("button");
      proj.classList.add("project-title");
      proj.setAttribute("data-attribute", element.id);
      proj.textContent = element.title;
      this.sidebar.appendChild(proj);
    });
  }
  getSidebar() {
    return this.sidebar;
  }
}

class ProjectView {
  constructor(project) {
    this.title = project.title;
    this.tasks = project.tasks;
  }
  displayProject() {
    container.innerHTML = "";
    const projectTitle = document.createElement("div");
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
      taskTitle.textContent = element.title;
      task.appendChild(taskTitle);
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
  document.body.appendChild(sidebar.getSidebar());
})();

// const inboxView = new ProjectView(inbox);
// inboxView.displayProject();

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
      .filter((item) => item.id == e.target.getAttribute("data-attribute"));
    const view = new ProjectView(...project);
    view.displayProject();
  }
});
