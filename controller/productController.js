
const validator = require("../validator/validator");
const product_Model = require("../model/productModel");
const { model } = require("mongoose");

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


module.exports.add_product = async (req, res) => {
    try {
        const data = req.body
        const { product_Name, description, category, price, stock, image_URL } = data;
        if (!validator.isValidObject(req.body)) {
            return res.status(400).send({ status: false, message: "please fill all required fields" })
        }

        // product_Name
        if (!validator.isValid(product_Name)) {
            return res.status(400).send({ status: false, message: "Please Provide product_Name" })
        }
        if (!validator.isValidString(product_Name)) {
            return res.status(400).send({ status: false, message: "Please Provide valid product_Name, do not enter numbers" })
        }

        // description
        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, message: "Please Provide description" })
        }
        if (!validator.isValidString(description)) {
            return res.status(400).send({ status: false, message: "Please Provide valid description, do not enter numbers" })
        }

        // category
        if (!validator.isValid(category)) {
            return res.status(400).send({ status: false, message: "Please Provide category" })
        }
        if (!validator.isValidString(category)) {
            return res.status(400).send({ status: false, message: "Please Provide valid category, do not enter numbers" })
        }

        // price
        if (!validator.isValid(price)) {
            return res.status(400).send({ status: false, message: "Please Provide price" })
        } if(!(validator.isValidNumber(price))){
            return res.status(400).send({ status: false, message: "Please Provide valid price, do not enter character" })
        }
        
        // stock
        if (!validator.isValid(stock)) {
            return res.status(400).send({ status: false, message: "Please Provide stock" })
        }
        if(!(validator.isValidNumber(stock))){
            return res.status(400).send({ status: false, message: "Please Provide valid stock, do not enter character" })
        }


        // image_URL
        if (!validator.isValid(image_URL)) {
            return res.status(400).send({ status: false, message: "Please Provide image_URL" })
        }

        const product = await product_Model.create(req.body);
        return res.status(201).send({ status: true, message: 'Success', data: product })

    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });

    }
};


module.exports.get_all_product = async (req, res) => {
    try {
        let data = req.query;
        const { product_Name, description, category, price , stock} = req.query;
        
        if (req.query) {
        

            if (product_Name) {
                data["product_Name"] = { $regex: product_Name.trim(),$options: "i" };
            }

            if (description) {
                data["description"] = { $regex: description.trim(),$options: "i" };
            }

            if (category) {
                data["category"] = { $regex: category.trim(),$options: "i" };
            }

            if (price) {
                data["price"] = price;
            }

            if (stock) {
                data["stock"] = stock;
            }
        }

        let get_product;


        const collectionName = "products"; // Specify the collection name dynamically
        const redisKey = JSON.stringify({ collection: collectionName, ...req.query });
               
            // Fetch data from MongoDB if not found in Redis cache
            get_product = await product_Model.find(data).sort({ price: -1 });

            // Cache the data in Redis
            await SET_ASYNC(redisKey, JSON.stringify(get_product));

        return res.status(200).send({ status: true, message: 'Get Successfully', data: get_product });
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.get_product_byId = async (req, res) => {
    try {

        const { product_Id } = req.params;
        if (!validator.isValidObjectId(product_Id)) {
            return res.status(400).send({ status: false, message: "product_Id not valid" })
        }

        const collectionName = "products"; // Specify the collection name dynamically
        const redisData = JSON.stringify({ collection: collectionName, ...req.params });

        // // Check if the data is already cached in Redis
        // const cachedDatas = await GET_ASYNC(redisData);

        // if (cachedDatas) {
        //     console.log("Data retrieved from Redis cache");
        //     get_order = JSON.parse(cachedDatas);
        // }

        const data = await product_Model.findOne({ _id: product_Id })
        if (!data || !data.length === 0) {
            return res.status(400).send({ status: false, message: "product Not Found" })
        }

        await SET_ASYNC(redisData, JSON.stringify(data));

        return res.status(200).send({ status: true, message: ' Get Successfully', data })


    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });

    }
};

module.exports.update_product_ById = async (req, res) => {
    try {

        const { product_Id } = req.params;
        const { product_Name, description, category, price, stock, image_URL } = req.body
        const update_Product_Data = {};

         // product_id
         if (!(validator.isValidObjectId(product_Id))) {
            return res.status(400).send({ status: false, message: "product_Id not valid" })
        }

        // product_Name
        if (!validator.isValidString(product_Name)) {
            return res.status(400).send({ status: false, message: "Please Provide valid product_Name, do not enter numbers" })
        }

        //  description
        if (!validator.isValidString(description)) {
            return res.status(400).send({ status: false, message: "Please Provide valid description, do not enter numbers" })
        }

        //category
        if (!validator.isValidString(category)) {
            return res.status(400).send({ status: false, message: "Please Provide valid category, do not enter numbers" })
        }

        // price
        if(!(validator.isValidNumber(price))){
            return res.status(400).send({ status: false, message: "Please Provide valid price, do not enter character" })
        }

        // stock
        if(!(validator.isValidNumber(stock))){
            return res.status(400).send({ status: false, message: "Please Provide valid stock, do not enter character" })
        }


        // update data
        if (validator.isValid(product_Name)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['product_Name'] = product_Name
        }
        if (validator.isValid(description)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['description'] = description
        }
        if (validator.isValid(category)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['category'] = category
        }
        if (validator.isValid(price)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['price'] = price
        }
        if (validator.isValid(stock)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['stock'] = stock
        }
        if (validator.isValid(image_URL)) {
            if (!Object.prototype.hasOwnProperty.call(update_Product_Data, '$set')) update_Product_Data['$set'] = {}
            update_Product_Data['$set']['image_URL'] = image_URL
        }

        const product = await product_Model.findOneAndUpdate({ _id: product_Id }, update_Product_Data, { new: true })
        if (!product || product.length === 0) {
            return res.status(400).send({ status: false, message: "product Not Found" })
        }

        res.status(200).send({ status: true, message: 'updated successfully', product })


    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });

    }
};


module.exports.delete_product = async (req, res) => {
    try {

        const { product_Id } = req.params;
        if (!(validator.isValidObjectId(product_Id))) {
            return res.status(400).send({ status: false, message: "Invalid product_Id provided" })
        }

        const product = await product_Model.deleteOne({ _id: product_Id });
        if (product.deletedCount == 0) {
            return res.status(400).send({ status: false, message: "product Not Found" })
        }

        res.status(200).send({ status: true, data: "Deleted sucessfully" })

    } catch (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });

    }
};


