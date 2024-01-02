
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mongoose = require("mongoose");
const port = process.env.PORT || 7065;
const path = "/api/v1";

const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.use('/api-Ecomm', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));



const userRoutes = require("./router/userRouter");
const productRoutes = require ("./router/productRouter");
const orderRoutes = require("./router/orderRouter");

app.use(path, userRoutes);
app.use(path, productRoutes);
app.use(path, orderRoutes);


app.get('/test', (req, res) => {
  res.status(200).json('Welcome, your app is working well 1222');
})


mongoose
    .connect(`mongodb+srv://atomostech:jJ2uTdOgJUo4OC1s@mailbusterdb.euwbymg.mongodb.net/E-commers-project`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
    })
.then((res) => { console.log(`Connected to MongoDB ${port}`); })
.catch((err) => console.log("Mongo database connection error occur", err));

app.use((err, req, res, next) => {
    res.status(401).send({ success: false, message: err.message });
  });
  const server = app.listen(port, () => {
    console.log(`app is up and running on ${port}`);
  });

  module.exports = server;

  module.exports = app