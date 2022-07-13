import todoPad from "./todoPad-reducer";
import item from "./item-reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  todoPad,
  item,
});

export default allReducers;
