const express = require("express");
const router = express.Router();
const itemManager = require("../services/item_manager");

router.get("/items", (_, res) => {
  console.log("api - getItems:", itemManager.getItems());
  res.send(itemManager.getItems());
});

router.post("/item", async (req, res) => {
  console.log("API-HANDLE_ITEM");
  await itemManager.handleItem(req.body.item);
  res.end();
});

router.delete("/item", (req, res) => {
  itemManager.deleteItem(req.body.item);
  res.end();
});

module.exports = router;
