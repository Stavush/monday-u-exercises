const express = require("express");
const router = express.Router();
const itemManager = require("../services/item_manager");

router.get("/items", async (_, res) => {
  res.send(await itemManager.getItems());
});

router.post("/item", async (req, res) => {
  const { item } = req.body;
  await itemManager.handleItem(item);
  res.status(200).json();
});

router.post("/item/:id", async (req, res) => {
  await itemManager.updateItem(req.body.item);
  res.status(200).json();
});

router.delete("/item", async (req, res) => {
  await itemManager.deleteItem(req.body.item);
  res.status(200).json();
});

router.delete("/item/all", async (req, res) => {
  await itemManager.deleteAll();
  res.status(200).json();
});

module.exports = router;
