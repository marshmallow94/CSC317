var express = require("express");
var router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const db = require("../conf/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = file.mimetype.split("/")[1];
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.${fileExt}`
    );
  },
});

const upload = multer({ storage: storage });

// create post
router.post("/create", upload.single("image"), function (req, res, next) {
  const uploadedFile = req.file.path;
  const thumbnailName = `thumbnail-${req.file.filename}`;
  const destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;

  const { title, description } = req.body;
  const { userId } = req.session;

  sharp(uploadedFile)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(function () {
      return db
        .query(
          "insert into posts (title, description, image, thumbnail, fk_authorId) value (?, ?, ?, ?, ?)",
          [title, description, uploadedFile, destinationOfThumbnail, userId]
        )
        .then(function ([results, fields]) {
          if (results?.affectedRows) {
            req.flash("success", `your post successfully created!`);
            req.session.save(function (saveError) {
              res.redirect("/");
            });
          } else {
            throw new Error("error");
          }
        })
        .catch(function (err) {
          next(err);
        });
    })
    .catch((err) => next(err));
});

module.exports = router;
