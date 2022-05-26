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
            const arr = text.split(",");
            if(arr.length === 1){
                const pokemonsName = await this.pokemonClient.getPokemonName(text);
                this.tasks.push(`Catch ${pokemonsName}`);
                tasksToRender.push(`Catch ${pokemonsName}`);
            } else{
                const pokemonArr = await this.pokemonClient.getPokemonFromArray(arr);
                pokemonArr.forEach(name => {
                    this.tasks.push(`Catch ${name}`);
                    tasksToRender.push(`Catch ${name}`);
                });
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
        return text.match(/[0-9]+(,[0-9]+)*/gi);
    }

}
