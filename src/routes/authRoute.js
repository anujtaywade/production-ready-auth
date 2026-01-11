const router = require('express').Router()
const {signup , login , logout} = require("../controller/authController")


router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)

module.exports = router