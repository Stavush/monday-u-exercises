const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./server/routes/api");
const cors = require("cors");

const main = async () => {
  const app = express();
  app.use(cors({ origin: "http://localhost:3001" }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/", api);

  const port = process.env.PORT || "3000";
  app.listen(port, () => {
    console.log(`Running on  ${port}`);
  });
};

main();
