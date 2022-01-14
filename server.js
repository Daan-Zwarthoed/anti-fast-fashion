const express = require("express");
const app = express();
const pug = require("pug");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
const PORT = process.env.PORT || 1234;

app.get("/", function (req, res) {
  const lineGraphData = require("./public/data/lineGraphData.json");
  res.render("index", { lineGraphData: lineGraphData });
});

app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});
