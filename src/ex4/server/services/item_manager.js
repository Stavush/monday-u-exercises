const PokemonClient = require("../clients/pokemon_client");
const { Item } = require("../db/models/item");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  getItems = () => {
    try {
      return Item.findAll();
    } catch (err) {
      console.error(err);
    }
  };

  handleItem = async (item) => {
    console.log("item manager - handleItem", item);
    if (this._isNumber(item)) {
      return await this.fetchAndAddPokemon(item);
    }
    if (this._isList(item)) {
      return await this.fetchAndAddManyPokemon(item);
    }

    this.addItem(item);
  };

  addItem = (item) => {
    try {
      console.log("item manager - add item:", { item });
      Item.create({
        id: id,
        ItemName: item,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  addPokemonItem = async (pokemon) => {
    try {
      await Item.create({
        id: id,
        ItemName: `Catch ${pokemon.name}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error(err);
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

  deleteItem = (item) => {
    try {
      Item.destroy({ where: { id: item } });
    } catch (err) {
      console.error(err);
    }
  };

  _isNumber = (value) => !isNaN(Number(value));
  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();
