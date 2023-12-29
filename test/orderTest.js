const chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

const jwt = require('jsonwebtoken');
const secretKey = 'hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123';
const user_Id = "658c533941d730477b31529b"

chai.should();
chai.use(chaiHttp);

// ctreate order API (add_order)
describe(" Order API testing ", () => {
    describe("POST /api/v1/create/order/add-order/:user_Id", () => {
        it(" POST Order body not provided", (done) => {
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/create/order/add-order/" + user_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Plaese Provide all required field");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Order user_Id not provided correct", (done) => {
            const data = {
                productId: "658be1b47d2f886a923c69b5",
                quantity: "78",
                shipping_address: "j"
            }
            const user_Id = "658be1b47d2f886a923c69"
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/create/order/add-order/" + user_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please provide a user_Id' );

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Order shipping_addressnot provided correct", (done) => {
            const data = {
                productId: "65840fe27575ae4c374bf07f",
                quantity: "78",
            }
            const user_Id = "658be0557d2f886a923c69a7"
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/create/order/add-order/" + user_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('shipping_address is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Order quantity not provided correct", (done) => {
            const data = {
                productId: "65840fe27575ae4c374bf07f",
                shipping_address: "j"
            }
            const user_Id = "658be0557d2f886a923c69a7"
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/create/order/add-order/" + user_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('quantity is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Order quantity not provided correct correct format", (done) => {
            const data = {
                productId: "65840fe27575ae4c374bf07f",
                shipping_address: "j",
                quantity : "jdkdk"

            }
            const user_Id = "658be0557d2f886a923c69a7"
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/create/order/add-order/" + user_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid quantity, do not enter character");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
   
    });

    // // get Order By ID API(get_order)
    describe("GET /api/v1/order/get-order/:order_Id/:user_Id", () => {
        it(" GET Order Id not correct", (done) => {
            const order_Id = "6583cb00a001ca63c74";  // order_Id length is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .get("/api/v1/order/get-order/" + order_Id + '/'+ user_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        // console.log("ress", response);

                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Invalid order_Id not provided");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });


    // // UPDATE ORDERAPI(update_order)
    describe("PUT /api/v1//order/update-order/:order_Id", () => {
        it("PUT order_Id is not provided correct", (done) => {
            const order_Id = "656597a9a08d38ee";  // order_Id length is not correct
            const data = {
                status: "pendings"
            }
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .put("/api/v1/order/update-order/" + order_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("order_Id not valid");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it("PUT order_Id not found ", (done) => {
            const order_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
            const data = {
                status: "pendings"
            }
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .put("/api/v1/order/update-order/" + order_Id)
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('order Not Found');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });

    
    });

     // UPDATE ORDER STATUS BY USER API(update_order_ByUser)
     describe("PUT /order/update-order_user/:user_Id/:order_Id", () => {
        it("PUT order_Id is not provided correct", (done) => {
            const order_Id = "656597a9a08d38ee";  // order_Id length is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .put("/api/v1/order/update-order_user/" + user_Id +'/' + order_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        // console.log("ress", response);

                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("order_Id not valid");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it("PUT order_Id not found ", (done) => {
            const order_Id = "658d263620f5a28dcfff2e40";  // Id is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
            .put("/api/v1/order/update-order_user/" + user_Id +'/' + order_Id)
            .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('order Not Found');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it("PUT user_Id is not provided correct", (done) => {
            const order_Id = "658d263620f5a28dcfff2e41";   
            const user_Id =  "656597a9a08d38ee"  // order_Id length is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
            .put("/api/v1/order/update-order_user/" + user_Id +'/' + order_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("userId not valid");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it("PUT user_Id not found ", (done) => {
            const order_Id = "658d263620f5a28dcfff2e41";  
            const user_Id = "658d263620f5a28dcfff2e49"  // Id is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
            .put("/api/v1/order/update-order/" + user_Id +'/' + order_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        // response.should.have.status(400);
                        // response.body.should.have.property('message').eq('userId not valid');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });

    // DELETE PRODUCT API(delete_product)
    describe("DELETE /api/v1/order/delete-order/:order_Id", () => {
        it("DELETE product_Id is not provided correct", (done) => {
            const order_Id = "656597a9a08d38ee";  // Id length is not correct
            const token = jwt.sign({ userId: user_Id, profile: 'admin' }, secretKey);
            chai.request(server)
                .delete("/api/v1/order/delete-order/" + order_Id)
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("order_Id not valid");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        // it("DELETE product_Id not found ", (done) => {
        //     const order_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
        //     chai.request(server)
        //         .delete("/api/v1/order/delete-order/" + order_Id)
        //         .end((err, response) => {
        //             try {
        //                 console.log("ress", response.body);

        //                 response.should.have.status(400);
        //                 response.body.should.have.property('message').eq('product Not Found');

        //                 done();
        //             } catch (error) {
        //                 done(error);
        //             }
        //         });
        // });
    });

});

