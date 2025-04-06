const jwt = require('jsonwebtoken')
const adminVerify = (req, res, next)=> {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message : 'Unauthorized'})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                return res.status(403).json({message: 'Forbidden'})
            }
            if (decoded.Admin_Name === process.env.ADMIN_NAME) {
                req.Admin_Name = decoded.Admin_Name;
                next();
            } else {
                return res.status(403).json({ message: 'Access denied' });
            }
            // req.Admin_Name = decoded
            // if(!Admin_Name == process.env.ADMIN_NAME){
            //     return res.status(403).json({message: 'Access denied'})
            // }
            // next()
        }
    )
}
module.exports = adminVerify

