const express = require("express")
const router = express.Router()
const suppliersController = require('../controllers/suppliersController')

router.post("/auth/register", suppliersController.register)
router.post("/auth/login", suppliersController.login)
router.get("/", suppliersController.getSuppliersNames)
router.get("/companies", suppliersController.getSuppliersCompanies)

module.exports = router