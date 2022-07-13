import { bindActionCreators } from "redux";
import ListItem from "../Components/ListItem";
import { deleteItemAction, checkItemAction } from "";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteItemAction, checkItemAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
