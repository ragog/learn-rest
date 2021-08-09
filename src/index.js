// NO AUTH - temp session bound to cookie (autodeleted after some time) with clean env
// TODO: factor out const auth = req.headers.authorization of each method
// TODO: error handling on routes

// index-level request intercepting middleware to show last received request?

const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");
const Sandbox = require("./model/sandbox.js");
const Book = require("./model/book.js");
const booksRouter = require("./route/books.js");
const favouritesRouter = require("./route/favourites.js");
const { request } = require("express");
const homepage = require("./view/home.js")
require("./db/mongoose.js");

const app = express();
const port = 3000;

let lastRequest;
let requestDetails = "No request received yet.";

app.use(express.json());
app.use(cors());

app.use("/api", async (req, res, next) => {
  console.log("RUNNING");
  lastRequest = req;
  next();
  return;
});

app.use("/api", booksRouter);
app.use("/api", favouritesRouter);

app.get("/", async (req, res) => {
  apiKey = uuidv4();
  console.log("Created new API Key = " + apiKey);
  await new Sandbox({
    apikey: apiKey,
    favourites: [],
    creationDate: Date.now(),
  }).save();
  res.redirect(`/${apiKey}`);
});

app.get("/:apiKey", async (req, res) => {
  // TODO refactor
  if (req.params.apiKey !== "favicon.ico") {
    const apiKey = req.params.apiKey;
    console.log("Loading existing API Key = " + apiKey);
    const books = await Book.find({});
    const sandbox = await Sandbox.findOne({ apikey: apiKey });
    const favourites = JSON.stringify(sandbox.favourites[0]);

    let bookList = "";
    for (book of books) {
      bookList += `<li>${book}</li>`;
    }

    if (lastRequest) {console.log(lastRequest)
      const bodyString = JSON.stringify(lastRequest.body)
      requestDetails = `${lastRequest.method} ${lastRequest.url} ${bodyString}`
    }

    res.send(homepage(apiKey, bookList, favourites, requestDetails));
  }
});

app.listen(port, () => {
  console.log(`>>> learn-rest listening at http://localhost:${port}`);
});
