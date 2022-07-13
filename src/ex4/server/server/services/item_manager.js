const PokemonClient = require("../clients/pokemon_client");
const { Item } = require("../db/models");

class ItemManager {
  constructor() {
    this.pokemonClient = new PokemonClient();
  }

  getItems = async () => {
    const items = await Item.findAll({
      raw: true,
    });
    return items.map((item) => {
      return {
        id: item.id,
        itemName: item.itemName,
        status: item.status,
      };
    });
  };

  handleItem = async (item) => {
    if (this._isNumber(item)) {
      return await this.fetchAndAddPokemon(item);
    }
    if (this._isList(item)) {
      return await this.fetchAndAddManyPokemon(item);
    }

    return await this.addItem(item);
  };

  updateItem = async (item) => {
    await Item.update({ status: item.status }, { where: { id: item.id } });
  };

  addItem = async (item) => {
    return await Item.create({ itemName: item, status: false });
  };

  addPokemonItem = async (pokemon) => {
    return await this.addItem(`Catch ${pokemon.name}`);
  };

  fetchAndAddPokemon = async (pokemonId) => {
    try {
      const pokemon = await this.pokemonClient.getPokemon(pokemonId);
      return await this.addPokemonItem(pokemon);
    } catch (error) {
      await this.addItem(`Pokemon with ID ${pokemonId} was not found`);
    }
  };

  fetchAndAddManyPokemon = async (inputValue) => {
    try {
      const pokemons = await this.pokemonClient.getManyPokemon(
        inputValue.replace("/ /g", "").split(",")
      );
      return pokemons.forEach(this.addPokemonItem);
    } catch (error) {
      console.error(error);
      await this.addItem(
        `Failed to fetch pokemon with this input: ${inputValue}`
      );
    }
  };

  deleteItem = async (itemId) => {
    await Item.destroy({
      where: {
        id: itemId,
      },
    });
  };

  deleteAll = async () => {
    await Item.destroy({
      where: {},
      truncate: true,
    });
  };

  _isNumber = (value) => !isNaN(Number(value));
  _isList = (value) => value.split(",").every(this._isNumber);
}

module.exports = new ItemManager();
