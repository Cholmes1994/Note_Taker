// Require express
const express = require("express");

// Create an express server
const app = express();

// Sets the port
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes.js")(app);

// Server listening
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
