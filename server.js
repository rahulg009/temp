const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const router = require("./routes/product.route.js");
app.use("/bajaj/products", router);

const PORT = process.env.PORT || 8080;

//server
module.exports = app;

app.listen(PORT, () => {
  console.log(`BFHL is running on port ${PORT}`);
});
