const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    title: {
      type: String,
      required: true,
      default: 'unknown'
    },
    author: {
      type: Array,
      required: true,
      default: 'unknown'
    } // validate(value){ ... } for custom validation; use together with npm package 'validator'
})

module.exports = Book