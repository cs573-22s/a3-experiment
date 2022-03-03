const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    userId:{
        type:String,
        required: true
    },
    test1: {
        type: [],
        required: true
    },
    test2: {
        type: [],
        required: true
    },
    test3: {
        type: [],
        required: true
    },
    test4: {
        type: [],
        required: true
    },
    test5: {
        type: [],
        required: true
    },
    test6: {
        type: [],
        required: true
    },
    test7: {
        type: [],
        required: true
    },
    test8: {
        type: [],
        required: true
    },
    test9: {
        type: [],
        required: true
    },
    test10: {
        type: [],
        required: true
    },
    test11: {
        type: [],
        required: true
    },
    test12: {
        type: [],
        required: true
    },
    endingSurvey: {
        type: [],
        required: true
    }
}, {timestamps: true });

const ResponseEntry = mongoose.model('response', responseSchema);
module.exports = ResponseEntry;
