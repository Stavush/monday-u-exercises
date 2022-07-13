const BASE_URL = "http://localhost:3000";

export default class ItemClient {
  getItems = async () => {
    const response = await fetch(`${BASE_URL}/items`);
    const todos = await response.json();

    return todos;
  };

  postItem = async (item) => {
    const res = await fetch(`${BASE_URL}/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
    return await res.json();
  };

  toggleDone = async (item) => {
    console.log({ item });
    await fetch(`${BASE_URL}/item/${item.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
  };

  deleteItem = async (item) => {
    await fetch(`${BASE_URL}/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });
  };

  deleteAll = async () => {
    await fetch(`${BASE_URL}/item/all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };
}
