const chai = require("chai");
let server = require("../index");
const chaiHttp = require("chai-http");

const jwt = require('jsonwebtoken');
const secretKey = "hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123";
const userId = "658be8420de2bebada7615e8"

chai.should();
chai.use(chaiHttp);


// Register User API(register)
describe(" User API testing ", () => {
    describe("POST /api/v1/register/user", () => {
        it(" POST Register User body not provided", (done) => {
            chai.request(server)
                .post("/api/v1/register/user")
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
        it(" POST Register User userName not provided", (done) => {
            const data = {
                email: "hjhi@gmail.com",
                password: "ui56785432",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('userName is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User email not provided", (done) => {
            const data = {
                userName: "Aditi",
                password: "ui56785432",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('email is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User password not provided", (done) => {
            const data = {
                userName: "Aditi",
                email: "hjhi@gmail.com",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('password is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User address not provided", (done) => {
            const data = {
                userName: "Aditi",
                email: "hjhi@gmail.com",
                password: "ui56785432",
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('address is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User userName not provided correct format", (done) => {
            const data = {
                userName : "Aditi23" ,
                email: "hjhi@gmail.com",
                password: "ui56785432",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('please enter letters only in userName');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User email not provided correct format", (done) => {
            const data = {
                userName : "Aditi" ,
                email: "hjhi@.com",
                password: "ui56785432",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("please enter valid email with @gmail.com");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST Register User password length is not correct format", (done) => {
            const data = {
                userName : "Aditi" ,
                email: "hjhi@gmail.com",
                password: "ui56732",
                address: " ubjsj skk"
            }
            chai.request(server)
                .post("/api/v1/register/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("please enter valid password, between 8 to 15 characters");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });

    // Login User API(login)
    describe("POST /api/v1/login/user", () => {
        it(" POST login User body not provided", (done) => {
            chai.request(server)
                .post("/api/v1/login/user")
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
        it(" POST login User email not provided", (done) => {
            const data = {
                password: "ui56785432",
            }
            chai.request(server)
                .post("/api/v1/login/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('email is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" POST login User password not provided", (done) => {
            const data = {
                email: "hjhi@gmail.com",
            }
            chai.request(server)
                .post("/api/v1/login/user")
                .send(data)
                .end((err, response) => {
                    // console.log("ress", response.body);
                    try {
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq('password is not present in body');

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });

    // GET User API(getData_user)
    describe("GET /api/v1/get/user/:user_Id", () => {
        it(" GET user_Id is not provided correct", (done) => {
            const user_Id = "656597a9a08d38ee";  // user_Id length is not correct
            const token = jwt.sign({ userId: userId ,profile: 'admin'}, secretKey);
            chai.request(server)
                .get("/api/v1/get/user/" + user_Id)
                .set('Authorization',`${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Invalid user_Id provided");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it(" GET id not found ", (done) => {
            const user_Id = "658be67f7d2f886a923c69b2";  // user_Id is not correct
            const token = jwt.sign({ userId: userId ,profile: 'admin'}, secretKey);
            chai.request(server)
                .get("/api/v1/get/user/" + user_Id)
                .set('Authorization',`${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);
                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("User Not Found");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });

    // UPDATE USER INFO API(update_user)
    describe("PUT /api/v1/update/user/:user_Id", () => {  
    it("PUT user_Id is not provided correct", (done) => {
        const user_Id = "656597a9a08d38ee";  // user_Id length is not correct
        const token = jwt.sign({ userId: userId ,profile: 'admin'}, secretKey);
        const data = {
            userName: "Aditi",
            email: "hjhi@gmail.com",
            address: "lucknow",
        }
        chai.request(server)
            .put("/api/v1/update/user/" + user_Id)
            .set('Authorization',`${token}`)
            .send(data)
            .end((err, response) => {
                try {
                    // console.log("ress", response.body);

                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("Invalid user_Id provided");

                    done();
                } catch (error) {
                    done(error);
                }
            });
    });
    it("PUT user_Id not found ", (done) => {
        const user_Id = "658be0a67d2f886a923c69ae";  // user_Id is not correct
        const data = {
            userName: "Aditi",
            email: "hjhi@gmail.com",
            address: "lucknow",
        }
        const token = jwt.sign({ userId: userId ,profile: 'admin'}, secretKey);
        chai.request(server)
            .put("/api/v1/update/user/" + user_Id)
            .set('Authorization',`${token}`)
            .send(data)
            .end((err, response) => {
                try {
                    // console.log("ress", response.body);

                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("User Not Found");

                    done();
                } catch (error) {
                    done(error);
                }
            });
    });

  });


    // DELETE USER API(delete_user)
    describe("DELETE /api/v1/delete/user/:user_Id", () => {
        it("DELETE user_Id is not provided correct", (done) => {
            const user_Id = "656597a9a08d38ee";  // user_Id length is not correct
        const token = jwt.sign({ userId: userId ,profile: 'admin'}, secretKey);
        chai.request(server)
                .delete("/api/v1/delete/user/" + user_Id)
                .set('Authorization',`${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);

                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("Invalid user_Id provided");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
        it("DELETE user_Id not found ", (done) => {
            const user_Id = "658be0a67d2f886a923c69ae";  // user_Id is not correct
            const token = jwt.sign({ userId: userId ,profile: 'admin' }, secretKey);
            chai.request(server)
                .delete("/api/v1/delete/user/" + user_Id)
                .set('Authorization',`${token}`)
                .end((err, response) => {
                    try {
                        // console.log("ress", response.body);

                        response.should.have.status(400);
                        response.body.should.have.property('message').eq("User Not Found");

                        done();
                    } catch (error) {
                        done(error);
                    }
                });
        });
    });



});