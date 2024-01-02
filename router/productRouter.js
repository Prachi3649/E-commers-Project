
const express = require("express");
const router = express.Router();
const  productController = require("../controller/productController");
const middleware = require("../middleware/auth")



fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
router.get("/get",(req,res) => {
    res.send("test vercel by thunder")
})
router.use('/api-Ecomm', swaggerUi.serve);
router.get('/api-Ecomm', swaggerUi.setup(swaggerDocument, {customCss}));


router.post("/add-product/product", middleware.Authorization, productController.add_product);   // only admin Access
router.get("/product/get-all-product" , productController.get_all_product);
router.get("/product/get-product/:product_Id",  productController.get_product_byId);
router.put("/product/update-product/:product_Id" , middleware.Authorization,  productController.update_product_ById);  // only admin Access
router.delete("/product/delete-product/:product_Id" , middleware.Authorization,  productController.delete_product);    // only admin Access


module.exports = router;
