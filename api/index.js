const express = require("express");
const socket = require("socket.io");

// Create express instance
const app = express();

// Require API routes
const auth = require("./routes/auth");
const emotes = require("./routes/emotes");

// Import API Routes
app.use(auth);
app.use(emotes);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
