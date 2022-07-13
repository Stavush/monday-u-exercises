const BASE_URL = "http://localhost:3000";

export async function getItems() {
  const response = await fetch(`${BASE_URL}/items`);
  const todos = await response.json();

  return todos;
}

export async function postItem(item) {
  const res = await fetch(`${BASE_URL}/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  });
  return await res.json();
}

export async function toggleDone(item) {
  console.log({ item });
  await fetch(`${BASE_URL}/item/${item.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  });
}

export async function deleteItem(item) {
  await fetch(`${BASE_URL}/item`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item }),
  });
}

export async function deleteAll() {
  await fetch(`${BASE_URL}/item/all`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}
