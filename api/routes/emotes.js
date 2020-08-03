const { Router } = require("express");
const fs = require("fs");

const router = Router();

/* GET users listing. */
router.get("/emotes/list", function(req, res, next) {
  try {
    const emoteFolder = "./static/emotes/";
    fs.readdir(emoteFolder, (err, files) => {
      var emotes = {};
      files.forEach(file => {
        var emote = file.replace(/(.*)\.[^.]+$/, "$1");
        emotes[emote] = `<img src=/emotes/${file}>`;
      });

      res.status(200).json(emotes);
      if (err) {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/emotes/emoteList", function(req, res, next) {
  try {
    const emoteFolder = "./static/emotes/";
    fs.readdir(emoteFolder, (err, files) => {
      var emotes = [];

      files.forEach(file => {
        var emote = file.replace(/(.*)\.[^.]+$/, "$1");

        let path = `<img src=/emotes/${file}>`;

        var obj = { name: emote, emote: path };

        emotes.push(obj);
      });
      res.status(200).json(emotes);
      if (err) {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
