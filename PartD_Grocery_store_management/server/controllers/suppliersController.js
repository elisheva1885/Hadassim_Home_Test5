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

const getSupplierProducts = async (req,res)=> {
    const supplierId = req.supplier._id 

    const supplierObject = await Suppliers.findById(supplierId).lean()
    if(!supplierObject){
        return res.status(404).json({ message: "invalid supplier" })
    }
    return res.status(200).json({supplierProducts: supplierObject.productsList})
}

const getSuppliersCompanies = async (req,res) => {
    const suppliers = await Suppliers.find().lean()
    if(!suppliers?.length)
         return res.status(404).json({ message: "no suppliers found" })

    return res.status(200).json([...new Set(suppliers.companyName)])
}

const getSuppliersNames = async (req,res) => {
    const suppliers = await Suppliers.find().lean()
    if(!suppliers?.length)
         return res.status(404).json({ message: "no suppliers found" })
    return res.status(200).json(suppliers.representative_Name)
}

module.exports = { login, register, getSupplierProducts, getSuppliersCompanies, getSuppliersNames }