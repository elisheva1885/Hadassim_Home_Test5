
const Messages = require('../models/Messages')
const Suppliers =  require('../models/Suppliers')

const createMessage = async (supplier, order) => {
    if (!supplier || !order) {
        throw new Error("data is missing");
    }  
    const supplierObject = await Suppliers.findById(supplier).lean()
    if(!supplierObject){
        throw new Error("invalid supplier");
    }
    const duplicate = await Messages.findOne({"supplier": supplier,"order": order}).lean()
    if (duplicate) 
        throw new Error({ message: "this message already exicts"})
    const message = await Messages.create({supplier, order})
    if(message){
        return message
    }
    throw new Error("invalid message")
    
}

const readSupplierMessages = async (req, res)=> {
    const supplierId = req.supplier._id 
    const messages = await Messages.find({'supplier':supplierId, 'read':false}).lean()
    if(!messages?.length)
        return res.status(404).json({ message: "no messages found" })
    return res.status(200).json(messages)
}

const updateMessageStatus = async (req,res)=> {
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({message: "error on updating status"})
    }
    const message = await Messages.findById(_id).exec()
    if(!message)
        return res.status(404).json({ message: "no such message" })
    if(message.read=== false){
        message.read = true
    }
    const updatedMessage = await message.save()
    return res.status(201).json(updatedMessage)
}


module.exports = {createMessage, readSupplierMessages ,updateMessageStatus}




