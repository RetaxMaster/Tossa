const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProblemsSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Problems", ProblemsSchema);