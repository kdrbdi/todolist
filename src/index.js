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
    this.state = "undone";
    this.dateAdded = new Date();
  }
  markTaskDone() {
    this.state = "done";
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
  //   addCheckListItem(item) {
  //     this.checkList.push(item)
  //   }
  //   checkCheckListItem(item) {
  //     this.checkList.
  //   }
}

class Project {
  constructor(title, tasks = []) {
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

const inbox = new Project("inbox");
console.log(inbox);

const task1 = new Task("Do the laundry");
const task2 = new Task("Relax");
console.log(task1);
console.log(task2);

inbox.addTask(task1);
inbox.addTask(task2);
console.log(inbox);

inbox.removeTask(task1);
console.log("Deleting...");
console.log(inbox);

task2.setPriority("High");
task2.markTaskDone();
console.log(inbox);
console.log(task2);
const dateAdded = formatDistance(task2.dateAdded, new Date(), {
  addSuffix: true,
});
console.log("Task2 was added " + dateAdded);
