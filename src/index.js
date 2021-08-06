// NO AUTH - temp session bound to cookie (autodeleted after some time) with clean env
// TODO: factor out const auth = req.headers.authorization of each method
// TODO: error handling on routes

const express = require('express')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid');
const Sandbox = require ('./model/sandbox.js')
const Book = require('./model/book.js')
const booksRouter = require('./route/books.js')
const favouritesRouter = require('./route/favourites.js')
require('./db/mongoose.js')

const app = express()
const port = 3000

app.use(express.json())
app.use('/', booksRouter)
app.use('/', favouritesRouter)

app.use(cors())
app.get('/', async (req, res) => {
    apiKey = uuidv4();
    await new Sandbox({ apikey: apiKey, favourites: [], creationDate: Date.now() }).save()
    res.redirect(`/${apiKey}`)
})

app.get('/:apiKey', async (req,res) => {
  if (req.params.apiKey !== "favicon.ico") {
    const apiKey = req.params.apiKey
    console.log('... API Key = ' + apiKey)
    const books = await Book.find({})
    const sandbox = await Sandbox.findOne({ apikey: apiKey })
    const favourites = JSON.stringify(sandbox.favourites[0])

    res.send(`
      <!DOCTYPE html>
      <div id="app">
        <div id="topbar">
          Learn REST APIs! Playground token: ${apiKey}
        </div>
        <hr />
        <div id="app-content">
          <h2>Books in store</h2>
          <div class="main-container">
            ${books}
          </div>
          <h2>Favourites</h2>
            ${favourites}
          <div>
          </div>
        </div>
      </div>
    `)
  }
})

// app.get('/c', async (req, res) => {
//   apikey = uuidv4();
//   await new Sandbox({ apikey: apikey, favourites: [], creationDate: Date.now() }).save()
//   res.send(apikey)
// })



app.listen(port, () => {
  console.log(`>>> learn-rest listening at http://localhost:${port}`)
})