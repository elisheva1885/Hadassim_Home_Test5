const mongoose = require('mongoose')
const suppiersSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    representative_Name: {
        type: String,
        required: true,
    },
    productsList: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        reqired: true,
    }   
}, {
    timestamps: true
})
module.exports = mongoose.model('Suppiers', suppiersSchema)
