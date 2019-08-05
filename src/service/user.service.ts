import { User } from "./../db/schema";
import Registry from "./registry";
var _ = require("lodash");
/**
 *
 *
 * @class UserService
 */
class UserService {
  clear = (): Promise<any> =>
    new Promise((resolve, _) => {
      User.remove({}, _ => {
        resolve("cleared");
      });
    });

  // name: String,
  // email: String,
  // phone: String,
  // password: { type: String, required: true },
  // salt: { type: String, required: true },
  // image: String,
  // level: Number,
  // organizations: [{ type: Schema.Types.ObjectId, ref: 'organization' }],
  // roles: [{ type: Schema.Types.ObjectId, ref: 'authAssignment' }],
  // meta: {
  //   website: String,
  //   preferences: [String]
  // },
  // status: Number
  addUser = ({
    name,
    email,
    phone,
    password,
    salt,
    image,
    level,
    organizations,
    roles,
    meta,
    status
  }): Promise<any> => new Promise((resolve, reject) => {});
  /**
   *
   *
   * @memberof UserService
   */
  list = async _user =>
    _.map(await User.find({}), (user, key) => ({
      email: user.email,
      names: user.name,
      level: user.level,
      meta: user.meta
    }));
  /**
   *
   *
   * @memberof UserService
   */
  subscribe = (_user, _email: string): Promise<boolean> =>
    new Promise(resolve => {});
}

export default Registry.createWithEnvelope<UserService>(UserService);
