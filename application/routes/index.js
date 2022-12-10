var express = require('express');
var router = express.Router();
const db = require("../conf/database");
var { isLoggedIn } = require("../middleware/protectors");


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
  let query = "select id, title, thumbnail from posts ORDER BY createdAt DESC";
  if (req.query?.keyword) {
    query = `select id, title, thumbnail from posts where title LIKE '%${req.query.keyword}%' ORDER BY createdAt DESC`;
  }
  db.query(query)
    .then(function ([results, fields]) {
      res.render("index", {
        
        title: "main",
        heading: "Photo app",
        posts: results,
        keyword: req.query?.keyword ?? "",
      });
    })
    .catch(function (err) {
      next(err);
    });
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

router.get('/postimage', isLoggedIn, function(req, res) {
  res.render('postimage', {
    css: ["photos.css"],
    js: ["posts.js"]
  });
});

router.get('/viewpost/:id', isLoggedIn, function(req, res) {
  db.query(
    "select p.title, p.description, p.image, p.createdAt, p.id, u.username from posts p join users u on p.fk_authorId=u.id where p.id=?",
    [req.params.id]
  )
    .then(function ([results, fields]) {
      return results;
    })
    .then(function (postResults) {
      if (postResults?.length > 0) {
        db.query(
          "select c.id, c.text, c.createdAt, u.username from comments c join users u on c.fk_authorId=u.id where fk_postId=? ORDER BY createdAt DESC",
          [req.params.id]
        ).then(function ([results, fields]) {
          res.render("viewPost", {
            js: ["viewpost.js"],
            title: "viewpost",
            heading: "View Post",
            post: postResults[0],
            formatDate: new Date(postResults[0].createdAt).toLocaleString(),
            comments: results.map((each) => {
              return {
                id: each.id,
                text: each.text,
                createdAt: new Date(postResults[0].createdAt).toLocaleString(),
                username: each.username,
              };
            }),
          });
        });
      }
    })
    .catch(function (err) {
      next(err);
    });
});

router.get("/mypost", function (req, res, next) {
  let query =
    "select id, title, thumbnail from posts where fk_authorId=? ORDER BY createdAt DESC";
  db.query(query, [req.session.userId])
    .then(function ([results, fields]) {
      res.render("myPost", {
        title: "myPost",
        heading: "My Post",
        posts: results,
      });
    })
    .catch(function (err) {
      next(err);
    });
});


module.exports = router;
