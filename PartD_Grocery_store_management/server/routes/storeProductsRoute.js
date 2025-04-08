const express = require("express")
const router = express.Router()
const storeProductsController = require('../controllers/storeProductsController')

router.post("/", storeProductsController.createStoreProduct)
router.get("/",storeProductsController.readStoreProducts)
router.get("/:name",storeProductsController.readStoreProductByName)
router.get("/:_id",storeProductsController.readStoreProductById)
router.put("/",storeProductsController.updateStoreProductAmount)
module.exports = router