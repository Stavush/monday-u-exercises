// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./server/routes/tasksRouter.js");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("dist"));
app.use("/task", tasksRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
