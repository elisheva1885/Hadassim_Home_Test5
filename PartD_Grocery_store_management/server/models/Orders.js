const mongoose = require('mongoose')
const ordersSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suppliers',
        required: true,
    },
    products: {
        type: [ 
            {
                product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' , required: true},
                amount:{type:Number , required: true}
            }
            ],
            required: true
    },
    status: {
        type: String, 
        enum: ["created","In progress","Completed"],
        default: "created"
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Orders', ordersSchema)
