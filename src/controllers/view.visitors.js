var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user.schema');
var Visitor = require('../models/visitor.schema');
// require('../app/models/user');
var bcrypt = require('bcrypt-node');
var error = require('../error_messanger/error.messages');
app.set('superSecret', config.secret);
var valid = require('validator');

exports.view = function (req, res) {
console.log("inside view+++++++++++");
  User.find(function (err, isMatch) {

    if (err) {
      res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
    }
    if (isMatch.length === 0) {
      res.status(400).send({'error': true, 'message': error.User_Not_Found});
    }
    else {
      jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
        if (err) {
          res.status(400).send({'error': true, 'message': error.Session_Expired_Error});
        }
        Visitor.find(function (err, visitor) {
          console.log(isMatch[0]._id);
          if (err) {
            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
          }
          else if (visitor.length === 0) {
            // console.log('visitor find successfully');
            res.send({'error': true, 'message': error.Visitor_Not_Found});
          }
          else {
            console.log("Successfully find user by ID");
            res.status(200).send(visitor);

          }

        });
      });

    }

  });

};
