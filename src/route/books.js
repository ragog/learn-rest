const express = require('express')
const Book = require ('../model/book.js')
const router = new express.Router()
const preExec = require('../middleware/middleware.js')
router.use(preExec)

router.get('/books', async (req, res) => {
    const books = await Book.find({})
    res.send(books)
})

router.put('/books' , async (req, res) => {

    const auth = req.headers.authorization
    const token = auth.replace('Bearer ', '')

    console.log(res.body)
    const book = await new Book({ title: res.body.title, author: res.body.author }).save()

    res.send()

})

module.exports = router;