// The ItemManager should go here. Remember that you have to export it.

const PokemonClient = require("../clients/pokemon_client");
const getPokemonsTypes = require("../utils/getPokemonTypes.js");
const fs = require("fs");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
    this.todos = [];
    this.done = [];
  }

  /* Add todo  function */
  addTodo = async (todo) => {
    const pokemonIds = todo.replace(" ", "").split(",");
    let todoText = [];
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
    return { todoText };
  };

  /* Get all the todos */
  getTodos = () => {
    return this.todos;
  };

  /* Get all the done todos */
  getDone = () => {
    return this.done;
  };

  /* Deletes the todo with id todo */
  deleteTodo = (task) => {
    this.todos = this.todos.filter((todo) => todo !== task);
  };

  /* Deletes all the todos */
  deleteAll = () => {
    this.todos = [];
  };

  /* Checks a done task */
  /*checkTask = (task) => {
    this.done.push(task);
    this.deleteTodo(task);
  };*/

  /* Helper function that returns the amount of todos */
  fetchQuantity = () => {
    return this.todos.length;
  };

  isPokemon(text) {
    // helper function to determine wether an input contains pokemod id(s) or not
    return text.match(/[0-9]+(,[0-9]+)*/gi);
  }
}

module.exports = ItemManager;
