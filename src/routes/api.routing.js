var express = require('express');
var app = express.Router();

var auth = require('../controllers/user.authentication');
var addVisitor = require('../controllers/add.visitor');
var viewVisitor = require('../controllers/view.visitors');
// User's routes
app.post('/register', auth.register);
app.post('/login', auth.login);

//Visitor's Routes
app.post('/add', addVisitor.add);
app.get('/view', viewVisitor.view);
module.exports = app;
