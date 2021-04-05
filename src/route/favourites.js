const express = require('express')
const Book = require ('../model/book.js')
const Sandbox = require ('../model/sandbox.js')
const router = new express.Router()

router.get('/favourites' , async (req, res) => {
    console.log('get favourites')
    
    const auth = req.headers.authorization
    const token = auth.replace('Bearer ', '')
  
    const sandbox = await Sandbox.findOne({ apikey: token })
    res.send(sandbox.favourites)

})
  
router.put('/favourites' , async (req, res) => {

    const auth = req.headers.authorization
    const token = auth.replace('Bearer ', '')

    const book = await Book.findOne({ id: req.body.id }) 

    await Sandbox.updateOne({ apikey: token }, { $push: { favourites: book } }); 
    res.send()

})

router.delete('/favourites', async (req, res) => {

    const auth = req.headers.authorization
    const token = auth.replace('Bearer ', '')

    const id = req.body.id
    await Sandbox.updateOne({ apikey: token }, { $pull: { favourites: { id: id } }})
    res.send()

})

module.exports = router;