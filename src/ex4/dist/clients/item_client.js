/* Create an ItemClient class here. 
This is what makes requests to your
 express server (your own custom API!)*/

 const axios = require('axios').default;

 const host = 'http://localhost';
 const PORT = 8080;
 const path = 'task';

 class ItemClient {
    constructor(){
      this.URL = `${host}:${PORT}/${path}`;
    }

    getTodos = async () => {
      console.log("item client get todos is working..."); // test
      try{
        const res = await axios.get(this.URL);
        console.log("itemClient get todos response", res.data);
        return res.data;
      } catch (err){
        console.error("Could not fetch todos");
      }
    }

    addTodo = async (task) => {
      try{
        console.log("URL:", this.URL); // TEST
        const response = await axios.post(this.URL,{ task });
        console.log({response}); // test
        return await response.json();
      } catch (err){
        console.error("Could not create a todo item");
      }
    }

    deleteTodo = async (taskId) => {
      const response = await axios.delete(`${this.URL}/${taskId}`);
      return await response.json();
    }

    deleteAll = async () => {
      const response = await axios.delete(`${this.URL}/all`);
      return await response.json();
    }

 }

 module.exports = ItemClient;