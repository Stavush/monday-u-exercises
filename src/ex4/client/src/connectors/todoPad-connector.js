import { bindActionCreators } from "redux";
import TodoPad from "../Components/TodoPad";
import { getItemsAction, addItemAction } from "../actions/todoPad-action";
import { getItems } from "../selectors/item-selector";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const itemList = getItems(state);
  return { itemList };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getItemsAction, addItemAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPad);
