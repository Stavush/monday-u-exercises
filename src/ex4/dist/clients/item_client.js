/* Create an ItemClient class here. 
This is what makes requests to your
 express server (your own custom API!)*/

const host = "http://localhost";
const PORT = 8080;
const path = "task";
const STANDARD_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default class ItemClient {
  constructor() {
    this.URL = `${host}:${PORT}/${path}`;
  }

  getTodos = async () => {
    console.log("item client get todos is working..."); // test
    try {
      const res = await fetch(this.URL);
      console.log("itemClient get todos response", res.data);
      return await res.json();
    } catch (err) {
      console.error("Could not fetch todos");
    }
  };

  addTodo = async (task) => {
    try {
      console.log("URL:", this.URL); // TEST
      const res = await fetch(this.URL, {
        method: "POST",
        headers: STANDARD_HEADERS,
        body: JSON.stringify({ value: task }),
      });
      console.log("res: ", [res.json()]); // test
      return await [res.json()];
    } catch (err) {
      //console.error("Could not create a todo item");
      console.error(err);
    }
  };

  deleteTodo = async (taskId) => {
    const res = await fetch(`${this.URL}/${taskId}`, {
      method: "DELETE",
      headers: STANDARD_HEADERS,
      body: JSON.stringify({ taskId }),
    });
    return await res;
  };

  deleteAll = async () => {
    try {
      const res = await fetch(`${this.URL}/all`, {
        method: "DELETE",
        headers: STANDARD_HEADERS,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };
}
