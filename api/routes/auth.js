const { Router } = require("express");
const { Nuxt, Builder } = require("nuxt");
const crypto = require("crypto");

const config = require("../../nuxt.config.js");

const router = Router();

if (config.default.publicRuntimeConfig.ADMIN_TOKEN) {
  var adminToken = config.default.publicRuntimeConfig.ADMIN_TOKEN.toString();
  console.log(`Admin token: ${adminToken}`);
} else {
  var adminToken = crypto.randomBytes(3).toString("hex");
  console.log(`Admin token: ${adminToken}`);
}

router.get("/auth/:id", function(req, res, next) {
  try {
    if (req.params.id === adminToken) {
      res.status(200).json({ auth: true });
    } else {
      res.status(401).json({ auth: false });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
