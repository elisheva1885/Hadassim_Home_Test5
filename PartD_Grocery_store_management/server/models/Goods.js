const mongoose = require('mongoose')
const goodsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: String,
        required: true,
    },
    minimum_quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Goods', goodsSchema)
