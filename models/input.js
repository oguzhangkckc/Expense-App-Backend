const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        },
    amount: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
},{timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);

