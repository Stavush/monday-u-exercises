import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TodoPad from "../Components/TodoPad";
import {
  addItemAction,
  getItemsAction,
  deleteAllItemsAction,
} from "../actions/item-actions";
import { getItems } from "../selectors/items-entities-selector";

const mapStateToProps = (state) => {
  const items = getItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getItemsAction, addItemAction, deleteAllItemsAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPad);
