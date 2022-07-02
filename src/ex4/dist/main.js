import { ItemClient } from "./clients/item_client.js";

class Main {
  constructor() {
    this.itemClient = new ItemClient();
  }

  init = async () => {
    const addItemButton = document.getElementById("add-task");
    addItemButton.addEventListener("click", this.handleItem);

    await this.renderItems();
  };

  handleItem = async () => {
    const input = document.getElementById("new-task-text");
    const inputValue = input.value;

    await this.itemClient.addTodo(inputValue);
    await this.renderItems();
  };

  deleteItem = async (item) => {
    await this.itemClient.deleteTodo(item);
    await this.renderItems();
  };

  //checkItem = (item) => {};

  renderItems = async () => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    const items = await this.itemClient.getTodos();

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task");
      listItem.innerHTML = item;

      const listItemDeleteButton = this._createDeleteButton(item);
      listItem.appendChild(listItemDeleteButton);
      const checkbox = this._createCheckbox(item);
      listItem.appendChild(checkbox);
      list.appendChild(listItem);
    });
  };

  _createDeleteButton = (item) => {
    const button = document.createElement("button");
    button.innerHTML = '<i class="fa-solid fa-trash"></i>';
    button.classList.add("delete-btn");
    button.addEventListener("click", (_) => this.deleteItem(item));

    return button;
  };

  _createCheckbox = (item) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    //check.classList.add("checkbox");
    checkbox.addEventListener("change", () => this.checkItem(item));
    return checkbox;
  };

  clearAll = async () => {
    // function that clears all the tasks
    await this.itemClient.deleteAll();
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
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  main.init();
});
