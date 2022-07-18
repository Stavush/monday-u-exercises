import itemsEntitiesReducer from "../items-entities-reducer";
import ACTIONS from "../../actions/constants/index";

test("should return the initial state", () => {
  expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({});
});

test("should successfully add 'An item' to an empty items state", () => {
  const previousState = {};
  const action = {
    type: ACTIONS.ADD_ITEM_SUCCESS,
    item: { id: 1, name: "An item" },
  };
  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    1: { id: 1, name: "An item" },
  });
});

test("should successfully add an item to an existing items state", () => {
  const previousState = { 1: { id: 1, name: "An item" } };
  const action = {
    type: ACTIONS.ADD_ITEM_SUCCESS,
    item: { id: 2, name: "A new item" },
  };
  expect(itemsEntitiesReducer(previousState, action)).toEqual({
    1: { id: 1, name: "An item" },
    2: { id: 2, name: "A new item" },
  });
});

test("should successfully remove an item from an existing items state", () => {
  const previousState = { 1: { id: 1, name: "An item" } };
  const action = {
    type: ACTIONS.REMOVE_ITEM_SUCCESS,
    item: { id: 1, name: "An item" },
  };
  expect(itemsEntitiesReducer(previousState, action)).toEqual({});
});
