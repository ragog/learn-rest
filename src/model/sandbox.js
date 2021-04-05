const mongoose = require('mongoose')

const Sandbox = mongoose.model('Sandbox', {
    apikey: {
      type: String,
      required: true
    },
    creationDate: {
      type: Number,
      required: true
    },
    favourites: {
      type: Array,
      default: []
    } // validate(value){ ... } for custom validation; use together with npm package 'validator'
})

module.exports = Sandbox