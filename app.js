require("module-alias/register");
require("./config/passport");
require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const path = require("path");
const helmet = require("helmet");
const db = require("@helpers/database.js");

// routes
const authRoute = require("./routes/auth/authRoute");
const apiRoute = require("./routes/api/apiRouteIndex");

global.__basedir = __dirname;
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress, level: 3 }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "file")));
app.use(logger("dev"));

app.use("/auth", authRoute);
app.use("/api", apiRoute);
app.get("*", (req, res) => res.status(200).send({ message: "PT Jaring Synergi Mandiri" }));

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
