const express = require("express");
require("./db/mongoose");
const app = express();

const itemsRouter = require("./Routers/item");
const usersRouter = require("./Routers/user");
const cartsRouter = require("./Routers/cart");

const port = process.env.PORT;

app.use(express.json());
app.use(itemsRouter);
app.use(usersRouter);
app.use(cartsRouter);

//app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up at port", +port);
});
