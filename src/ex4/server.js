const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./server/routes/taskRouter.js");

/*const PORT = 8080;
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
});*/

const main = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/", express.static("dist"));
  app.use("/task", tasksRouter);

  const PORT = process.env.PORT || "3042";
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main();
