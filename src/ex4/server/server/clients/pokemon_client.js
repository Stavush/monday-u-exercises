
const axios = require("axios").default;

class PokemonClient {
  constructor() {
    this.API_URL = "https://pokeapi.co/api/v2/pokemon";
  }

  getPokemonById = async (id) => {
    try {
      const { data } = await axios.get(`${this.API_URL}/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  getPokemonByName = async (name) => {
    try {
      const res = await axios.get(`${this.API_URL}/${name}`);
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  getPokemonsByIds = async (pokemonIds) => {
    // gets an array of pokemons IDs and returns pokemons' names
    let pokemons = [];
    await Promise.all(
      pokemonIds.map(async (pokemonId) => {
        const pokemon = await this.getPokemonById(pokemonId);
        if (pokemon) {
          pokemons.push(pokemon);
        }
      })
    );
    return pokemons;
  };
}

module.exports = PokemonClient;
