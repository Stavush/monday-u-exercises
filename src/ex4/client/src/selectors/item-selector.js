const getItemsState = (state) => state.items;

export const getItems = (state) => getItemsState(state).value;
