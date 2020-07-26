const testFolder = "./";
const fs = require("fs");

fs.readdir(testFolder, (err, files) => {
  var emotes = {};

  files.forEach(file => {
    var emote = file.replace(/(.*)\.[^.]+$/, "$1");
    let t = {};
    // let t = { emote: `<img src=/emotes/${file}>` };
    emotes[emote] = `<img src=/emotes/${file}>`;
  });
  console.log(emotes);
});
