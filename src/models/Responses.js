const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResponsesSchema = new Schema({
    response : {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Responses", ResponsesSchema);