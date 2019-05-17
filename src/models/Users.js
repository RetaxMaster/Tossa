const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String, required : true },
    date : { type : Date, default: Date.now() } 
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);