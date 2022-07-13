/* eslint-disable default-case */
import ACTIONS from "../actions/constants";

const initialState = {
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.DELETE_ITEM:
      const itemToDelete = action.item;
      const itemsAfterDel = state.items.filter(
        (item) => item.id !== itemToDelete.id
      );
      return { items: itemsAfterDel };
    case ACTIONS.CHECK_ITEM:
      return state;
    default:
      return state;
  }
};

export default itemReducer;
