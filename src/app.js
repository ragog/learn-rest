// NO AUTH - temp session bound to cookie (autodeleted after some time) with clean env
// TODO: factor out const auth = req.headers.authorization of each method
// TODO: error handling on routes

const express = require('express')
const { v4: uuidv4 } = require('uuid');
const Sandbox = require ('./model/sandbox.js')
const preExec = require('./middleware/middleware.js')
const booksRouter = require('./route/books.js')
const favouritesRouter = require('./route/favourites.js')
require('./db/mongoose.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(preExec)
app.use(booksRouter)
app.use(favouritesRouter)

app.get('/', async (req, res) => {
  apikey = uuidv4();
  await new Sandbox({ apikey: apikey, favourites: [], creationDate: Date.now() }).save()
  res.send(`Hello! Your sandbox API key is: ${apikey}`)
})

app.listen(port, () => {
  console.log(`>>> learn-rest listening at http://localhost:${port}`)
})