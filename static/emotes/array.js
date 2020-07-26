const testFolder = "./";
const fs = require("fs");

fs.readdir(testFolder, (err, files) => {
  var emotes = [];

  files.forEach(file => {
    var emote = file.replace(/(.*)\.[^.]+$/, "$1");

    let t = `<img src=/emotes/${file}>`;
    var strEmote = emote.toString();

    var obj = { name: emote, emote: t };

    emotes.push(obj);
  });
  console.log(emotes);
});
