// The ItemManager should go here. Remember that you have to export it.

const PokemonClient = require("../clients/pokemon_client");
const fs = require('fs');

class ItemManager {
    constructor(){
        this.pokemonClient = new PokemonClient();
    };

    /* Add todo  function */
    addTodo = async (todo) => {
        console.log("todo.data=",todo.json()); // TEST
        let todoText = '';
        let message = '';
        console.log('ENTERS item_manager addTodo'); //TEST
        if(this.isPokemon(todo)){
            console.log("This is pokemon") // TEST
            const pokemon = await pokemonClient.getPokemonName(todo);
            const type = await pokemonClient.getPokemonsTypes(pokemon);
            todoText =`Catch ${pokemon}, a ${type} pokemon`;
            message = todoText;
        } else{
            console.log("This is a regular todo") // TEST
            todoText = todo;
            message = "New todo added successfully!";
        }
        try{
            fs.access('todos.txt', (err) => {
                if (err){ 
                    // if todos.txt doesn't exist then create it
                    fs.writeFileSync('todos.txt', `${todoText}\n`);
                    console.log(message);
                } else{
                    // else add todo to existing file
                    try{
                        fs.appendFileSync('todos.txt', `${todoText}\n`);
                        console.log(message);
                    } catch{
                        console.error(err);
                    }
                    let tasks = fs.readFileSync('todos.txt').toString().split('\n');
                    console.log("TEST - todo added"); // TEST
                }
            })
        } catch(err){
            console.error(err);
        }
        return {todoText};
    }

    /* Get all the todos in todos.json */
    getTodos = () => {
        console.log("Fetching all todos..."); // TEST
        fs.access('todos.txt', (err) => {
            if(err){
                console.log('There are no pending tasks');
            } else{
                console.log(fs.readFileSync('todos.txt').toString());
                console.log(`There are ${fetchQuantity('todos.txt')} pending tasks`);
            }
        })
    }

    /* Deletes the todo with id todo */
    deleteTodo = (todoId) => {
        /*fs.access('todos.txt', (err) => {
            if(err){
                console.log('There are no tasks to delete');
            } else{
                const tasks = fs.readFileSync('.todos.txt').toString().split('\n');
                console.log({tasks});
                const pos = parseInt(todoId) || -1;
                const taskDeleted = tasks[pos];
                if(pos>=0 && pos<=tasks.length-1){
                    tasks = tasks.slice(0, pos).concat(tasks.slice(pos + 1, tasks.length))
                } else if (pos === -1){
                    tasks = tasks.slice(0, tasks.length-1);
                }
                fs.writeFileSync('todos.txt', tasks.join('\n'));
                if(tasks.length === 0){
                    deleteAll();
                }
                console.log(`Todo deleted successfully`) ;
                return(taskDeleted);
            }
        })*/
        fs.access('todos.txt', (err) => {
            if(err){
                console.log('There are no tasks to delete');
            } else{
                const tasks = fs.readFileSync('todos.txt').toString().split('\n');
                if(todoId){
                    let pos = parseInt(todoId);
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
                console.log(`Todo deleted successfully`) ;
            }
        });
    }


    /* Deletes all the todos */
    deleteAll = () => {
        fs.access('todos.txt', (err) => {
            if(err){
                console.log("There is no todos file");
            } else{
                fs.unlinkSync('todos.txt')
                console.log("All tasks deleted");
            }
        })
    }

    /* Helper function that fetches a specific task from todos.txt */
    fetchTask = (todoNum) => {
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

    /* Helper function that gets a txt file and returns the amount of todos */
    fetchQuantity = (file) => {
        let tasks = fs.readFileSync(file).toString().split('\n');
        return tasks.length;
    }

    isPokemon(text){
        // helper function to determine wether an input contains pokemod id(s) or not
        if(text.match(/[0-9]+(,[0-9]+)*/gi)){
            let pokemonIds = text.split(',');
            for (const id in pokemonIds){
                if(!this.pokemonClient.getPokemonById){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

}

module.exports = ItemManager;