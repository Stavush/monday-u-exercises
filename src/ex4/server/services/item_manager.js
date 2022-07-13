
const PokemonClient = require("../clients/pokemon_client");
const getPokemonsTypes = require("../utils/getPokemonTypes.js");
const _isNumber = require("../utils/isNumber.js");
const _isList = require("../utils/isList.js");
const { Item } = require("../db/models/item");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  getItems = async () => {
    try {
      const todos = await Item.findAll({
        raw: true,
      });
      return todos.map((item) => {
        return {
          id: item.id,
          itemName: item.itemName,
          status: item.status,
        };
      });
    } catch (err) {
      console.error("There's a problem getting the items from the DB");
    }
  };

  handleItem = async (item) => {
    console.log("item manager - handleItem", item);
    if (_isNumber(item)) {
      return await this.fetchAndAddPokemon(item);
    }
    if (_isList(item)) {
      return await this.fetchAndAddManyPokemon(item);
    }

    await this.addItem(item);
  };

  addItem = async (item) => {
    try {
      console.log("item manager - add item:", { item });
      await Item.create({
        id: item.id,
        itemName: item.itemName,
        status: false,
      });
    } catch (err) {
      console.error("There's a problem adding an item to the DB");
    }
  };

  addPokemonItem = async (pokemon) => {
    try {
      const item = `Catch ${pokemon.name}, a ${this.getPokemonsTypes(pokemon)}`;
      await this.addItem(item);
    } catch (err) {
      console.error("There's a problem adding a pokemon to the DB");
    }
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      this.addPokemonItem(pokemon);
    } catch (error) {
      this.addItem(`Pokemon with ID ${pokemonId} was not found`);
    }
  };

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      );
      pokemons.forEach(this.addPokemonItem);
    } catch (error) {
      console.error(error);
      this.addItem(`Failed to fetch pokemon with this input: ${inputValue}`);
    }
  };

  deleteItem = async (item) => {
    try {
      await Item.destroy({ where: { id: item.id } });
    } catch (err) {
      console.error(err);
    }
  };

  deleteAll = () => {
    try {
      Item.destroy({ where: {}, truncate: true });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ItemManager;
