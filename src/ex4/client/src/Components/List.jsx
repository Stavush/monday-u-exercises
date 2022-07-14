import React, { useMemo } from "react";
import PropTypes from "prop-types";
//import ListItem from "./ListItem";
import ListItemConnector from "../connectors/listItem-connector";

const List = (items) => {
  const itemsArr = items.items;
  console.log(itemsArr);

  const itemList = useMemo(() => {
    return itemsArr.map((item) => (
      <ListItemConnector
        itemID={item.id}
        itemName={item.itemName}
        done={item.status}
      />
    ));
  }, [itemsArr]);

  return <ul id="list">{itemList}</ul>;
};

List.prototypes = {
  items: PropTypes.array,
};

export default List;
