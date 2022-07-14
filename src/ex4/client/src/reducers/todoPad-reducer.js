import ACTIONS from "../actions/constants";

const initialState = {
  items: [],
};

const todoPadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ITEMS:
      return { items: action.item };
    case ACTIONS.DELETE_ALL:
      return initialState;
    case ACTIONS.ADD_ITEM:
      return { items: [...state.items, ...action] };
    case ACTIONS.DELETE_ITEM:
      const { itemId } = action;
      const itemsArr = { ...state };
      const filtered = itemsArr.map((item) => item.id !== itemId);
      return filtered;
    case ACTIONS.CHECK_ITEM:
      const { id } = action;
      const items = { ...state };
      items[id].status = !items[itemId].status;
      return items;
    default:
      return state;
  }
};

export default todoPadReducer;
