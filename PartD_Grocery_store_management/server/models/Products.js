const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    minimum_quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Products', productsSchema)
