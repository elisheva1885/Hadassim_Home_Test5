const Goods = require("../models/Products")
// const jwt = require('jsonwebtoken')
const Suppliers = require("../models/Suppliers")

const register = async (req, res) => {
    const { companyName, phoneNumber, representative_Name, goodsList } = req.body
    if (!companyName || !phoneNumber || !representative_Name || !goodsList) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    const duplicate = await Suppliers.findOne({'companyName': companyName,  'representative_Name': representative_Name }).lean()

    if (duplicate) {
        return res.status(409).json({ message: "this company already have such a representative" })
    }
    const supplier = await Suppliers.create({ companyName, phoneNumber, representative_Name, goodsList })
    if (supplier) {
        return res.status(201).json({ message: `New supplier created` })
    }
    else {
        return res.status(400).json({ message: "invalid supplier recived" })
    }
}


const login = async (req, res) => {
    const { companyName, representative_Name } = req.body
    if (!companyName || !representative_Name) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    const foundSupplier = await Suppliers.findOne({'companyName': companyName,  'representative_Name': representative_Name }).lean()
    if (!foundSupplier) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    // const supplierInfo = {
    //     _id: foundSupplier._id,
    //     companyName: foundSupplier.companyName,
    //     phoneNumber: foundSupplier.phoneNumber,
    //     representative_Name: foundSupplier.representative_Name,
    //     goodsList: foundSupplier.goodsList
    // }
    // const accessToken = jwt.sign(supplierInfo, process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json({companyName: foundSupplier.companyName,representative_Name: foundSupplier.representative_Name })
}

module.exports = { login, register }