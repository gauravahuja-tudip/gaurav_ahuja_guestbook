var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user.schema');
// require('../app/models/user');
var bcrypt = require('bcrypt-node');
var error = require('../error_messanger/error.messages');
app.set('superSecret', config.secret);
var valid = require('validator');


//Receptionist Registration logic
exports.register = function (req, res) {
  console.log(req.body);

  var userName = req.body.firstname + " " + req.body.lastname;
  var userEmail = req.body.email;
  var userPassword = req.body.password;

  if (userName && userEmail && userPassword) {

          // create a sample user
          var user = new User();

          user.name = userName;
          user.email = userEmail;
          user.password = userPassword;

          // Encrypting password using Bcrypt
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt,function () {}, function (err, hash) {
              if (err) {
                res.status(500).send({'error': true, 'massage': error.Bcrypt_Related_Error});
              }
              else if (!hash) {
                res.status(400).send({'error': true, 'massage': error.Password_Encryption_Error});
              }
              else {
                user.password = hash;
                // Save user in DB
                user.save(function (err) {
                  if (err) {
                    //console.log(err);
                    res.status(400).send({'error': true, 'message': error.User_Not_Found});
                  }
                  else {
                    var token = jwt.sign(user, app.get('superSecret'), {
                      expiresIn: 86400 // expires in 24 hours

                    });

                    console.log('User saved successfully');
                    res.json({success: true, token: token});
                    user.token = token;
                    user.save();
                      console.log("save complete....");
                  }//else loop token end
                });//save method
              }
            });
          });

  }
  else {
    res.status(400).send({'error': true, 'meassage': error.Incorrect_Input_data_Error});
  }
};
//Receptionist login logic
exports.login = function (req, res) {

  var userPassword = req.body.password;
  var userEmail = req.body.email;

  User.findOne({email: userEmail}, function (err, user) {
    if (err) {
      res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
    }
    if (!user) {
      res.status(404).send({'error': true, 'massage': error.User_Not_Found});
    }
    else {
      var hash1 = user.password;

      // Decrypting password using Bcrypt
      bcrypt.compare(userPassword, hash1, function (err, isMatch) {

          if (err) {
            res.status(400).send({'error': true, 'massage': error.Password_Not_Match});
          }
          if (isMatch) {
            console.log(isMatch);
            user.token = null;
            user.save();

            var token = jwt.sign(user, app.get('superSecret'));
            res.json({
              success: true,
              message: 'Your login token generate!',
              token: token
            });
            user.token = token;
            user.save();
          }
          else {
            res.status(403).send({'success': true, 'message': error.Password_Encryption_Error});
          }
        }
      );
    }
  });
};
