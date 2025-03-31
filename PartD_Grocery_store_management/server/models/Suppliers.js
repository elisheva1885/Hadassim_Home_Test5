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
    goodsList: {
        type: mongoose.Schema.Types.ObjectId,
        reqired: true,
        ref: 'Goods'
    }   
}, {
    timestamps: true
})
module.exports = mongoose.model('Suppiers', suppiersSchema)
