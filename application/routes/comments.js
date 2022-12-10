var express = require("express");
var router = express.Router();
const db = require("../conf/database");

router.post("/create", function (req, res, next) {
  if (!req.session.userId) {
    res.json({
      status: "error",
      message: "You must be logged in to comments",
    });
  } else {
    const { comment, postId } = req.body;
    const { userId, username } = req.session;
    db.execute(
      `INSERT INTO comments (text, fk_authorId, fk_postId) value (?,?,?);`,
      [comment, userId, postId]
    ).then(function ([results, fields]) {
      if (results?.affectedRows == 1) {
        res.json({
          status: "success",
          message: "Your comment was added",
          data: {
            comment: comment,
            username: username,
            commentId: results.insertId,
          },
        });
      } else {
        res.json({
          status: "error",
          message: "Faild to comment",
        });
      }
    });
  }
});

module.exports = router;
