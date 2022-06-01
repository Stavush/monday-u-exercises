//requires
const fs = require('fs');
const PokemonClient = require('./pokemonClient.js');

let pokemonClient = new PokemonClient();

/* Add todo  function */
addTodo = async (todo) => {
    //console.log("todo = ", todo); // TEST
    const pokemon = await pokemonClient.getPokemonName(todo);
    //console.log("pokemon = ",pokemon); // TEST
    const todoText = isPokemon(todo) ? `Catch ${pokemon}` : todo;
    //console.log("todoText = ", todoText);
    try{
        fs.access('todos.txt', (err) => {
            if (err){ 
                // if todos.txt doesn't exist then create it
                fs.writeFileSync('todos.txt', todoText);
            } else{
                // else add todo to existiong file
                try{
                    fs.appendFileSync('todos.txt', `\n${todoText}`);
                    console.log("New todo added successfully!");
                } catch{
                    console.log("Todo append failed");
                }
                let tasks = fs.readFileSync('todos.txt').toString().split('\n');
            }
        })
    } catch{
        console.error("There was an error");
    }
}

/* Get all the todos in todos.json */
getTodos = () => {
    fs.access('todos.txt', (err) => {
        if(err){
            console.log("There is no todos file");
        } else{
            console.log(fs.readFileSync('todos.txt').toString());
        }
    })
}

/* Deletes the todo with id todo */
deleteTodo = (todo) => {
    console.log("todo=",todo);  // TEST
    const tasks = fs.readFileSync('todos.txt').toString().split('\n');
    console.log("tasks before delete = ", tasks) // TEST
    if(todo){
        pos = parseInt(todo);
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
    console.log("tasks after delete = ",tasks); // TEST    
}

/* Deletes all the todos */
deleteAll = () => {
    fs.access('todos.txt', (err) => {
        if(err){
            console.log("There is no todos file");
        } else{
            fs.writeFileSync('todos.txt', "");
            console.log("All tasks deleted");
        }
    })
}

/* Help menu */
helpFunction = () => { 
    const helpText = 
    `Available operations are:

  _________Operation____________|____________Command_______________
                                |
        Add a new todo          |  $ node server.js add "TODO"/#
        Show all todos          |  $ node server.js get
        Delete a todo           |  $ node server.js delete # 
        Delete all the todos    |  $ node server.js deleteAll
        Show help Menu          |  $ node server.js help
        `; 
    console.log(helpText);
};


/* A function that handles the input from command line */ 
handleCommand = () => {
    const commandInput = process.argv[2];
    const todo = process.argv[3];
    console.log(typeof todo);
    switch(commandInput){
        case 'add':
            addTodo(todo);
            break;
        case 'get':
            getTodos();
            break;
        case 'delete':
            deleteTodo(todo);
            break;
        case 'deleteAll':
            deleteAll();
            break;
        case 'done':
            completeTodo(todo);
            break;
        case 'help':
            helpFunction();
            break;
        default:
            if (commandInput){
            console.log("No eligible command recieved");
            }
            
    }
}

/* Helper function */
isPokemon = (text) => {
    // helper function to determine wether an input contains pokemod id(s) or not
    return text.match(/[0-9]+(,[0-9]+)*/gi);
}

handleCommand();