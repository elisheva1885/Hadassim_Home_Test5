const express = require("express")
const router = express.Router()
const suppliersController = require('../controllers/suppliersController')

router.post("/auth/register", suppliersController.register)
router.post("/auth/login", suppliersController.login)
router.get("/byCompany/:company", suppliersController.getSuppliersNamesByCompany)
router.get("/", suppliersController.getSuppliersCompanies)
router.get("/:product_id", suppliersController.getSupplierByProduct)

module.exports = router
