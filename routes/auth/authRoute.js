const express = require("express")

const router = express.Router()

const loginController = require("../../controllers/auth/loginController")
const logoutController = require("../../controllers/auth/logoutController")
// const forgotPasswordController = require("@controllers/auth/forgotPasswordController")
// const resetPasswordController = require("@controllers/auth/resetPasswordController")
const { basicAuth } = require("../../middlewares/auth")

router.post("/login", basicAuth(), loginController.login)
router.put("/logout", logoutController.logout)
// router.post("/forgot-password", forgotPasswordController.forgotPassword)
// router.put("/reset-password/:token", resetPasswordController.resetPassword)

module.exports = router
