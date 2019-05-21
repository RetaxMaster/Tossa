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
    }
});

module.exports = mongoose.model("Responses", ResponsesSchema);