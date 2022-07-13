import ACTIONS from "../actions/constants";

const initialState = { items: [] };

const todoPadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ITEMS:
      return { items: state.items };
    case ACTIONS.DELETE_ALL:
      return initialState;
    case ACTIONS.ADD_ITEM:
      return { items: [...state.items, ...action] };
    default:
      return state;
  }
};

export default todoPadReducer;
