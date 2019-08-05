var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import { Connection } from "../connection";
/** will contain change type of eah product in the store
 * 1 for addition and 0 for subtraction
 */

// create a schema
var clientSchema = new Schema(
  {
    name: String,
    description: String,
    active: Boolean
  },
  { timestamps: true }
);
clientSchema.pre("save", next => {
  this.active = true;
  next();
});
// on every save, add the date

// the schema is useless so far
// we need to create a model using it
export const Client = Connection.model("client", clientSchema);
