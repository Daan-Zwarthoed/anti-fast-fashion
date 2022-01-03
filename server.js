const express = require("express");
const app = express();
const pug = require("pug");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  const data = require("./public/graffitiJson/graffiti.json");
  res.render("index", { data: data });
});

app.listen(PORT, () => {
  console.log("Server is running at port 3000");
});
