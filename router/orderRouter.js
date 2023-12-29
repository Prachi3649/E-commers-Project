
const express = require("express");
const router = express.Router();
const  orderController = require("../controller/orderController");
const middleware = require("../middleware/auth")
const email = require("../controller/emailController")

router.post("/create/order/add-order/:user_Id" ,middleware.Authorization, email.add_order);
router.get("/order/get-all-order" ,middleware.Authorization,  orderController.get_all_order);  
router.get("/order/get-order/:order_Id/:user_Id" ,middleware.Authorization,  orderController.get_order);

// total sale 
router.get("/order/get-total_Product_Sale-order" , middleware.Authorization, orderController.total_Product_Sale);   // only admin Access
router.get("/order/get-total_User_Sale/:user_Id" ,middleware.Authorization,  orderController.totalSale);  

router.put("/order/update-order/:order_Id" ,middleware.Authorization,  email.update_order);  // only admin Access
router.put("/order/update-order_user/:user_Id/:order_Id" ,middleware.Authorization, email.update_order_ByUser);
router.delete("/order/delete-order/:order_Id" ,middleware.Authorization,  orderController.delete_order);   // only admin Access


module.exports = router;
