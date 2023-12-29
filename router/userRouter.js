const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const middleware =  require("../middleware/auth")
// swagger
fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

router.use('/api-Ecomm', swaggerUi.serve);
router.get('/api-Ecomm', swaggerUi.setup(swaggerDocument, {customCss}));



router.post("/register/user", userController.register);
router.post("/login/user" , userController.login);
router.get("/get/user/:user_Id",middleware.Authorization, userController.getData_user);
router.put("/update/user/:user_Id" ,middleware.Authorization, userController.update_user)
router.delete("/delete/user/:user_Id" ,middleware.Authorization, userController.delete_user)
 
module.exports = router;
