// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
// Enable CORS
let cors = require("cors");
// Initialize the app
let app = express();

// CORS
app.use(cors());

let authentication = require("./Auth");
// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost/restaurant");

var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8081;

app.all("/api/*", authentication.auth);

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running RestaurantAPI on port " + port);
});
