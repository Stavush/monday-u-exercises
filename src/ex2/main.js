import { ItemManager } from "./itemManager.js";

class Main {    
    constructor(){
        this.itemManager = new ItemManager();
    }

    createTaskDiv = (task) =>{
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('done', 'false');
        // add checkbox to task
        taskDiv.appendChild(this.addCheckbox());
        // add task's text
        taskDiv.appendChild(this.addDivText(task));
        // add delete button
        taskDiv.appendChild(this.addDeleteButton());
        return taskDiv;
    }

    addCheckbox = () => {
        const check = document.createElement('button');
        check.classList.add('checkbox');
        check.innerHTML = '<i class="fa-solid fa-square"></i>';
        return check;
    }

    addDivText = (task) => {
        const todoTask = document.createElement('div');
        todoTask.classList.add('todo-text');
        todoTask.innerText = task;
        return todoTask;
    }

    addDeleteButton = () => {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        return deleteButton;
    }

    addTask = async (e) => {
        // prevents refreshing of the page
        e.preventDefault(); 
        // create task div and add the todo div to the list
        const tasksToAdd = await this.itemManager.addTodoTask(this.newTaskText.value);
        tasksToAdd.forEach( (task) => {
            this.todoList.appendChild(this.createTaskDiv(task));
        })
        // erases text input
        this.newTaskText.value = "";
        this.calculatePending();
    }

    checkTask = (e) => {
        // function that contains the logic of checking tasks
        const checkbox = e.target;
        const task = checkbox.parentElement.parentElement;
        
        if (checkbox.classList[1] === 'fa-square' || checkbox.classList[1] === 'fa-square-check'){
            if (task.getAttribute('done') === 'false'){
                checkbox.parentElement.innerHTML = '<i class="fa-solid fa-square-check"></i>';
                task.style.color = "grey";
                task.style.textDecoration = "line-through";
                task.setAttribute("done", "true");
            } else if (task.getAttribute('done') === 'true'){
                checkbox.parentElement.innerHTML = '<i class="fa-solid fa-square"></i>';
                task.style.color = "#FFF";
                task.style.textDecoration = "none";
                task.setAttribute("done", "false");
            }
            this.calculatePending();
        }
    }

    deleteTask = (e) => {
        // function that deletes a task
        const task = e.target.parentElement;
        if (task.classList[0] === "delete-btn"){
            const todoText = e.target.parentElement.parentElement.innerText;
            this.itemManager.deleteTodoTask(todoText);
            task.parentElement.remove();
        }
        this.calculatePending();
    }

    handleTabs = (e) =>{
        const button = e.target.id;
        const tasks = this.todoList.childNodes;
        switch(button){
            case 'all-tasks':
                this.notDoneButton.style.opacity = '0.5';
                this.allTasksButton.style.opacity ='1';
                this.doneButton.style.opacity = '0.5';
                tasks.forEach(task => {
                    task.style.display = 'flex';
                });
                break;
            case 'done':
                this.notDoneButton.style.opacity = '0.5';
                this.allTasksButton.style.opacity ='0.5';
                this.doneButton.style.opacity = '1';
                tasks.forEach(task => {
                    if (task.getAttribute('done') === 'true'){
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                });
                break;
            case 'not-done':
                this.notDoneButton.style.opacity = '1';
                this.allTasksButton.style.opacity ='0.5';
                this.doneButton.style.opacity = '0.5';
                tasks.forEach(task => {
                    if (task.getAttribute('done') === 'false'){
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                });
                break;
        }
    }

    calculatePending = () => {
        // function that calculates how many pending tasks there are
        const tasks = this.todoList.childNodes;
        const total = tasks.length;
        let numberOfPending = 0;
        tasks.forEach( task => {
            if(task.getAttribute('done') === 'false'){
                numberOfPending++;
            }
        });
        pending.innerText = `There are ${numberOfPending} / ${total} pending tasks`;
    }

    clearAll = () => {
        // function that clears all the tasks
        this.itemManager.deleteAllTasks();
        this.todoList.innerHTML="";
        this.calculatePending();
    }

    init = () => {
        //selectors
        this.todoList = document.querySelector('.todo-list');
        this.newTaskText = document.querySelector('.new-task-text');
        this.addTodoTask = document.querySelector('.add-task');
        this.tabs = document.querySelector('#tabs');
        this.allTasksButton = document.querySelector('#all-tasks'); 
        this.doneButton = document.querySelector('#done'); 
        this.notDoneButton = document.querySelector('#not-done'); 
        this.clearAllButton = document.querySelector('#clear-all');
        this.pending = document.querySelector('#pending');

        //event listeners
        this.addTodoTask.addEventListener('click', this.addTask);
        this.todoList.addEventListener('click', (e) => {
            this.deleteTask(e);
            this.checkTask(e);
            if(e.target.classList[0] === 'todo-text'){
                const taskText = e.target.childNodes[0].nodeValue;
                if(taskText){
                    window.alert( taskText + " was chosen");
                } else{
                    window.alert( "Empty task was chosen");
                    }
                }       
            });
        tabs.addEventListener('click', main.handleTabs);
        this.clearAllButton.addEventListener('click', main.clearAll);

        this.calculatePending();
    }

}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});