import { PokemonClient } from "./pokemonClient.js"

export class ItemManager {
    constructor(){
        this.tasks = [];
        this.caugth = [];
        this.pokemonClient = new PokemonClient();
    };

    addTodoTask = async (text) => {
        // a function that adds a todo or adds pokemon
        let currentTodosLength = this.tasks.length;
        if(this.isPokemon(text)){
            // if the input indicates pokemon ID(s)
            const arr = text.split(",");
            const pokemons = await this.pokemonClient.getPokemonNamesByIds(arr);
            if(pokemons.length > 0){
                for(const pokemon of pokemons) {
                    const name = await pokemon.name;
                    if(!this.isPokemonCaught(name)){
                        const type = await this.pokemonClient.getPokemonsTypes(pokemon);
                        this.tasks.push(`Catch ${name}, a ${type} pokemon`);
                        this.caugth.push(name);
                    }
                }
            } else{
                this.tasks.push(`Failed to fetch with this input: ${text}`);
            }
        // if the todo is not a pokemon 
        } else{
            this.tasks.push(text);
        }
        return this.tasks.slice(currentTodosLength);
    }

    deleteTodoTask = async (text) => {
        this.tasks = this.tasks.filter(task => task !== text);
    }

    deleteAllTasks = () => {
        this.tasks = [];
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

    isPokemonCaught = (caughtPokemonName) => {
        // a function that checks whether the pokemon has already been added to the tasks
        const isMatch = this.caugth.filter((name) => name === caughtPokemonName);
        return isMatch.length;
    }

}