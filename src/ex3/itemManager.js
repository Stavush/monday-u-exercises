import { PokemonClient } from "./pokemonClient.js"

export class ItemManager {
    constructor(){
        this.tasks = [];
        this.pokemonClient = new PokemonClient();
    };

    addTodoTask = async (text) => {
        // a function that adds a todo or adds pokemon
        const tasksToRender = [];
        if(this.isPokemon(text)){
            // if the input indicates pokemon ID(s)
            const arr = text.split(",");
            if(arr.length === 1){
                // if there's one pokemon ID
                const pokemonsName = await this.pokemonClient.getPokemonName(text);
                const type = await this.pokemonClient.getPokemonsType(pokemonsName);
                if(pokemonsName){
                    this.tasks.push(`Catch ${pokemonsName}, ${type} pokemon`);
                    tasksToRender.push(`Catch ${pokemonsName}, ${type} pokemon`);
                } else {
                    // error with fetching the pokemon
                    this.tasks.push(`Pokemon with ID ${text} was not found`);
                    tasksToRender.push(`Pokemon with ID ${text} was not found`);
                }
            } else{
                // if there's more than 2 or pokemon ID(s)
                const pokemonArr = await this.pokemonClient.getPokemonNameByIds(arr);
                if(pokemonArr.length > 0){
                    for(const name of pokemonArr) {
                        const type = await this.pokemonClient.getPokemonsTypes(name);
                        this.tasks.push(`Catch ${name}, ${type} pokemon`);
                        tasksToRender.push(`Catch ${name}, ${type} pokemon`);
                    }
                } else{
                    this.tasks.push(`Failed to fetch with this input: ${text}`);
                    tasksToRender.push(`Failed to fetch with this input: ${text}`);
                }
            } 
        } else{
            this.tasks.push(text);
            tasksToRender.push(text);
        }
        return tasksToRender;
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

    isPokemonCaught = (text) => {
        // a function that checks whether the pokemon has already been added to the tasks
        return this.tasks.filter(task => task === text);
    }

}
