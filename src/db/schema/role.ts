var mongoose = require("mongoose");
var Schema = mongoose.Schema;
import { Connection } from "../connection";

// create a schema
// `name` varchar(64) not null,
// `data` text,
// `created_at` integer,
// `updated_at` integer,
//     primary key (`name`)
var authRuleSchema = new Schema(
  {
    name: { type: String, required: true, primary: true },
    description: String,
    status: Number
  },
  { timestamps: true }
);

// `name` varchar(64) not null,
// `type` integer not null,
// `description` text,
// `rule_name` varchar(64),
// `data` text,
// `created_at` integer,
// `updated_at` integer,
// primary key (`name`),
// foreign key (`rule_name`) references `auth_rule` (`name`) on delete set null on update cascade,
// key `type` (`type`)

var authItemSchema = new Schema(
  {
    name: { type: String, required: true, primary: true },
    type: { type: Number, required: true },
    description: String,
    rule_name: { type: Schema.Types.ObjectId, ref: "authRule" },
    data: String
  },
  { timestamps: true }
);

// `parent` varchar(64) not null,
// `child` varchar(64) not null,

var authItemChildSchema = new Schema({
  parent: { type: Schema.Types.String, ref: "authItem" },
  child: { type: Schema.Types.String, ref: "authItem" }
});

authItemChildSchema.index({ parent: 1, child: 1 }, { unique: true });

// `item_name` varchar(64) not null,
// `user_id` varchar(64) not null,
// `created_at` integer,
// primary key (`item_name`, `user_id`),
// foreign key (`item_name`) references `auth_item` (`name`)

var authAssignment = new Schema({
  item_name: { type: Schema.Types.String, ref: "authItem" },
  user: String
});

authAssignment.index({ item_name: 1, user: 1 }, { unique: true });

// the schema is useless so far
// we need to create a model using it

export const AuthRule = Connection.model("authRule", authRuleSchema);
export const AuthRuleItem = Connection.model("authItem", authItemSchema);
export const AuthRuleItemChild = Connection.model(
  "authItemChildren",
  authItemChildSchema
);
export const AuthAssignment = Connection.model(
  "authAssignment",
  authAssignment
);
