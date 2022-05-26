export class PokemonClient{
    constructor(){
        this.pokemonAPI = 'https://pokeapi.co/api/v2/pokemon';
        this.data = '';
    }

    getPokemonById = async (id) => {
        try{
            const res = await fetch(`${this.pokemonAPI}/${id}`);
            const data = await res.json();
            return data;
        } catch{
            (err) => console.log(`There is no pokemon with id ${id}`);
        }
    }

    getPokemonByName = async (name) => {
        try{
            const res = await fetch(`${this.pokemonAPI}/${name}`);
            const data = await res.json();
            return data;
        } catch{
            (err) => console.log(`There is no pokemon with the name ${name}`);
        }
    }

    getPokemonName = async (id) => {
        try{
            const data = await this.getPokemonById(id);
            const name = await data.name;
            return name;
        } 
        catch{
            (err) => console.log("There is an error fetching the pokemon's name");
        }
    }

    getPokemonsType = async (name) => {
        try{
            const data = await this.getPokemonByName(name);
            const types = await data.types;
            const type = types.map(e => e.type).map(e => e.name);
            return type.join(" & ");
        } 
        catch{
            (err) => console.log("There is an error fetching the pokemon's type");
        }
    }

    getPokemonFromArray = async (pokemonArray) => {
        // gets an array of pokemons IDs and returns pokemons' names
        this.names = [];
        await Promise.all(pokemonArray.map(async (pokemon) => {
            const pokemonName = await this.getPokemonName(pokemon);
            if(pokemonName !== undefined){ 
                this.names.push(pokemonName);
            }
        }));
        return this.names;
    }
    
}

