import ItemClient from "./clients/item_client.js";

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  createTaskLi = (task, isDone) => {
    const taskLi = document.createElement("li");
    taskLi.classList.add("task");
    if (!isDone) {
      taskLi.setAttribute("done", "false");
    } else {
      taskLi.setAttribute("done", "true");
    }
    // add checkbox to task
    taskLi.appendChild(this.addCheckbox());
    // add task's text
    taskLi.appendChild(this.addDivText(task));
    // add delete button
    taskLi.appendChild(this.addDeleteButton(task));
    return taskLi;
  };

  addCheckbox = () => {
    const check = document.createElement("button");
    check.classList.add("checkbox");
    check.innerHTML = '<i class="fa-solid fa-square"></i>';
    //check.addEventListener("click", (_) => this.checkTask(task));
    return check;
  };

  addDivText = (task) => {
    const todoTask = document.createElement("div");
    todoTask.classList.add("todo-text");
    todoTask.innerText = task;
    return todoTask;
  };

  addDeleteButton = (task) => {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener("click", (_) => this.deleteTask(task));

    return deleteButton;
  };

  renderTasks = async () => {
    this.todoList.innerHTML = "";
    const todos = await this.itemClient.getTodos();
    //const done = await this.itemClient.getDone();
    todos.forEach((todo) => {
      this.todoList.appendChild(this.createTaskLi(todo, false));
    });
    /*done.forEach((task) => {
      this.todoList.appendChild(this.createTaskLi(task, true));
    });*/
    this.calculatePending();
  };

  addTask = async (e) => {
    // prevents refreshing of the page
    e.preventDefault();
    // create task div and add the todo div to the list
    const tasksToAdd = await this.itemClient.addTodo(this.newTaskText.value);

    await this.renderTasks();
    this.newTaskText.value = "";
  };

  /*checkTask = async (e, todo) => {
    // function that contains the logic of checking tasks
    const checkbox = e.target;
    const task = checkbox.parentElement.parentElement;

    if (
      checkbox.classList[1] === "fa-square" ||
      checkbox.classList[1] === "fa-square-check"
    ) {
      if (task.getAttribute("done") === "false") {
        checkbox.parentElement.innerHTML =
          '<i class="fa-solid fa-square-check"></i>';
        task.style.color = "grey";
        task.style.textDecoration = "line-through";
        task.setAttribute("done", "true");
      } else if (task.getAttribute("done") === "true") {
        checkbox.parentElement.innerHTML = '<i class="fa-solid fa-square"></i>';
        task.style.color = "#FFF";
        task.style.textDecoration = "none";
        task.setAttribute("done", "false");
      }
    }
    await this.renderTasks();
  };*/

  deleteTask = async (task) => {
    // function that deletes a task
    await this.itemClient.deleteTodo(task);
    await this.renderTasks();
  };

  handleTabs = (e) => {
    const button = e.target.id;
    const tasks = this.todoList.childNodes;
    switch (button) {
      case "all-tasks":
        this.notDoneButton.style.opacity = "0.5";
        this.allTasksButton.style.opacity = "1";
        this.doneButton.style.opacity = "0.5";
        tasks.forEach((task) => {
          task.style.display = "flex";
        });
        break;
      case "done":
        this.notDoneButton.style.opacity = "0.5";
        this.allTasksButton.style.opacity = "0.5";
        this.doneButton.style.opacity = "1";
        tasks.forEach((task) => {
          if (task.getAttribute("done") === "true") {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
        break;
      case "not-done":
        this.notDoneButton.style.opacity = "1";
        this.allTasksButton.style.opacity = "0.5";
        this.doneButton.style.opacity = "0.5";
        tasks.forEach((task) => {
          if (task.getAttribute("done") === "false") {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
        });
        break;
    }
  };

  calculatePending = () => {
    // function that calculates how many pending tasks there are
    const tasks = this.todoList.childNodes;
    const total = tasks.length;
    let numberOfPending = 0;
    tasks.forEach((task) => {
      if (task.getAttribute("done") === "false") {
        numberOfPending++;
      }
    });
    pending.innerText = `There are ${numberOfPending} / ${total} pending tasks`;
  };

  clearAll = async () => {
    // function that clears all the tasks
    await this.itemClient.deleteAll();
    await this.renderTasks();
  };

  init = async () => {
    //selectors
    this.todoList = document.querySelector(".todo-list");
    this.newTaskText = document.querySelector(".new-task-text");
    this.addTodoTask = document.querySelector(".add-task");
    this.tabs = document.querySelector("#tabs");
    this.allTasksButton = document.querySelector("#all-tasks");
    this.doneButton = document.querySelector("#done");
    this.notDoneButton = document.querySelector("#not-done");
    this.clearAllButton = document.querySelector("#clear-all");
    this.pending = document.querySelector("#pending");

    //event listeners
    this.addTodoTask.addEventListener("click", this.addTask);
    this.todoList.addEventListener("click", (e) => {
      this.deleteTask(e);
      if (e.target.classList[0] === "todo-text") {
        const taskText = e.target.childNodes[0].nodeValue;
        /*this.checkTask(e, taskText);
        if (taskText) {
          window.alert(taskText + " was chosen");
        } else {
          window.alert("Empty task was chosen");
        }*/
      }
    });
    tabs.addEventListener("click", main.handleTabs);
    this.clearAllButton.addEventListener("click", this.clearAll);

    await this.renderTasks();
  };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
