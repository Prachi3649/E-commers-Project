const jwt = require("jsonwebtoken");
const validator = require("../validator/validator")


//authentication
module.exports.Authentication = async function (req, res, next) {
    try {
        const token = req.headers["Authorization"];
        if (!token) {
            return res.status(403).send({ status: false, msg: "token not avilable(authentication)" })
        }


        // Extract the token without the 'Bearer ' prefix
        const tokenWithoutBearer = token.slice(7);

        // Verify the token
        const decoded = jwt.verify(tokenWithoutBearer, "hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123");
        if (!decoded) {
            return res.status(400).send({ status: false, msg: "token is invalid" });
        }
        // Attach the user ID to the request for future use
        req.user = { userId: decoded.userId };

        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error })
    }
}


// Authorization 

module.exports.Authorization = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).send({ status: false, message: "Please provide a token" });
        }

        const decodedToken = jwt.verify(token, "hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123");
        if (!decodedToken) {
            return res.status(400).send({ status: false, message: "Token expired" });
        }

        const userRole = decodedToken.profile;
        const userId = decodedToken.userId
        let user_id = req.params.user_Id;
        let user = req.query.userId;

        // console.log("userRole", userRole);
        // // console.log("decodedToken", decodedToken);

        // console.log("userrrr", userId);
        // // console.log("req.query.userId", user);
        // console.log("req.params.userId", user_id);



        if (!userRole) {
            return res.status(403).send({ status: false, message: "You are not authorized" });
        }

        // Check the role in the decoded token
        if (userRole === "admin") {
            next()

        } else if (userRole === 'customer') {
                // req.params
                if (userId === user_id) {  
                    next()
                } 
                // req.query
                else if (userId === user) {
                    next()
                }
                else {
                    return res.status(403).send({ status: false, message: "You are not authorized to access this resource" });
                }

          
        }



    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};



