const Products = require('../models/Products')

const createProduct = async (req,res) => {
    const {name, itemPrice, minimum_quantity} = req.body
    if(!name|| !itemPrice|| !minimum_quantity)
        return res.status(400).json({ message: "all details are required" })
    
    const duplicate = await Products.findOne({name: name}).lean()
    if (duplicate) 
        return res.status(409).json({ message: "this good already exist" })
    
    const product = await Products.create({name, itemPrice, minimum_quantity})
    if(product)
        return res.status(201).json(product)
    return res.status(400).json({ message: "invalid good" })
    
}

const readProducts = async (req, res)=> {
    const products = await Products.find().lean()
    if(!products?.length)
        return res.status(404).json({ message: "no products found" })
    return res.status(200).json(products)
}

const readProductByName = async (req,res)=> {
    const {name} = req.body
    const product = await Products.find({name: name}).lean()
    if(!product)
        return res.status(404).json({ message: "no product with this name" })
    return res.status(200).json(product)
}

const readProductById = async (req,res)=> {
    const {_id} = req.body
    const product = await Products.findById(_id).lean()
    if(!product)
        return res.status(404).json({ message: "no product with this name" })
    return res.status(200).json(product)
}

module.exports = {createProduct, readProducts ,readProductByName, readProductById}


