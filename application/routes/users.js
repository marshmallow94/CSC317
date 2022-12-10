var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError'); 
const db = require('../conf/database');
const checkUserName = require('../helpers/checkUserName');
const checkEmail = require('../helpers/checkEmail');
const checkPassword = require('../helpers/checkPassword');

router.post('/registration', function(req, res, next) {


  const { username, email, password } = req.body;

  const isValidUsername = checkUserName(username);
  const isValidEmail = checkEmail(email);
  const isValidPassword = checkPassword(password);
  if(!(isValidUsername && isValidEmail && isValidPassword)) {
    throw new UserError('Your form is invalid', 
    '/registration', 200);
  }

  db.query('select id from users where username=?', [username])
    .then(function([results, fields]) {
      if(results && results.length == 0) {
        return db.query('select id from users where email=?', [email])
      }else {
        throw new UserError('username already exists', 
        '/registration', 200);
      }
    })
    .then((function([results, fields]) {
      if(results && results.length == 0) {
        return bcrypt.hash(password, 2);
      }else {
        throw new UserError('email already exists',
        '/registration', 200);
      }
    }))
    .then(function(hashedPassword) {
      return db.query('insert into users (username, email, password) value (?, ?, ?)', [username, email, hashedPassword])
    })
    .then(function([results, fields]) {
      if(results?.affectedRows == 1) {
        req.flash("success", `you are successfully registerd! Please log in again`);
        req.session.save(function(saveError){
          res.redirect('/login');
        })
      }else {
        throw new UserError('Registration failed, please try again',
        '/registration', 200);
      }
    })
    .catch(function(err) {
      if(err instanceof UserError) {
        req.flash('error', err.getMessage());
        req.session.save(function(saveError){
          res.redirect(err.getRedirectURL());
        })
      }else {
        next(err);
      }
    });
});

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  let loggedUserId;
  let loggedUsername;
  
  db.query('select id, username, password from users where username=?', [username])
    .then(function([results, fields]) {
      if(results?.length == 1) {
        let dbPassword = results[0].password;
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        return bcrypt.compare(password, dbPassword);
      }else {
        throw new UserError('Failed Login: Invalid user credentials', 
        '/login', 200);
      }
    })
    .then(function(passwordsMatched){
      if(passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}! now you are logged in`);
        req.session.save(function(saveError){
          res.redirect('/');
        })
      }else {
        throw new UserError('Failed Login: please check your user name or password', 
        '/login', 200);
      }
    })
    .catch(function(err) {
      if(err instanceof UserError) {
        req.flash('error', err.getMessage());
        req.session.save(function(saveError){
          res.redirect(err.getRedirectURL());
        })
      }else {
        next(err);
      }
    });
});

router.post("/logout", function(req, res, next) {
  req.session.destroy(function(destroyError) {
    if(destroyError) {
      next(err);
    }else {
      res.json({
        status: 200,
        message: "You have been logged out"
      })
    }
  })
})

module.exports = router;
