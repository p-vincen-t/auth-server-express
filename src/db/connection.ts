var mongoose = require("mongoose");
import { DbUrl } from "../config";
// if (!DbUrl) {
//   DbUrl = 'mongodb://f4b:f4b@localhost:27017/f4b?authSource=f4b';
// }
mongoose.Promise = global.Promise;
mongoose.connect(DbUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", error => {
  console.log(error);
  process.exit();
});
db.once("open", () => {
  console.log("mongo database connected");
});

export const Connection = mongoose;
