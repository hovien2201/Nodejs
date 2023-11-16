const mongoose = require('mongoose')
const schema = mongoose.Schema
const TypeProduct = new schema({
    name: {type: String}
})
module.exports = mongoose.model('TypeProduct',TypeProduct)