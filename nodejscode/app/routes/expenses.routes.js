module.exports = (app) => {
    const expenses = require('../controller/expenses.controller.js');

    // Create a new expense
    app.post('/expenses', expenses.create);

    // Retrieve all Expenses
    app.get('/expenses', expenses.findAll);

    // Retrieve a single Expense with expenseId
    app.get('/expenses/:expenseId', expenses.findOne);

    // Update a Expense with expenseId
    app.put('/expenses/:expenseId', expenses.update);

    // Delete a Expense with expenseId
    app.delete('/expenses/:expenseId', expenses.delete);
}