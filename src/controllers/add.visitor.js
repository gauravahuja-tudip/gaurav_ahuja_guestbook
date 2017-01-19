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
var Visitor = require('../models/visitor.schema');

exports.add = function (req, res) {
  console.log(req.body);

  var visitorName = req.body.name;
  var visitorEmail = req.body.email;
  var visitorMobile = req.body.mobile;
  var visitorIn = req.body.intime;

  if (visitorName && visitorEmail && visitorMobile && visitorIn) {
    console.log("inside add visitor++++++++++++++++++++++++++++++++++++");
    User.find({token: req.headers.token}, function (err, isMatch) {
      if (err) {
        res.status(400).send({'error': true, 'message': error.Token_Not_Found_Error});
      }
      if (isMatch.length === 0) {
        res.status(400).send({'error': true, 'message': error.User_Not_Found});
      }
      else {
        jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
          if (err) {
            res.status(401).send({'error': true, 'message': error.Session_Expired_Error});
          }
          else {
            console.log(isMatch[0]._id);
            var user_id = isMatch[0]._id;
            //sample user
            var visitor = new Visitor();
            visitor.name = visitorName;
            visitor.email = visitorEmail.trim();
            visitor.mobile = visitorMobile;
            visitor.intime = visitorIn;
            visitor.outtime = "--:--";
            visitor.user_id = user_id;
            visitor.save(function (err) {
              if (err) {
                console.log('err------------', err);
                res.status(400).send({'message': error.Incorrect_Input_data_Error});
              }
              else {
                res.status(201).send({'message': error.Visitor_Created_Successfully});
              }
              console.log('Visitor saved successfully');
              res.json({success: true});
              visitor.save();
            });
          }
        });
      }
    })
  }
  else {
    res.status(400).send({'error': true, 'message': error.Incorrect_Input_data_Error});
  }
};
