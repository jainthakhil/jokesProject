import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "" });
});

app.post("/", async (req, res) => {
  const category = req.body.category;
  const blacklist = req.body.blacklist;
  const line = req.body.line;
  const amount = req.body.amount;
  const url =
    "https://v2.jokeapi.dev/joke/" +
    category +
    "?blacklistFlag=" +
    blacklist +
    "&format=txt&type=" +
    line +
    "&amount=" +
    amount;

  try {
    const result = await axios.get(url);
    console.log(result.data);
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.render("index.ejs", { content: "Error:" + error.message });
  }
});

app.listen(port, () => {
  console.log(`server has been started at port ${port}`);
});
