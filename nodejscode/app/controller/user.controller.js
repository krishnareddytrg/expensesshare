const User = require('../models/user.model.js');

//Create new User
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name, 
        email: req.body.email
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    console.log("in findOne");
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.userId
        });
    });
};

// Update a user
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body can not be empty"
        });
    }

    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name , 
        email: req.body.email
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.userId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};


// Find an expense  with a expenseId
exports.getReport = (req, res) => {
    console.log("in GetReport");
    User.aggregate([
        {
        "$lookup":{
        from:'expenses',
        localField:'_id',
        foreignField:'userId',
        as:'UserExp'
        }
    },
        {       
        "$project" : {_id:0, name:'$name', 'amount': {$sum:'$UserExp.amount'},user_id: '$_id' }     
        } 
        ]).then(expense => {
        if(!expense) {
            return res.status(404).send({
                message: "No Expenses found"
            });            
        }       
       let result= splitPayments(parsePaymentsObj(expense));
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Expense not found with id "
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving expense with id "
        });
    });  
};

//To parse raw expenses by each user object
function parsePaymentsObj(expenses){
    let paymentObj= new Object();
    expenses.forEach(function(element){
        paymentObj[element.name]=element.amount;
    });
    return paymentObj;
}

// To calculate the expenses and who pays to whom and how much amount 
function splitPayments(payments) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);
  
    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;
  
    const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean); 

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let resultArr= new Array();    
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
     let resultObj= new Object();
     resultObj.from=sortedPeople[i];
     resultObj.to= sortedPeople[j];
     resultObj.amount =debt;
     resultArr.push(resultObj);
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
  
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    return resultArr;
  }