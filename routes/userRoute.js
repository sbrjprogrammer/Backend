const express = require("express")
const Router= express.Router()
const userControllers = require("../controllers/userController")
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");


Router.post("/user/new",userControllers.registerUser)
Router.post("/user/login",userControllers.loginUser)
Router.get("/user/logout",userControllers.logout)
Router.post("/user/forgotPassword",userControllers.forgotPassword)
Router.put("/user/resetPassword",userControllers.forgotPassword)
Router.get("/user/me",isAuthenticatedUser,userControllers.getUserDetails)
Router.put("/user/updatePassword",isAuthenticatedUser,userControllers.updatePassword)
Router.put("/user/updateProfile",isAuthenticatedUser,userControllers.updateProfile)
Router.get("/admin/getAlluser",isAuthenticatedUser,authorizeRoles("admin"),userControllers.getAllUser)
Router.get("/admin/getsingleuser/:id",isAuthenticatedUser,authorizeRoles("admin"),userControllers.getSingleUser)
Router.put("/admin/updateUserRole/:id",isAuthenticatedUser,authorizeRoles("admin"),userControllers.updateUserRole)
Router.delete("/admin/deleteUser/:id",isAuthenticatedUser,authorizeRoles("admin"),userControllers.deleteUser)



module.exports = Router