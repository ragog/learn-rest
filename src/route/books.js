const express = require('express')
const Book = require ('../model/book.js')
const router = new express.Router()

router.get('/books', async (req, res) => {
    const books = await Book.find()
    res.send(books)
})

module.exports = router;