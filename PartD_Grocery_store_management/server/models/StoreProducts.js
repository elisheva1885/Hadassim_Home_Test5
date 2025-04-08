const mongoose = require('mongoose')
const storeProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    minimum_quantity: {
        type: Number,
        required: true,
    },
    current_quantity: {
        type: Number,
        required: true,
    },
    ordered: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('StoreProducts', storeProductsSchema)
