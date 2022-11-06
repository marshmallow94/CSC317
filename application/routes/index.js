var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
  res.locals.navItems = [
    {
      text: "Log in",
      cssClasses: "nav-items",
      href: "/login"
    }
  ]
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Marie Shimizu" });
});

router.get('/index', function(req, res) {
  res.render('index', {js:["fetch.js"]});
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/registration', function(req, res) {
  res.render('registration', {js:["validation.js"]});
});

router.get('/postimage', function(req, res) {
  res.render('postimage');
});

router.get('/viewpost', function(req, res) {
  res.render('viewpost');
});


module.exports = router;
