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
 

// it check that you provide correct url (like delete , put ) && if you not provide user_Id in params
// router.get("*", (req, res) => {
//     return res.status(404).send({status: false, message: "Please select correct (url or route) page not found"})
// })
// router.post("*", (req, res) => {
//     return res.status(404).send({status: false, message: "Please select correct (url or route) page not found"})
// })
// router.put("*", (req, res) => {
//     return res.status(404).send({status: false, message: "Please select correct (url or route) page not found"})
// })
// router.delete("*", (req, res) => {
//     return res.status(404).send({status: false, message: "Please select correct (url or route) page not found"})
// })


module.exports = router;
