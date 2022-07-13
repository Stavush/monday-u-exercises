import fetch from 'node-fetch';

export class PokemonClient{
    constructor(){
        this.API_URL = 'https://pokeapi.co/api/v2/pokemon';
    }

    getPokemonById = async (id) => {
        try{
            const res = await fetch(`${this.API_URL}/${id}`);
            return await res.json();
        } catch (err){
            console.error(err);
        }
    }

    getPokemonByName = async (name) => {
        try{
            const res = await fetch(`${this.API_URL}/${name}`);
            return await res.json();
        } catch (err){
            console.error(err);
        }
    }

    getPokemonName = async (id) => {
        try{
            const data = await this.getPokemonById(id);
            return await data.name;
        } catch (err) {
            console.error(err);
        }
    }

    getPokemonsTypes = async (name) => {
        try{
            const data = await this.getPokemonByName(name);
            const typeNames = data.types.map(type => type.type.name);
            const type = types.map(e => e.type).map(e => e.name);
            return type.join(" & ");
        } 
        catch(err) {
            console.error(err);
        }
    }

    getPokemonNameByIds = async (pokemonIds) => {
        // gets an array of pokemons IDs and returns pokemons' names
        let names = [];
        await Promise.all(pokemonIds.map(async (pokemonId) => {
            const pokemonName = await this.getPokemonName(pokemonId);
            if(pokemonName){ 
                names.push(pokemonName);
            }
        }));
        return this.names;
    }
    
}