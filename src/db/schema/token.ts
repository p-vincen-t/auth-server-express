var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import { Connection } from "../connection";
/** will contain change type of eah product in the store
 * 1 for addition and 0 for subtraction
 */

// create a schema
var tokenSchema = new Schema(
  {
    client_id: String,
    user: String,
    token: String,
    refresh_token: String,
    active: Boolean
  },
  { timestamps: true }
);
tokenSchema.index({ user: 1 }, { unique: false });
tokenSchema.pre("save", next => {
  this.active = true;
  next();
});
// on every save, add the date

// the schema is useless so far
// we need to create a model using it
export const Token = Connection.model("token", tokenSchema);
