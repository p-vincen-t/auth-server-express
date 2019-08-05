var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import { Connection } from '../connection';

var userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: { type: String, required: true },
  salt: { type: String, required: true },
  image: String,
  level: Number,
  organizations: [{ type: Schema.Types.ObjectId, ref: 'organization' }],
  roles: [{ type: Schema.Types.ObjectId, ref: 'authAssignment' }],
  meta: {
    website: String,
    preferences: [String]
  },
  status: Number
}, { timestamps: true });
// on every save, add the date

userSchema.methods.can = async (permission, organization = null, can = true) => {
  console.log(permission)
  return can;
};


export interface UserRegisterModel {
  names: string
  email: string
  password: string
}

export interface UserLoginModel {
  email: string
  password: string
  client_id: string
}

export interface PasswordResetModel {
  username: string
  oldPassword: string
  newPassword: string
}

var passwordResetSchema = new Schema({
  email: String,
  token: String 
}, { timestamps: true });

export const User = Connection.model('user', userSchema);
export const PasswordReset = Connection.model('password_rest', passwordResetSchema);



