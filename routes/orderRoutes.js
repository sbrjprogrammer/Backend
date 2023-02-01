const express =require("express")
const Router = express.Router()
const orderController = require("../controllers/orderController")
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

Router.post("/order/new",isAuthenticatedUser,orderController.newOrder)
Router.get("/order/:id",isAuthenticatedUser,orderController.getSingleOrder)
Router.post("/order/me",isAuthenticatedUser,orderController.myOrders)
Router.get("/admin/order",isAuthenticatedUser,authorizeRoles("admin"),orderController.getAllOrders)
Router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),orderController.updateOrder)
Router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),orderController.deleteOrder)





module.exports = Router