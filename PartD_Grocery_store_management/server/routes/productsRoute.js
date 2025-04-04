const express = require("express")
const router = express.Router()
const productsController = require('../controllers/productsController')

router.post("", productsController.createProduct)
router.get("/",productsController.readProducts)
router.get("/:_id",productsController.readProductById)

router.get("/byName/:name",productsController.readProductByName)
module.exports = router