const Expense = require('../models/expenses.model.js');

//Create new expense
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Request body can not be empty"
        });
    }

    // Create a Expense
    const expense = new Expense({
        userId: req.body.userId, 
        date: req.body.expDate,
        amount:req.body.amount
    });

    // Save Expense in the database
    expense.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the expense."
        });
    });
};

// Retrieve all expenses from the database.
exports.findAll = (req, res) => {
    Expense.aggregate([
        {
        "$lookup":{
        from:"users",
        localField:"userId",
        foreignField:"_id",
        as:"users"
        }
    },
        {
        "$project" : {name:{ $arrayElemAt: ['$users.name', 0 ] }, 'amount':'$amount','date':'$date' }
        }]).then(expenses => {
        res.send(expenses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving expenses."
        });
    });
};

// Find an expense  with a expenseId
exports.findOne = (req, res) => {
    Expense.findById(req.params.expenseId)
    .then(expense => {
        if(!expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });            
        }
        res.send(expense);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving expense with id " + req.params.expenseId
        });
    });
};

// Update an Expense
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body can not be empty"
        });
    }

    // Find and update expense
    Expense.findByIdAndUpdate(req.params.expenseId, {
        userId: req.body.userId, 
        date: req.body.date,
        amount:req.body.amount
    }, {new: true})
    .then(expense => {
        if(!expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });
        }
        res.send(expense);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating expense with id " + req.params.expenseId
        });
    });
};

// Delete an expense with the specified expenseId in the request
exports.delete = (req, res) => {
    Expense.findByIdAndRemove(req.params.expenseId)
    .then(expense => {
        if(!expense) {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });
        }
        res.send({message: "Expense deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Expense not found with id " + req.params.expenseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete expense with id " + req.params.expenseId
        });
    });
};
