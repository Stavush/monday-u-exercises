import "./style.css";
import List from "./Components/List.jsx";
import ItemClient from "./api/item_client";
import TodoPad from "./Components/TodoPad";

const itemClient = new ItemClient();

const App = () => {
  return <TodoPad />;
};

export default App;
