const getTodoPadState = (state) => state.todoPad;

export const getItems = (state) => getTodoPadState(state).items;
