import todoPad from "./todoPad-reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  todoPad,
});

export default allReducers;
