const mongoose = require('mongoose')
const messagesSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suppliers',
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Messages', messagesSchema)
