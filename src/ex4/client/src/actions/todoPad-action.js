import ACTIONS from "./constants";
import { getItems, deleteAll, postItem } from "../api/item_client";

const get_items = (items) => ({
  type: ACTIONS.GET_ITEMS,
  items: items,
});

const addItem = (item) => ({
  type: ACTIONS.ADD_ITEM,
  item: item,
});

const delete_all = () => ({
  type: ACTIONS.DELETE_ALL,
});

export const getItemsAction = (items) => {
  return (dispatch) => {
    getItems().then((res) => {
      dispatch(get_items(res));
    });
  };
};

export const addItemAction = (item) => {
  return (dispatch) => {
    postItem(item).then((res) => dispatch(addItem(item)));
  };
};

export const deleteAllItemsAction = () => {
  return (dispatch) => {
    deleteAll().then((res) => dispatch(delete_all()));
  };
};
