
const aws = require("aws-sdk");
const user_Model = require("../model/userModel")
const order_Model = require("../model/orderModel")
const product_Model = require("../model/productModel");
const validator = require("../validator/validator")


const ses = new aws.SES({ region: "us-east-1" });
AWS_SDK_LOAD_CONFIG = 1

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
}

module.exports.add_order = async (req, res) => {
    try {
      const {user_Id} = req.params;

        // const { userId, productId, quantity, shipping_address } = req.body
        const { productId, quantity, shipping_address } = req.body

        // req.body
        if (!validator.isValidObject(req.body)) {
            return res.status(400).send({ status: false, message: "Plaese Provide all required field" })
        }
        // user_Id
        if (!(validator.isValidObjectId(user_Id))) {
            return res.status(400).send({ status: false, message: "Please provide a user_Id" })
        }

        //product_id
        if (!(validator.isValidObjectId(productId))) {
            return res.status(400).send({ status: false, message: "Please provide a valid productId" })
        }

         // quantity
         if (!validator.isValid(quantity)) {
          return res.status(400).send({ message: "quantity is not present in body" })
      }
         if(!(validator.isValidNumber(quantity))){
            return res.status(400).send({ status: false, message: "Please Provide valid quantity, do not enter character" })
        }
      

        // shipping_address
        if (!shipping_address || !(validator.isValidObject(shipping_address))) {
            return res.status(400).send({ message: "shipping_address is not present in body" })
        }

        let order_create = await order_Model.create({ ...req.body , userId:user_Id });

        // Get user details
        const userName = await user_Model.findById(user_Id)
        
        if (!userName || !userName.length === 0) {
            return res.status(400).send({ status: false, message: "user_Id Not Found" })
        }
        const product = await product_Model.findById(productId)
        if (!product || !product.length === 0) {
            return res.status(400).send({ status: false, message: "productId Not Found" })
        }
        // Update the user document with the order _id
        await user_Model.findByIdAndUpdate(user_Id, { $push: { orders: order_create?._id } });

        try {

            // Send an email
            console.log("Here is the Code")
            const mailOptions = {
              Source: `no-reply@atomostech.com`,
              Destination: {
                // ToAddresses: [`prachisingh281599@gmail.com`], // Use an array for the ToAddresses
                    ToAddresses: [`${userName?.email}`], // Use an array for the ToAddresses

              },
              Message: {
                  Subject: {
                      Data: `Order ${order_create?.status} for ${userName?.userName}`,
                  },
                  Body: {
                    Html: {
                      Data:
                       `<!DOCTYPE html>
                       <html lang="en">
                         <head>
                           <meta charset="UTF-8" />
                           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                           <title> Order Confirmation for ${userName?.userName}</title>

                       <style>
                         * {
                         box-sizing: border-box;
                         padding: 0;
                         margin: 0;
                         font-family: "Poppins", sans-serif;
                       }

                       .container {
                         background-color: #fff;
                         padding: 32px;
                         width: 800px;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         margin: 2em auto;
                       }

                       .emailBody {
                         padding: 2em 10em 2em 5em;
                       }

                       .emailBody .logo {
                         width: 250px;
                         margin-left: -1em;
                       }

                       .emailBody .introText {
                         font-size: 25px;
                         font-weight: 600;
                         padding-right: 4em;
                         margin-bottom: 1em;
                         color: #333;
                       }

                       .introDesc {
                         font-size: 15px;
                       }

                       .introDesc strong {
                         font-weight: 600;
                       }

                       .introDesc p {
                         margin: 1em 0;
                         line-height: 28px;
                       }

                       .services h2 {
                         font-weight: 600;
                         font-size: 22px;
                         margin-bottom: 2em;
                         margin-top: 1em;
                         color: #333;
                       }

                       .servicesFlex {
                         display: flex;
                         gap: 1em;
                         align-items: center;
                         margin-bottom: 1em;
                       }

                       .servicesFlex h3 {
                         font-weight: 600;
                         font-size: 20px;
                       }

                       .servicesFlex p {
                         font-size: 14px;
                       }
                       .servicesFlex img {
                          height: 30px;
                          margin-right:1em;
                        }

                       .nextSteps {
                         margin-top: 2em;
                       }

                       .nextSteps a {
                         color: darkgreen;
                         text-decoration: none;
                       }

                       .emailBody footer {
                         margin-top: 2em;
                       }

                       .emailBody footer a {
                         text-decoration: none;
                       }

                       .emailBody footer .introFooterLogo {
                         width: 80px;
                         margin-right: 16em;
                       }

                       .emailBody .introFooter section img {
                         width: 30px;
                         margin-right: 1em;
                       }

                       .introFooter {
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                       }

                       .address {
                         margin: 1.5em 0;
                       }

                       .address h4 {
                         font-weight: 600;
                         margin-bottom: 0.3em;
                       }

                       .address a {
                         color: #1765dc;
                       }

                       .address p {
                         line-height: 25px;
                       }

                       .rights {
                         font-size: 15px;
                       }

                       </style>
                         </head>
                         <body>
                         <div>
                             <h2>Thank you for your order, ${userName.userName}!</h2>
                             <p>Your order details:</p>
                             <ul>
                                 <li>Product: ${product?.product_Name}</li>
                                 <li>Category: ${product?.category}</li>
                                 <li>Quantity: ${order_create?.quantity}</li>
                                 <li>Total Amount: ${product?.price}</li>
                             </ul>
                             <p>We will process your order and notify you once it's shipped.</p>
                             <p>Thank you for shopping with us!</p>
                         </div>
                     </body>
                       </html>
                       `,
                      Charset: "UTF-8",
                    },
                  },
                },
            };
            await sendEmail(mailOptions);
            return res.status(201).json({
                success: true,
                message: "Created Order successfully and email sent",
                order_create
            });



        //     return res.status(201).json({
        //       success: true,
        //       message: "email sent successfully",
        //       data: order_create
        // // return res.status(201).send({ status: true, data: order_create })

        //     });

          } catch (error) {
            console.error(error);
            return res.status(500).json({
              success: false,
              message: "An error occurred",
              error: error.message,
            });
          }

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
};



module.exports.update_order = async (req, res) => {
  try {

    const { status } = req.body
    const { order_Id } = req.params;
    if (!(validator.isValidObjectId(order_Id))) {
      return res.status(400).send({ status: false, message: "order_Id not valid" })
    }

    //  status
    if (!validator.isValidString(status)) {
      return res.status(400).send({ status: false, message: "Please Provide status" })
    }
    if (!validator.isValidString(status)) {
      return res.status(400).send({ status: false, message: "Please Provide valid status, do not enter numbers" })
    }

    const order = await order_Model.findOne({ _id: order_Id })
    if (!order) {
      return res.status(400).send({ status: false, message: "order Not Found" })
    }

    if (order.status === 'delivered' || order.status === 'cancelled' || order.status === 'Delivered' || order.status === 'Cancelled') {
      return res.status(400).send({ status: false, message: "Order cannot be canceled. It's already Delivered or Cancelled" });
    }
    // Update the order status
    const updatedOrder = await order_Model.findByIdAndUpdate(order_Id, { status: status }, { new: true }).populate([
      {
        path: "productId",
        select: "product_Name category price image_URL",
      },
      {
        path: "userId",
        select: "userName email address",
      }
    ]);



    const userName = await user_Model.findById(order?.userId)
    if (!userName || !userName.length === 0) {
      return res.status(400).send({ status: false, message: "user Not Found" })
    }

    const product = await product_Model.findById(order?.productId)
    if (!product || !product.length === 0) {
      return res.status(400).send({ status: false, message: "product Not Found" })
    }
    try {

      // Send an email
      console.log("Here is the Code")
      const mailOptions = {
        Source: `no-reply@atomostech.com`,
        Destination: {
          ToAddresses: [`${userName?.email}`], // Use an array for the ToAddresses
          // ToAddresses: [`prachisingh281599@gmail.com`], // Use an array for the ToAddresses
        },
        Message: {
          Subject: {
            Data: `Order ${updatedOrder?.status} for ${userName?.userName}`,
          },
          Body: {
            Html: {
              Data:
                `<!DOCTYPE html>
                       <html lang="en">
                         <head>
                           <meta charset="UTF-8" />
                           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                           <title> Order Confirmation for ${userName?.userName}</title>
                           
                       <style>
                         * {
                         box-sizing: border-box;
                         padding: 0;
                         margin: 0;
                         font-family: "Poppins", sans-serif;
                       }
                       
                       .container {
                         background-color: #fff;
                         padding: 32px;
                         width: 800px;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         margin: 2em auto;
                       }
                       
                       .emailBody {
                         padding: 2em 10em 2em 5em;
                       }
                       
                       .emailBody .logo {
                         width: 250px;
                         margin-left: -1em;
                       }
                       
                       .emailBody .introText {
                         font-size: 25px;
                         font-weight: 600;
                         padding-right: 4em;
                         margin-bottom: 1em;
                         color: #333;
                       }
                       
                       .introDesc {
                         font-size: 15px;
                       }
                       
                       .introDesc strong {
                         font-weight: 600;
                       }
                       
                       .introDesc p {
                         margin: 1em 0;
                         line-height: 28px;
                       }
                       
                       .services h2 {
                         font-weight: 600;
                         font-size: 22px;
                         margin-bottom: 2em;
                         margin-top: 1em;
                         color: #333;
                       }
                       
                       .servicesFlex {
                         display: flex;
                         gap: 1em;
                         align-items: center;
                         margin-bottom: 1em;
                       }
                       
                       .servicesFlex h3 {
                         font-weight: 600;
                         font-size: 20px;
                       }
                       
                       .servicesFlex p {
                         font-size: 14px;
                       }
                       .servicesFlex img {
                          height: 30px;
                          margin-right:1em;
                        }
                       
                       .nextSteps {
                         margin-top: 2em;
                       }
                       
                       .nextSteps a {
                         color: darkgreen;
                         text-decoration: none;
                       }
                       
                       .emailBody footer {
                         margin-top: 2em;
                       }
                       
                       .emailBody footer a {
                         text-decoration: none;
                       }
                       
                       .emailBody footer .introFooterLogo {
                         width: 80px;
                         margin-right: 16em;
                       }
                       
                       .emailBody .introFooter section img {
                         width: 30px;
                         margin-right: 1em;
                       }
                       
                       .introFooter {
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                       }
                       
                       .address {
                         margin: 1.5em 0;
                       }
                       
                       .address h4 {
                         font-weight: 600;
                         margin-bottom: 0.3em;
                       }
                       
                       .address a {
                         color: #1765dc;
                       }
                       
                       .address p {
                         line-height: 25px;
                       }
                       
                       .rights {
                         font-size: 15px;
                       }
                       
                       </style>
                         </head>
                         <body>
                         <div>
                             <h2>Thank you for your order, ${userName?.userName}!</h2>
                             <p>Your order details:</p>
                             <ul>
                                 <li>Product: ${product?.product_Name}</li>
                                 <li>Category: ${product?.category}</li>
                                 <li>Quantity: ${updatedOrder?.quantity}</li>
                                 <li>Total Amount: ${product?.price}</li>
                             </ul>
                             <p>We will process your order and notify you once it's delivered .</p>
                             <p>Thank you for shopping with us!</p>
                         </div>
                     </body>
                       </html>
                       `,
              Charset: "UTF-8",
            },
          },
        },
      };
      await sendEmail(mailOptions);
      return res.status(200).json({
        success: true,
        message: "Order updated successfully and email sent",
        data: updatedOrder,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });

  }
};

module.exports.update_order_ByUser = async (req, res) => {
  try {

    const { order_Id, user_Id } = req.params;

    // order_Id
    if (!(validator.isValidObjectId(order_Id))) {
      return res.status(400).send({ status: false, message: "order_Id not valid" })
    }

    // user Id
    if (!validator.isValidObjectId(user_Id)) {
      return res.status(400).send({ status: false, message: "userId not valid" })
    }

    const order = await order_Model.findOne({ _id: order_Id, userId: user_Id })
    if (!order) {
      return res.status(400).send({ status: false, message: "order Not Found" })
    }

    const userName = await user_Model.findById(user_Id)


    if (!userName || !userName.length === 0) {
      return res.status(400).send({ status: false, message: "user Not Found" })
    }
    const product = await product_Model.findById(order?.productId)
    if (!product || !product.length === 0) {
      return res.status(400).send({ status: false, message: "product Not Found" })
    }

    // Check if the current order status allows cancellation
    if (order.status === 'delivered' || order.status === 'cancelled' || order.status === 'Delivered' || order.status === 'Cancelled') {
      return res.status(400).send({ status: false, message: "Order cannot be cancelled. It's already Delivered or cancelled" });
    }
    // Update the order status to 'canceled'
    const updatedOrder = await order_Model.findByIdAndUpdate(
      order_Id,
      { status: 'cancelled' },
      // {status: status},
      { new: true }
    ).populate([
      {
        path: "productId",
        select: "product_Name category price image_URL",
      },
      {
        path: "userId",
        select: "userName email address",
      }
    ]);

    try {

      // Send an email
      console.log("Here is the Code")
      const mailOptions = {
        Source: `no-reply@atomostech.com`,
        Destination: {
          ToAddresses: [`${userName?.email}`], // Use an array for the ToAddresses
          // ToAddresses: [`prachisingh281599@gmail.com`], // Use an array for the ToAddresses
        },
        Message: {
          Subject: {
            Data: `Order ${updatedOrder?.status} for ${userName?.userName}`,
          },
          Body: {
            Html: {
              Data:
                `<!DOCTYPE html>
                           <html lang="en">
                             <head>
                               <meta charset="UTF-8" />
                               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                               <title> Order Confirmation for ${userName?.userName}</title>
                               
                           <style>
                             * {
                             box-sizing: border-box;
                             padding: 0;
                             margin: 0;
                             font-family: "Poppins", sans-serif;
                           }
                           
                           .container {
                             background-color: #fff;
                             padding: 32px;
                             width: 800px;
                             display: flex;
                             justify-content: center;
                             align-items: center;
                             margin: 2em auto;
                           }
                           
                           .emailBody {
                             padding: 2em 10em 2em 5em;
                           }
                           
                           .emailBody .logo {
                             width: 250px;
                             margin-left: -1em;
                           }
                           
                           .emailBody .introText {
                             font-size: 25px;
                             font-weight: 600;
                             padding-right: 4em;
                             margin-bottom: 1em;
                             color: #333;
                           }
                           
                           .introDesc {
                             font-size: 15px;
                           }
                           
                           .introDesc strong {
                             font-weight: 600;
                           }
                           
                           .introDesc p {
                             margin: 1em 0;
                             line-height: 28px;
                           }
                           
                           .services h2 {
                             font-weight: 600;
                             font-size: 22px;
                             margin-bottom: 2em;
                             margin-top: 1em;
                             color: #333;
                           }
                           
                           .servicesFlex {
                             display: flex;
                             gap: 1em;
                             align-items: center;
                             margin-bottom: 1em;
                           }
                           
                           .servicesFlex h3 {
                             font-weight: 600;
                             font-size: 20px;
                           }
                           
                           .servicesFlex p {
                             font-size: 14px;
                           }
                           .servicesFlex img {
                              height: 30px;
                              margin-right:1em;
                            }
                           
                           .nextSteps {
                             margin-top: 2em;
                           }
                           
                           .nextSteps a {
                             color: darkgreen;
                             text-decoration: none;
                           }
                           
                           .emailBody footer {
                             margin-top: 2em;
                           }
                           
                           .emailBody footer a {
                             text-decoration: none;
                           }
                           
                           .emailBody footer .introFooterLogo {
                             width: 80px;
                             margin-right: 16em;
                           }
                           
                           .emailBody .introFooter section img {
                             width: 30px;
                             margin-right: 1em;
                           }
                           
                           .introFooter {
                             display: flex;
                             justify-content: space-between;
                             align-items: center;
                           }
                           
                           .address {
                             margin: 1.5em 0;
                           }
                           
                           .address h4 {
                             font-weight: 600;
                             margin-bottom: 0.3em;
                           }
                           
                           .address a {
                             color: #1765dc;
                           }
                           
                           .address p {
                             line-height: 25px;
                           }
                           
                           .rights {
                             font-size: 15px;
                           }
                           
                           </style>
                             </head>
                             <body>
                             <div>
                                 <h2>Thank you for your order, ${userName?.userName}!</h2>
                                 <p>Your order details:</p>
                                 <ul>
                                     <li>Product: ${product?.product_Name}</li>
                                     <li>Category: ${product?.category}</li>
                                     <li>Quantity: ${updatedOrder?.quantity}</li>
                                     <li>Total Amount: ${product?.price}</li>
                                 </ul>
                                 <p>We will process your cancelled your order .</p>
                                 <p>Thank you for shopping with us!</p>
                             </div>
                         </body>
                           </html>
                           `,
              Charset: "UTF-8",
            },
          },
        },
      };
      await sendEmail(mailOptions);
      return res.status(200).json({
        success: true,
        message: 'Order canceled successfully and email sent ',
        data: updatedOrder,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }

  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });

  }
};


