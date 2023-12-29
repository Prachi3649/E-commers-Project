const validator = require("../validator/validator");
const order_Model = require("../model/orderModel");
const user_Model = require("../model/userModel");
const product_Model = require("../model/productModel");
const aws = require("aws-sdk");
const moment = require("moment")
module.export = AWS_SDK_LOAD_CONFIG=1

//redis require
const redis = require("redis");
const { promisify } = require("util");

// Separate the function and the variable
let redisClient;

const createRedisClient = () => {
    console.log("Connecting to Redis");
    redisClient = redis.createClient({
        url: "redis://default:MCseHAx1OWJCgLr45pmhnoC16xnti5i7@redis-10545.c301.ap-south-1-1.ec2.cloud.redislabs.com:10545"
    });

    redisClient.on("error", (error) => console.error(`Error: ${error}`));

    // Log Redis connection events for debugging
    redisClient.on("connect", () => console.log("Connected to Redis"));
    redisClient.on("ready", () => console.log("Redis is ready"));
    redisClient.on("end", () => console.log("Connection to Redis has ended"));
    redisClient.on("reconnecting", () => console.log("Reconnecting to Redis"));
};

// Call the function to create the Redis client
createRedisClient();

// Connection setup for Redis
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);
const GET_ASYNC = promisify(redisClient.get).bind(redisClient);

const ses = new aws.SES({ region: "us-east-1" });

// const REGION = "us-east-1";
aws.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAYWHJYBGFEXWVQ7MM",
  secretAccessKey: "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",
});

