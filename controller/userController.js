const jwt = require("jsonwebtoken");
const validator = require("../validator/validator");
const bcrypt = require("bcrypt");
const salt = 10;
const user_Model = require("../model/userModel")
const isValidObject = (data) => {
    if (Object.keys(data).length === 0) {
        return false
    }
    return true
};



module.exports.register = async (req, res) => {
    try {
        const data = req.body
        if (!validator.isValidObject(data)) {
            return res.status(400).send({ status: false, message: "please fill all required fields" })
        }

        const { userName, email, password, address, profile } = data

        // profile
        if (!validator.isValidString(profile)) {
            return res.status(400).send({ status: false, message: "please enter letters only in profile" })
        }

        // name
        if (!userName || !isValidObject(userName)) {
            return res.status(400).send({ message: "userName is not present in body" })
        }
        if (!validator.isValidString(userName)) {
            return res.status(400).send({ status: false, message: "please enter letters only in userName" })
        }

        //password
        if (!password || !isValidObject(password)) {
            return res.status(400).send({ message: "password is not present in body" })
        }
        if (!validator.isValidPW(password)) {
            return res.status(400).send({ status: false, message: "please enter valid password, between 8 to 15 characters" })
        }

        //address
        if (!address) {
            return res.status(400).send({ status: false, message: "address is not present in body" })
        }

        //email
        if (!email || !isValidObject(email)) {
            return res.status(400).send({ message: "email is not present in body" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "please enter valid email with @gmail.com" })
        }

        const isEmailInUse = await user_Model.findOne({ email: email })
        if (isEmailInUse) {
            return res.status(400).send({ status: false, message: "email already registered, enter different email" })
        }


        const newUser = new user_Model({
            profile,
            userName,
            email,
            password,
            address,

        });


        const hash = await bcrypt.hash(password, salt);
        newUser.password = hash;

        await newUser.save();

        res.status(201).send({ status: true, data });

    } catch (error) {
        console.log("err", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.login = async (req, res) => {
    try {
        const data = req.body
        const { email, password } = data

        if (!validator.isValidObject(data)) {
            return res.status(400).send({ status: false, message: "please fill all required fields" })
        }

        //email
        if (!email || !isValidObject(email)) {
            return res.status(400).send({ message: "email is not present in body" })
        }

        //password
        if (!password || !isValidObject(password)) {
            return res.status(400).send({ message: "password is not present in body" })
        }

        const user = await user_Model.findOne({ email });
        if (!user) {
            res.status(401).send({ status: false, message: 'Invalid login credentials' })
            return
        }


        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid Password credentials" });
        }


        const access = await user_Model.findOne({ email })
        // console.log("access", access.profile);

        const token = jwt.sign(
            {
                userId: user._id,
                profile: access.profile,
                //   iat : Math.floor(Date.now() / 1000),
                //   exp: Math.floor(Date.now() /1000) +10*60*60
            }, "hiimyprivatekeyisverysecuredbecauseitiscreatedbymeprachii0123")

        res.status(200).send({ status: true, message: 'Author login successfully', userId: user._id, data: {token} });


    } catch (err) {
        console.log("er", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.getData_user = async (req, res) => {
    try {
        const { user_Id } = req.params;
        if (!validator.isValidObjectId(user_Id)) {
            return res.status(400).send({ status: false, message: "Invalid user_Id provided" })
        }

        const user = await user_Model.findOne({ _id: user_Id })
        if (!user || !user.length === 0) {
            return res.status(400).send({ status: false, message: "User Not Found" })
        }

        res.status(200).send({ status: true, user })

    } catch (err) {
        console.log("er", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.update_user = async (req, res) => {
    try {
        const { user_Id } = req.params;
        const { userName, email, password, address } = req.body;
        const updateUserData = {};

        // user_Id
        if (!validator.isValidObjectId(user_Id)) {
            return res.status(400).send({ status: false, message: "Invalid user_Id provided" });
        }

        // userName
        if (validator.isValidString(userName)) {
            updateUserData['userName'] = userName;
        }

        // email
        if (validator.isValidEmail(email)) {
            const isEmailInUse = await user_Model.findOne({ email: email, _id: { $ne: user_Id } });
            if (isEmailInUse) {
                return res.status(400).send({ status: false, message: "Email already registered, enter a different email" });
            }
            updateUserData['email'] = email;
        }

        // password
        if (validator.isValidPW(password)) {
            updateUserData['password'] = password;
        }

        // address
        // if (validator.isValid(address)) {
            updateUserData['address'] = address;
        

        const user = await user_Model.findOneAndUpdate({ _id: user_Id }, { $set: updateUserData }, { new: true });

        if (!user) {
            return res.status(400).send({ status: false, message: "User Not Found" });
        }

        res.status(200).send({ status: true, message: 'Updated successfully', user });

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.delete_user = async (req, res) => {
    try {

        const { user_Id } = req.params
        if (!(validator.isValidObjectId(user_Id))) {
            return res.status(400).send({ status: false, message: "Invalid user_Id provided" })
        }

        const user = await user_Model.deleteOne({ _id: user_Id });
        if (user.deletedCount == 0) {
            return res.status(400).send({ status: false, message: "User Not Found" })
        }

        res.status(200).send({ status: true, data: "Deleted sucessfully" })
    } catch (err) {
        console.log("er", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



