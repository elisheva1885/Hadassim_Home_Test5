const Products = require("../models/Products")
const jwt = require('jsonwebtoken')
const Suppliers = require("../models/Suppliers")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const { companyName, phoneNumber, representative_Name, password ,productsList } = req.body
    if (!companyName || !phoneNumber || !representative_Name || !password || !productsList) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    const duplicate = await Suppliers.findOne({'companyName': companyName,  'representative_Name': representative_Name }).lean()

    if (duplicate) {
        return res.status(409).json({ message: "this company already have such a representative" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const supplierObject = { companyName, phoneNumber, representative_Name,password: hashedPassword, productsList  }
    const supplier = await Suppliers.create(supplierObject)
    if (supplier) {
        return res.status(201).json({ message: `New supplier created` })
    }
    else {
        return res.status(400).json({ message: "invalid supplier recived" })
    }
}


const login = async (req, res) => {
    const { companyName, representative_Name , password} = req.body
    if (!companyName || !representative_Name || !password) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    const foundSupplier = await Suppliers.findOne({'companyName': companyName,  'representative_Name': representative_Name }).lean()
    if (!foundSupplier) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const match = await bcrypt.compare(password, foundSupplier.password)
    if (!match) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    const supplierInfo = {
        _id: foundSupplier._id,
        companyName: foundSupplier.companyName,
        phoneNumber: foundSupplier.phoneNumber,
        representative_Name: foundSupplier.representative_Name,
        productsList: foundSupplier.productsList
    }
    const accessToken = jwt.sign(supplierInfo, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({token: accessToken ,companyName: supplierInfo.companyName,representative_Name: supplierInfo.representative_Name })
}

const getSupplierProducts = async (supplier)=> {

    if (!supplier) {
        throw new Error("Supplier data is missing");
    }  
    console.log(supplier);
    const supplierObject = await Suppliers.findById(supplier).lean()
    if(!supplierObject){
        throw new Error("invalid supplier");
        // return res.status(404).json({ message: "invalid supplier" })
    }
    return supplierObject.productsList
    // return res.status(200).json({supplierProducts: supplierObject.productsList})
}

const getSuppliersCompanies = async (req,res) => {
    const suppliers = await Suppliers.find().lean()
    if(!suppliers?.length)
         return res.status(404).json({ message: "no suppliers found" })
    const uniqueSuppliers = suppliers.filter((supplier, index, self) =>
    index === self.findIndex((s) => s.companyName === supplier.companyName)
    );
    return res.status(200).json(uniqueSuppliers)
}

const getSuppliersNamesByCompany = async (req,res) => {
    const {company} = req.params
    const suppliers = await Suppliers.find({company_Name:company}).lean()
    if(!suppliers?.length)
         return res.status(404).json({ message: "no suppliers found" })
    return res.status(200).json(suppliers.representative_Name)
}

const getSupplierByProduct = async (req,res)=> {
    const {product_id}= req.params
    const product = await Products.findById(product_id).lean()
    console.log(product);
    if (!product) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    const suppliers = await Suppliers.find().lean()
    if(!suppliers?.length)
    return res.status(404).json({ message: "no suppliers found" })
    const productSuppliers  = suppliers.filter(s=>  {   
        return s.productsList.some(prod => prod.equals(product._id))})
    if(!productSuppliers?.length)
        return res.status(404).json({ message: "no supplier have this product" })
    return res.status(200).json(productSuppliers)
}

module.exports = { login, register, getSupplierProducts, getSuppliersCompanies, getSuppliersNamesByCompany , getSupplierByProduct}