// app.js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect"); // Adjust the path as needed
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(notFound);
app.use(errorHandlerMiddleware);
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Task Manager app");
});

app.use("/api/v1/tasks", tasks);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();
