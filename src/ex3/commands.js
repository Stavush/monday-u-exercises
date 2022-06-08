// imports
import fs from 'fs';
import { PokemonClient } from './pokemonClient.js';
import { ItemManager } from './itemManager.js';
import chalk from 'chalk';

// PokemonClient instance
const pokemonClient = new PokemonClient();
const itemManager = new ItemManager();

/* Add todo  function */
const addTodo = async (todo) => {
    let todoText = '';
    let message = '';
    if(itemManager.isPokemon(todo)){
        const pokemon = await pokemonClient.getPokemonName(todo);
        const type = await pokemonClient.getPokemonsTypes(pokemon);
        todoText =`Catch ${pokemon}, a ${type} pokemon`;
        message = `Catch ${chalk.bold(pokemon)}, a ${type} pokemon`;
    } else{
        todoText = todo;
        message = "New todo added successfully!";
    }
    try{
        fs.access('todos.txt', (err) => {
            if (err){ 
                // if todos.txt doesn't exist then create it
                fs.writeFileSync('todos.txt', todoText);
                console.log(chalk.bgGreen(message));
            } else{
                // else add todo to existiong file
                try{
                    fs.appendFileSync('todos.txt', `\n${todoText}`);
                    console.log(chalk.bgGreen(message));
                } catch{
                    console.error(err);
                }
                let tasks = fs.readFileSync('todos.txt').toString().split('\n');
            }
        })
    } catch(err){
        console.error(err);
    }
}

/* Get all the todos in todos.json */
const getTodos = () => {
    fs.access('todos.txt', (err) => {
        if(err){
            console.error(err);
        } else{
            console.log(chalk.underline.bgMagenta("All pending tasks"));
            console.log(chalk.magenta(fs.readFileSync('todos.txt').toString()));
        }
    })
}

/* Get all the todos in todos.json */
const getDoneTasks = () => {
    fs.access('done.txt', (err) => {
        if(err){
            console.error(err);
        } else{
            console.log(chalk.underline.bgCyan("All done tasks:"))
            console.log(chalk.cyan(fs.readFileSync('done.txt').toString()));
        }
    })
}

/* Deletes the todo with id todo */
const deleteTodo = (todo) => {
    const tasks = fs.readFileSync('todos.txt').toString().split('\n');
    if(todo){
        let pos = parseInt(todo);
        if(pos>=0 && pos<=tasks.length-1){
            tasks.splice(pos,1);
            fs.writeFileSync('todos.txt', tasks.join('\n'));
        } else {
            console.log("Todo position doesn't exist");
        }
    } else{
        tasks.pop();
        fs.writeFileSync('todos.txt', tasks);
    }
    if(tasks.length === 0){
        deleteAll();
    }
    console.log(chalk.bgBlueBright(`Todo deleted successfully`)) ;
}

/* Deletes all the todos */
const deleteAll = () => {
    fs.access('todos.txt', (err) => {
        if(err){
            console.log("There is no todos file");
        } else{
            fs.unlinkSync('todos.txt')
            console.log(chalk.bgRedBright("All tasks deleted"));
        }
    })
}

/* Helper function that fetches a specific task from todos.txt */
const fetchTask = (todoNum) => {
    const tasks = fs.readFileSync('todos.txt').toString().split('\n');
    let taskText = '';
    if(todoNum){
        let pos = parseInt(todoNum);
        if(pos>=0 && pos<=tasks.length-1){
            taskText = tasks[pos];
        }
    } else{
        taskText = tasks[-1];
    }
    return taskText;
}

/* Function that checks tasks (transfers them trom todos.txt to done.txt) */
const checkTodo = (todoNum = -1) => {
    let taskToCheck = fetchTask(todoNum);
    if (taskToCheck){
        fs.access('done.txt', (err) => {
            if (err){ 
                // if todos.txt doesn't exist then create it
                fs.writeFileSync('done.txt', taskToCheck);
            } else{
                // else add todo to existing file
                fs.appendFileSync('done.txt', `\n${taskToCheck}`);
                let tasks = fs.readFileSync('done.txt').toString().split('\n');
            }       
        });
    deleteTodo(todoNum);
    console.log(chalk.gray.strikethrough(taskToCheck));
    }
}

/* Help menu */
const helpFunction = () => { 
    const helpText = 
    `Available operations are:

  ________Operation__________|_______________________info_________________________
                             |
       Add a task            |  Pass a pokemons id to catch it or add a new todo
       Get all pending tasks |  Displays all pending tasks
       Get all done tasks    |  Displays all done tasks
       Delete a task         |  Pass a task's # to delete it
       Delete all tasks      |  Deletes all tasks
       Help menu             |  Displays the help menu    
    `; 
    console.log(chalk.yellow(helpText));
};


/* A function that handles the input from command line */ 
export const handleCommand = (commandInput, todo) => {
    switch(commandInput){
        case 'Add a task':
            addTodo(todo);
            break;
        case 'Get all pending tasks':
            getTodos();
            break;
        case 'Get all done tasks':
            getDoneTasks();
            break;
        case 'Delete a task':
            deleteTodo(todo);
            break;
        case 'Delete all tasks':
            deleteAll();
            break;
        case 'Check a task':
            checkTodo(todo);
            break;
        case 'Help menu':
            helpFunction();
            break;
        default:
            if (commandInput){
            console.log("No eligible command recieved");
            }
            
    }
}