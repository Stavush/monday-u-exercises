/* Create an ItemClient class here. 
This is what makes requests to your
 express server (your own custom API!)*/

 const axios = require('axios');

 const host = 'http://localhost';
 const PORT = 8080;
 const path = 'task';

 class ItemClient {
    constructor(){
      this.URL = `${host}:${PORT}/${path}`;
    }

    getTodos = async () => {
      console.log("item client get todos is working...")
      const response = await axios.get(this.URL)
      console.log("itemClient get todos response", response);
      return await response.json();
    }

    addTodo = async (task) => {
      const response = await axios.post(this.URL, task);
      return await response.json();
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