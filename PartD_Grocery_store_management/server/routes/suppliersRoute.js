const express = require("express")
const router = express.Router()
const suppliersController = require('../controllers/suppliersController')

router.post("register", suppliersController.register)
router.post("login", suppliersController.login)
module.exports = router