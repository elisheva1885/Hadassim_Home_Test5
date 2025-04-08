

const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { Admin_Name, Admin_Password} = req.body
    if ( !Admin_Name || !Admin_Password) {
        return res.status(400).json({ message: "all field are reqired" })
    }
    if (Admin_Name != process.env.ADMIN_NAME || Admin_Password != process.env.ADMIN_PASSWORD ) {
        return res.status(403).json({ message: "No access" })
    }
    const accessToken = jwt.sign({ Admin_Name: process.env.ADMIN_NAME }, process.env.ACCESS_TOKEN_SECRET)
    res.status(201).json({token: accessToken,Admin_Name: process.env.ADMIN_NAME })
}

module.exports = { login }