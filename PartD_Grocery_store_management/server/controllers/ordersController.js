const Orders = require('../models/Orders')
const Suppliers = require('../models/Suppliers')
const supplierController = require("../controllers/suppliersController")
const messageController = require("../controllers/messageController")
const Products = require('../models/Products')
const StoreProducts = require('../models/storeProducts')
const storeProducts = require('../models/storeProducts')
const createOrder = async (req,res) => {
    const {supplier, products} = req.body
    if(!supplier|| !products)
        return res.status(400).json({ message: "all details are required" })
    const supplierObject = await Suppliers.findById(supplier).lean()
    if(!supplierObject)
        return res.status(404).json({ message: "no such supplier" })
    const supplierProducts = await supplierController.getSupplierProducts(supplier)
    products?.map((product)=>{
        if(supplierProducts.some(supplierProduct => supplierProduct._id === product._id)){
            return res.status(404).json({message: "the products isnt fit to the supplier"})
        }   
    })
    const duplicate = await Orders.findOne({"supplier": supplier,"products": products }).lean()
    if (duplicate) 
        return res.status(409).json({ message: "this order already exist" })
    
    const order = await Orders.create({supplier, products})
    if(order)
        return res.status(201).json(order)
    return res.status(400).json({ message: "invalid order" })
    
}

const readAllOrdersAdmin = async (req, res)=> {
    const orders = await Orders.find().lean()
    if(!orders?.length)
        return res.status(404).json({ message: "no orders found" })
    return res.status(200).json(orders)
}

const readOrdersStatusAdmin = async (req, res)=> {
    const orders = await Orders.find({status: "In progress" || "created"}).lean()
    if(!orders?.length)
        return res.status(404).json({ message: "no orders found" })
    return res.status(200).json(orders)
}

const readOrdersBySupplier = async (req,res)=> {
    const supplierId = req.supplier._id 
    const orders = await Orders.find({supplier:supplierId}).lean()
    if(!orders?.length)
        return res.status(404).json({ message: "no orders found" })
    return res.status(200).json(orders)
}


const updateOrderStatusSupplier = async (req,res)=> {
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({message: "error on updating status"})
    }
    const order = await Orders.findById(_id).exec() 
    if(!order)
        return res.status(404).json({ message: "no such order" })
    const supplierId = req.supplier._id 
    if(order.supplier!=supplierId){
        return res.status(403).json({message: "not allow to change status to this order"})
    }
    if(order.status === "created"){
        order.status = "In progress"
    }
    const updatedOrder = await order.save()
    return res.status(201).json(updatedOrder)
}

const updateOrderStatusAdmin = async (req,res)=> {
    const {_id} = req.body
    if(!_id){
        return res.status(400).json({message: "error on updating status"})
    }
    const order = await Orders.findById(_id).populate('products.product', 'name').exec();

    if(!order)
        return res.status(404).json({ message: "no such order" })
    if(order.status=== "In progress"){
        order.status = "Completed"
    }

    await Promise.all(order.products.map(async (item) => {
        const productName = item.product.name; 
        const orderAmount = item.amount; 

        const storeProduct = await storeProducts.findOne({ name: productName }).exec();

        if (storeProduct) {
            storeProduct.current_quantity += orderAmount
            storeProduct.ordered =false
                await storeProduct.save();

        }}));

    try{
        const message = await messageController.createMessage(order.supplier, order._id)
    }
    catch(error){
        return res.status(400).json({message: "error on creating message"})
    }
    const updatedOrder = await order.save()
    return res.status(201).json(updatedOrder)
}

const createOrderByProduct = async (productName) => {
    if (!productName) {
        return { error: "productName is required" }; 
    }

    const products = await Products.find({ name: productName }).lean();
    if (products.length === 0) {
        return { error: "No supplier has this product" }; 
    }

    const productWithMinPrice = products.sort((a, b) => a.price - b.price)[0];
    const productSupplier = await supplierController.getProductSupplier(productWithMinPrice._id);

    const product = [
        {
            product: productWithMinPrice._id,
            amount: productWithMinPrice.minimum_quantity + 1
        }
    ];

    const supplier = productSupplier._id;
    const order = await Orders.create({ supplier, products: product });

    if (!order) {
        return { error: "Invalid order" }; 
    }

    return { order }; 
};
module.exports = {createOrder, readAllOrdersAdmin, readOrdersStatusAdmin , readOrdersBySupplier , updateOrderStatusAdmin, updateOrderStatusSupplier, createOrderByProduct}


