var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import { Connection } from "../connection";

var groupSchema = new Schema(
  {
    name: String,
    image: String,
    storeId: String,
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    meta: {
      website: String
    },
    status: Number
  },
  { timestamps: true }
);
// on every save, add the date

// the schema is useless so far
// we need to create a model using it
export const Group = Connection.model("group", groupSchema);
