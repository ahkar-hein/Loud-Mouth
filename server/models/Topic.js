const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const topicSchema = new Schema({
    topicBody: {
        type: String,
        required: true,
        maxlength: 280 //validate for max string length as 280
    }
});


const Topic = model('topic', topicSchema);

module.exports = Topic;
