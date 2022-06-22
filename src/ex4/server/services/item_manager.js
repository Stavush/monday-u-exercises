// The ItemManager should go here. Remember that you have to export it.

const PokemonClient = require("../clients/pokemon_client");
const getPokemonsTypes = require("../utils/getPokemonTypes.js");
const fs = require("fs");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.todos = [];
  }

  /* Add todo  function */
  addTodo = async (todo) => {
    const pokemonIds = todo.replace(" ", "").split(",");
    let todoText = [];
    let message = "";
    if (this.isPokemon(todo)) {
      const pokemons = await this.pokemonClient.getPokemonsByIds(pokemonIds);
      pokemons.map(async (pokemon) => {
        const name = await pokemon.name;
        const types = await getPokemonsTypes(pokemon);
        todoText.push(`Catch ${name}, a ${types} pokemon`);
        this.todos.push(`Catch ${name}, a ${types} pokemon`);
      });
    } else {
      todoText.push(todo);
      this.todos.push(todo);
    }
    try {
      fs.access("todos.txt", (err) => {
        if (err) {
          // if todos.txt doesn't exist then create it
          todoText.forEach((todo) =>
            fs.appendFileSync("todos.txt", `${todo}\n`)
          );
        } else {
          // else add todo to existing file
          try {
            todoText.forEach((todo) =>
              fs.appendFileSync("todos.txt", `${todo}\n`)
            );
          } catch {
            console.error(err);
          }
          let tasks = fs.readFileSync("todos.txt").toString().split("\n");
        }
      });
    } catch (err) {
      console.error(err);
    }

    return { todoText };
  };

  /* Get all the todos in todos.json */
  getTodos = () => {
    console.log(this.todos);
    return this.todos;
  };

  /* Deletes the todo with id todo */
  deleteTodo = (todoId) => {
    fs.access("todos.txt", (err) => {
      if (err) {
        console.log("There are no tasks to delete");
      } else {
        const tasks = fs.readFileSync("todos.txt").toString().split("\n");
        if (todoId) {
          if (todoId >= 0 && todoId <= tasks.length - 1) {
            tasks.splice(todoId, 1);
            this.todos.splice(todoId, 1);
            fs.writeFileSync("todos.txt", tasks.join("\n"));
          } else {
            console.log("Todo position doesn't exist");
          }
        } else {
          tasks.pop();
          fs.writeFileSync("todos.txt", tasks.join("\n"));
        }
        if (tasks.length === 0 || (tasks.length === 1 && !tasks[0])) {
          this.deleteAll();
        }
        //console.log(`Todo deleted successfully`);
      }
    });
  };

  /* Deletes all the todos */
  deleteAll = () => {
    fs.access("todos.txt", (err) => {
      if (err) {
        console.log("There is no todos file");
      } else {
        const deleted = fs.unlinkSync("todos.txt");
        this.todos = [];
        console.log("All tasks deleted");
        return { deleted };
      }
    });
  };

  /* Helper function that fetches a specific task from todos.txt */
  fetchTask = (todoNum) => {
    const tasks = fs.readFileSync("todos.txt").toString().split("\n");
    let taskText = "";
    if (todoNum) {
      let pos = parseInt(todoNum);
      if (pos >= 0 && pos <= tasks.length - 1) {
        taskText = tasks[pos];
      }
    } else {
      taskText = tasks[-1];
    }
    return taskText;
  };

  /* Helper function that gets a txt file and returns the amount of todos */
  fetchQuantity = (file) => {
    let tasks = fs.readFileSync(file).toString().split("\n");
    return tasks.length;
  };

  isPokemon(text) {
    // helper function to determine wether an input contains pokemod id(s) or not
    return text.match(/[0-9]+(,[0-9]+)*/gi);
  }
}

module.exports = ItemManager;
