import Logger from "./logger";
var dotenv = require("dotenv");
var fs = require("fs");

if (fs.existsSync(".env")) {
  Logger.d("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  Logger.d("Using .env.example file to supply config environment variables");
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod
  ? process.env["MONGODB_URI"]
  : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
  Logger.e("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  Logger.e("No mongo connection string. Set MONGODB_URI environment variable.");
  process.exit(1);
}

var loginToken = {
  secret: "include_iostream",
  expiresIn: "2h"
};

var confirmEmailToken = {
  secret: "nema_emails",
  expiresIn: "3h"
};
module.exports = {
  loginToken,
  confirmEmailToken
};
