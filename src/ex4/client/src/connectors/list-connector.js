import { bindActionCreators } from "redux";
import List from "../Components/List";
import { getItemsAction } from "../actions/item-actions";
import { connect } from "react-redux";
import { getItems } from "../selectors/items-entities-selector";

const mapStateToProps = (state) => {
  const items = getItems(state);
  return { items };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getItemsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
