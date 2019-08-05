import * as bcrypt from "bcrypt";
import { Auth } from "../config";
import { User } from "../db/schema";
import AuthError, {
  EMAIL_NOT_FOUND_ERROR,
  USER_NOT_FOUND_ERROR
} from "./error";
import Registry from "./registry";

const saltRounds = Auth.SALT_ROUNDS as number;

export const Password = {
  generateSalt: (
    password: string,
    error: (err) => void,
    success: (hash, salt) => void
  ) =>
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) error(err);
      else
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) error(err);
          else success(hash, salt);
        });
    }),

  compareHash: (
    password: string,
    hash: string,
    error: (err) => void,
    success: (res) => void
  ) =>
    bcrypt.compare(password, hash, (err, res) => {
      if (err) error(err);
      else if (res) success(res);
      else error(err);
    })
};
/**
 *
 *
 * @export
 * @class AuthService
 */
class CommmonService {
  /**
   *
   *
   * @private
   * @memberof CommmonService
   */

  /**
   *
   *
   * @memberof AuthService
   */
  getUserById = (_id: string): Promise<any> =>
    new Promise((resolve, reject) =>
      User.findOne({ _id })
        .then(user => {
          if (user !== null)
            resolve({
              id: user._id,
              email: user.email,
              names: user.name,
              roles: user.roles,
              organizations: user.organizations,
              level: user.level,
              status: user.status
            });
          else reject(new AuthError(USER_NOT_FOUND_ERROR));
        })
        .catch(err => reject(err))
    );

  /**
   *
   *
   * @memberof AuthService
   */
  checkEmailExists = (email: string): Promise<boolean> =>
    new Promise((resolve, reject) =>
      User.findOne({ email })
        .then(u => {
          if (u !== null) resolve(true);
          else reject(new AuthError(EMAIL_NOT_FOUND_ERROR));
        })
        .catch(err => reject(err))
    );
}

export default Registry.createWithEnvelope<CommmonService>(CommmonService);
