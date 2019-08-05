var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import { Connection } from "../connection";
/** will contain change type of eah product in the store
 * 1 for addition and 0 for subtraction
 */

// create a schema
var organizationSchema = new Schema(
  {
    name: String,
    description: String,
    admin: { type: Schema.Types.ObjectId, ref: "user" },
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    store: { type: Schema.Types.ObjectId, ref: "store" }
  },
  { timestamps: true }
);
// on every save, add the date
organizationSchema.pre("save", next => {
  next();
});

// the schema is useless so far
// we need to create a model using it
export const Organization = Connection.model(
  "organization",
  organizationSchema
);
