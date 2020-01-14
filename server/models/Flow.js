const mongoose = require('mongoose');


// const element = new Schema({
//     id: Number,
//     name: String,
//     valid: Boolean,
//     age: Number,
//     color: String,
//     top: String,
//     left: String

// });
// const connection = new Schema({
//     id: { type : Array , "default" : [] }
// });

const FlowSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    flowName: String,
    elements: [{
        id: String,
        name: String,
        valid: Boolean,
        age: Number,
        color: String,
        top: Number,
        left: Number
    }],
    connections: [{
        elIdFrom: Number,
        elIdTo: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('flow', FlowSchema);