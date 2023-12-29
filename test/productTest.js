const chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

const jwt = require('jsonwebtoken');
const secretKey = 'hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123';
const userId = "658be8420de2bebada7615e8"

chai.should();
chai.use(chaiHttp);

// ctreate product API (add_product)
describe(" Product API testing ", () => {
    describe("POST /api/v1/add-product/product", () => {
        it(" POST Product body not provided", (done) => {
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("please fill all required fields");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product product_Name not provided", (done) => {
            const data = {
                description: "very good mobile",
                category: "tab",
                price: "8900",
                stock: "8",
                image_URL: "jkkkoo"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide product_Name');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product description not provided", (done) => {
            const data = {
                product_Name: "Mobile",
                category: "tab",
                price: "8900",
                stock: "8",
                image_URL: "jkkkoo"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide description');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product category not provided", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                price: "8900",
                stock: "8",
                image_URL: "jkkkoo"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide category');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product price not provided", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab",
                stock: "8",
                image_URL: "jkkkoo"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide price');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product stock not provided", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab",
                price: "8900",
                image_URL: "jkkkoo"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide stock');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product image_URL not provided", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab",
                price: "8900",
                stock: "8",
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('Please Provide image_URL');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product product_Name not provided correct format", (done) => {
            const data = {
                product_Name: "Mobile1",
                description: "very good mobile",
                category: "tab",
                price: "8900",
                stock: "8",
                image_URL : "hdkks"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid product_Name, do not enter numbers");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product description not provided correct format", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile 55",
                category: "tab",
                price: "8900",
                stock: "8",
                image_URL : "hdkks"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid description, do not enter numbers");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product category not provided correct format", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab22",
                price: "8900",
                stock: "8",
                image_URL : "hdkks"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid category, do not enter numbers");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product price not provided correct format", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab",
                price: "8900rr",
                stock: "8",
                image_URL : "hdkks"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid price, do not enter character");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Product stock not provided correct format", (done) => {
            const data = {
                product_Name: "Mobile",
                description: "very good mobile",
                category: "tab",
                price: "8900",
                stock: "8ff",
                image_URL : "hdkks"
            }
            const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
            chai.request(server)
                .post("/api/v1/add-product/product")
                .set('Authorization', `${token}`)
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Please Provide valid stock, do not enter character");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });

    });

        // get product By ID API(get_product_byId)
        describe("GET /api/v1/product/get-product/:product_Id", () => {
            it(" GET Product Id not correct", (done) => {
                const product_Id = "6583cb00a001ca63c74";  // product_Id length is not correct
                chai.request(server)
                    .get("/api/v1/product/get-product/" + product_Id)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);
                            // console.log("ress", response);
                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("product_Id not valid");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it(" GET product_Id not found ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // product_Id is not correct
                chai.request(server)
                    .get("/api/v1/product/get-product/" + product_Id)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);    
                            response.should.have.status(400);
                            response.body.should.have.property('status').eq(false)
                            response.body.should.have.property('message').eq('product Not Found');

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
        });



        // UPDATE USER INFO API(update_user)
        describe("PUT /api/v1//product/update-product/:product_Id", () => {
            it("PUT product_Id is not provided correct", (done) => {
                const product_Id = "656597a9a08d38ee";  // product_Id length is not correct
                const data = {
                    product_Name: "mobioles",
                    description: " samung",
                    category: "samung",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("product_Id not valid");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT product_Name not found  correct format", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles67",
                    description: " samung",
                    category: "samung",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid product_Name, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT description not found correct format", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles",
                    description: " samung89",
                    category: "samung",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);
                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid description, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT category not found ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles",
                    description: " samung",
                    category: "samung09",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid category, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT Product product_Name not provided correct format ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles77",
                    description: " samung",
                    category: "samung",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid product_Name, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT Product description not provided correct format ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles",
                    description: " samung88",
                    category: "samung",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid description, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("PUT Product category not provided correct format ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const data = {
                    product_Name: "mobioles",
                    description: " samung",
                    category: "samung09",
                    price: "899",
                    stock: "8700",
                    image_URL: "k99dj"
                }
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .put("/api/v1/product/update-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid category, do not enter numbers");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it(" POST Product price not provided correct format", (done) => {
                const data = {
                    product_Name: "Mobile",
                    description: "very good mobile",
                    category: "tab",
                    price: "8900jk",
                    stock: "8",
                    image_URL : "hdkks"
                }
                const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
                chai.request(server)
                    .post("/api/v1/add-product/product")
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        // console.log("ress", response.body);
                        try {
                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid price, do not enter character");
    
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it(" POST Product stock not provided correct format", (done) => {
                const data = {
                    product_Name: "Mobile",
                    description: "very good mobile",
                    category: "tab",
                    price: "8900",
                    stock: "8ff",
                    image_URL : "hdkks"
                }
                const token = jwt.sign({ userId: userId, profile: 'admin' }, secretKey);
                chai.request(server)
                    .post("/api/v1/add-product/product")
                    .set('Authorization', `${token}`)
                    .send(data)
                    .end((err, response) => {
                        // console.log("ress", response.body);
                        try {
                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Please Provide valid stock, do not enter character");
    
                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });

        });

        // DELETE PRODUCT API(delete_product)
        describe("DELETE /api/v1/product/delete-product/:product_Id", () => {
            it("DELETE product_Id is not provided correct", (done) => {
                const product_Id = "656597a9a08d38ee";  // Id length is not correct
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .delete("/api/v1/product/delete-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq("Invalid product_Id provided");

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
            it("DELETE product_Id not found ", (done) => {
                const product_Id = "6583cb00a001ca63c74fbce0";  // Id is not correct
                const token = jwt.sign({ userId: userId , profile: 'admin'}, secretKey);
                chai.request(server)
                    .delete("/api/v1/product/delete-product/" + product_Id)
                    .set('Authorization', `${token}`)
                    .end((err, response) => {
                        try {
                            // console.log("ress", response.body);

                            response.should.have.status(400);
                            response.body.should.have.property('message').eq('product Not Found');

                            done();
                        } catch (error) {
                            done(error);
                        }
                    });
            });
        });


   
});

