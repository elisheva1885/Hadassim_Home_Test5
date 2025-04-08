const express = require("express")
const router = express.Router()
const ordersController = require('../controllers/ordersController')
const adminVerify = require('../middleware/adminVerify')
const verifyJWT = require('../middleware/verifyJWT')

router.post("/",adminVerify, ordersController.createOrder)
router.get("/all",adminVerify, ordersController.readAllOrdersAdmin)
router.get("/", adminVerify,ordersController.readOrdersStatusAdmin)
router.get("/supplier",verifyJWT,  ordersController.readOrdersBySupplier)
router.put("/supplier",verifyJWT, ordersController.updateOrderStatusSupplier)
router.put("/",adminVerify, ordersController.updateOrderStatusAdmin)

module.exports = router