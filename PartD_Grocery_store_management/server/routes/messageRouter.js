const express = require("express")
const router = express.Router()
const messageController = require('../controllers/messageController')
const verifyJWT = require('../middleware/verifyJWT')

router.get("/",verifyJWT, messageController.readSupplierMessages)
router.put("/",verifyJWT, messageController.updateMessageStatus)

module.exports = router