const express = require("express")
const Router= express.Router()
const productController  = require("../controllers/productController")
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

Router.post()
Router.get("/product",productController.getProduct)
Router.post("/product/new",isAuthenticatedUser,authorizeRoles("admin"),productController.createproduct)
Router.put("/product/:id",isAuthenticatedUser,authorizeRoles("admin"),productController.updateProduct)
Router.delete("/product/:id",isAuthenticatedUser,authorizeRoles("admin"),productController.deleteProduct)
Router.get("/product/:id",isAuthenticatedUser,authorizeRoles("admin"),productController.getSingleProduct)
Router.put("/product/review",isAuthenticatedUser,authorizeRoles("admin"),productController.getSingleProduct)
Router.get("/product/getProductReview",isAuthenticatedUser,productController.getProductReviews)
Router.delete("/product/deleteReview",isAuthenticatedUser,productController.deleteReview)



module.exports=Router