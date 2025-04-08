const StoreProducts = require('../models/storeProducts')
const ordersController = require('../controllers/ordersController')
const createStoreProduct = async (req, res) => {
    const { name, minimum_quantity, current_quantity } = req.body
    if (!name || !current_quantity || !minimum_quantity)
        return res.status(400).json({ message: "all details are required" })

    const duplicate = await StoreProducts.findOne({ "name": name, "minimum_quantity": minimum_quantity }).lean()
    if (duplicate)
        return res.status(409).json({ message: "this product already exist in the store" })

    const storeProduct = await StoreProducts.create({ name, minimum_quantity, current_quantity })
    if (storeProduct)
        return res.status(201).json(storeProduct)
    return res.status(400).json({ message: "invalid product" })

}

const readStoreProducts = async (req, res) => {
    const storeProducts = await StoreProducts.find().lean()
    if (!storeProducts?.length)
        return res.status(404).json({ message: "no products in the store" })
    return res.status(200).json(storeProducts)
}

const readStoreProductByName = async (req, res) => {
    const { name } = req.body
    const storeProduct = await StoreProducts.find({ name: name }).lean()
    if (!storeProduct)
        return res.status(404).json({ message: "no product with this name in the store" })
    return res.status(200).json(storeProducts)
}

const readStoreProductById = async (req, res) => {
    const { _id } = req.params
    const storeProduct = await StoreProducts.findById(_id).lean()
    if (!storeProduct)
        return res.status(404).json({ message: "no product with this id" })
    return res.status(200).json(product)
}


const updateStoreProductAmount = async (req, res) => {
    const processProduct = async (name, quantity) => {
        try {
            const storeProduct = await StoreProducts.findOne({ name: name }).exec();
            if (!storeProduct) {
                return { error: `No such product: ${name} in the store` };
            }

            if (storeProduct.current_quantity - quantity < 0) {
                return { error: `Can't complete purchase for ${name}` };
            }
            storeProduct.current_quantity -= quantity;
            if (storeProduct.current_quantity < storeProduct.minimum_quantity ) {
                if(storeProduct.ordered === false){
                const orderResponse = await ordersController.createOrderByProduct(storeProduct.name);
                storeProduct.ordered = true
                if (orderResponse.error) {
                    return { error: orderResponse.error };
                }
            }
            else{
                return { error: `this in order` }; 
            }
        }
            await storeProduct.save();
            return null;  
        } catch (error) {
            console.error("Error processing product:", error);
            return { error: error.message }; 
        }
    };

    const productQuantities = req.body;
    const errors = await Promise.all(
        Object.entries(productQuantities).map(([name, quantity]) => processProduct(name, quantity))
    );

    const firstError = errors.find(result => result && result.error);
    if (firstError) {
        return res.status(400).json({ message: firstError.error }); 
    }

    return res.status(201).json({ message: "All products processed successfully" });
};

module.exports = { createStoreProduct, readStoreProducts, readStoreProductById, readStoreProductByName, readStoreProductById, updateStoreProductAmount }


