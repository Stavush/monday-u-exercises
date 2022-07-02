const host = "http://localhost";
const PORT = 3042;
const path = "task";
const STANDARD_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export class ItemClient {
  constructor() {
    this.URL = `${host}:${PORT}/${path}`;
  }

  getTodos = async () => {
    try {
      const res = await fetch(this.URL);
      return await res.json();
    } catch (err) {
      console.error("Could not fetch todos");
    }
  };

  /*getDone = async () => {
    try {
      const res = await fetch(this.URL);
      return await res.json();
    } catch (err) {
      console.error("Could not fetch done tasks");
    }
  };*/

  addTodo = async (item) => {
    try {
      const res = await fetch(this.URL, {
        method: "POST",
        headers: STANDARD_HEADERS,
        body: JSON.stringify({ item }),
      });
    } catch (err) {
      console.error("Could not create a todo item");
    }
  };

  deleteTodo = async (item) => {
    const res = await fetch(`${this.URL}`, {
      method: "DELETE",
      headers: STANDARD_HEADERS,
      body: JSON.stringify({ item }),
    });
  };

  deleteAll = async () => {
    try {
      const res = await fetch(`${this.URL}/all`, {
        method: "DELETE",
        headers: STANDARD_HEADERS,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /*checkTodo = async (task) => {
    const res = await fetch(`${this.URL}`, {
      method: "PUT",
      headers: STANDARD_HEADERS,
      body: JSON.stringify({ task }),
    });)
  }*/
}
