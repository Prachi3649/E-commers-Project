const mongoose = require("mongoose")

module.exports.isValidObject = (data) => {
    if (Object.keys(data).length === 0){
        return false
    }
    return true
}

module.exports.isValid = (value) => {
    if(typeof(value) == "undefined" || value == null)return false
    if(typeof(value) == "string" && value.trim().length === 0) return false
    if(typeof(value) == "number" && value === null) return false
    return true
}



module.exports.isValidEmail = (value) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)
}

module.exports.isValidPW = (value) => {
    return /^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value)
}

module.exports.isValidObjectId = (value) => {
    return mongoose.Types.ObjectId.isValid(value)

}

module.exports.isValidString = (value) => {
    return /^[a-zA-Z -]+$/.test(value)
}

module.exports.isValidNumber = (value) => {
    // return /^[0-9]*$/.test(value)
    return /^[0-9]+$/.test(value)
}

module.exports.isValidPincode = (value) =>{
    return /^[1-9][0-9]{5}$/.test(value)
}
