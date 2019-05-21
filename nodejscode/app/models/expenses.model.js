const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const ExpenseSchema = mongoose.Schema({
    userId: ObjectId,
    date: Date,
    amount:Number
});

module.exports = mongoose.model('Expenses', ExpenseSchema);