async function sendEmail(mailOptions) {
    try {
      const data = await ses.sendEmail(mailOptions).promise();
      console.log("Message sent: %s", data.MessageId);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
};


module.exports.get_all_order = async (req, res) => {
    try {

        let data = req.query;

        if (req.query) {
            const { userId, status } = req.query;

            if (userId) {
                data["userId"] = userId ;
            }
            if (status) {
                data["status"] = { $regex: status.trim(),$options: "i" };
            }

        }

        let get_order;
        const collectionName = "orders"; // Specify the collection name dynamically
        const redisData = JSON.stringify({ collection: collectionName, ...req.query });

        // const redisData = JSON.stringify(req.query);

        // Fetch data from MongoDB if not found in Redis cache
        get_order = await order_Model.find(data).sort({ createdAt: -1 });

        // Cache the data in Redis
        await SET_ASYNC(redisData, JSON.stringify(get_order));


        return res.status(200).send({ status: true, message: 'Get Successfully', data: get_order });



    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
};

module.exports.get_order = async (req, res) => {
    try {

        const { order_Id, user_Id} = req.params;

        if (!validator.isValidObjectId(order_Id)) {
            return res.status(400).send({ status: false, message: "Invalid order_Id not provided" })
        }
        // if (!(validator.isValidObjectId(req.params))) {
        //     return res.status(400).send({ status: false, message: "Please provide a req.params" })
        // }
        const collectionName = "orders"; // Specify the collection name dynamically
        const redisData = JSON.stringify({ collection: collectionName, ...req.params });


        const data = await order_Model.findOne({ _id: order_Id })
        if (!data || !data.length === 0) {
            return res.status(400).send({ status: false, message: "order Not Found" })
        }
        await SET_ASYNC(redisData, JSON.stringify(data));

        return res.status(200).send({ status: true, message: ' Get Successfully', data })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
};




module.exports.delete_order = async (req, res) => {
    try {

        const { order_Id } = req.params;
        if (!(validator.isValidObjectId(order_Id))) {
            return res.status(400).send({ status: false, message: "order_Id not valid" })
        }

        const order = await order_Model.deleteOne({ _id: order_Id });
        if (order.deletedCount == 0) {
            return res.status(400).send({ status: false, message: "order Not Found" })
        }

        res.status(200).send({ status: true, data: "Deleted sucessfully" })

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
};


module.exports.totalSale = async (req, res) => {
    try {
        const {user_Id}  = req.params
        if (!(validator.isValidObjectId(user_Id))) {
            return res.status(400).send({ status: false, message: "Please provide a user_Id" })
        }
      const userData = await order_Model.find({ userId: user_Id});
  
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  
      let total_Sale = 0
      let total_Cancelled = 0;
      let total_Delivered = 0;

        const result = {
          user_Id,  
          total_Sale,
          total_Cancelled,
          total_Delivered,
          Product_bar : {},
          status_bar : {}
        };
  
        for (const data of userData) {
          const productId = data?.productId;
          const productData = await product_Model.findOne({ _id: productId });
          const status = data.status

          const createYear = moment(data.createdAt).format('YYYY');
          const createMonth = moment(data.createdAt).format('MM');
  
          const monthName = months[parseInt(createMonth, 10) - 1];
  

           // Increment the total count
           if (status === 'delivered' || status === 'Delivered') {
            total_Sale += 1;
        }

         /// Increment counts based on order status
         if (status === 'cancelled' || status === 'Cancelled'  ) {
            total_Cancelled += 1;
        } else if (status === 'delivered'|| status === 'Delivered') {
            total_Delivered += 1;
        }

        // product
        const productName = productData?.product_Name;

          // product
          if (productName) {
            if (!result.Product_bar[productName]) {
                result.Product_bar[productName] = {};
            }

            if (!result.Product_bar[productName][createYear]) {
                result.Product_bar[productName][createYear] = {};
            }

            if (!result.Product_bar[productName][createYear][monthName]) {
                result.Product_bar[productName][createYear][monthName] = {
                    total_Product_Order: 0,
                };
            }
            result.Product_bar[productName][createYear][monthName].total_Product_Order += 1;

        }


          // status
          if (!result.status_bar[status]) {
            result.status_bar[status]= {};
          }
  
          if (!result.status_bar[status][createYear]) {
            result.status_bar[status][createYear] = {};
          }
  
          if (!result.status_bar[status][createYear][monthName]) {
            result.status_bar[status][createYear][monthName] = {
                total_Order_Status: 0,
            }; 
          }
  
          // Update the counts based on order status
          result.status_bar[status][createYear][monthName].total_Order_Status += 1;
          result.total_Sale = total_Sale;
          result.total_Cancelled = total_Cancelled;
          result.total_Delivered = total_Delivered;
        };

       return  res.status(200).send({ status: true,message: "Success",result});
  
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  


module.exports.total_Product_Sale = async (req, res) => {
    try {
        const userData = await order_Model.find();

        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

        let total_Sale = 0;

        const result = {
            total_Sale,
            Product_bar: {},
          
        };

        for (const data of userData) {
            const productId = data?.productId;
            const productData = await product_Model.findOne({ _id: productId }); // Assuming you have a 'productId' field in your product model

            const status = data.status;

            const createYear = moment(data.createdAt).format('YYYY');
            const createMonth = moment(data.createdAt).format('MM');

            const monthName = months[parseInt(createMonth, 10) - 1];

            if (status === 'delivered') {
                total_Sale += 1;
            }

            // product
            const productName = productData?.product_Name;

            // Check if productName is defined before updating the counts
            if (productName) {
                if (!result.Product_bar[productName]) {
                    result.Product_bar[productName] = {};
                }

                if (!result.Product_bar[productName][createYear]) {
                    result.Product_bar[productName][createYear] = {};
                }

                if (!result.Product_bar[productName][createYear][monthName]) {
                    result.Product_bar[productName][createYear][monthName] = {
                        total_Product_Order: 0,
                    };
                }

                // Update the counts based on order status
                result.total_Sale = total_Sale;       
                result.Product_bar[productName][createYear][monthName].total_Product_Order += 1;
            }
        }

        return  res.status(200).send({ status: true,message: "Success",result});

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



  


