import * as randomString from "random-string";
import { PasswordReset, User } from "../db/schema";
import { UserLoginModel } from "../db/schema/user";
import { Password } from "./common.service";
import AuthError, { EMAIL_NOT_FOUND_ERROR } from "./error";
import { RESET_TOKEN_NOT_FOUND } from "./error/auth.error";
import Registry from "./registry";
/**
 *
 *
 * @export
 * @class AuthService
 */
class ResetService {
  /**
   *
   *
   * @memberof AuthService
   */
  reset = ({ email }: UserLoginModel): Promise<string> =>
    new Promise((resolve, reject) => {
      User.find({ email })
        .then(u => {
          if (u !== null) {
            PasswordReset.remove({ email });
            PasswordReset.create({
              email: u.email,
              token: randomString({ length: 40 })
            })
              .then(p => resolve(p.token))
              .catch(err => reject(err));
          } else reject(new AuthError(EMAIL_NOT_FOUND_ERROR));
        })
        .catch(err => reject(err));
    });

  confirmReset = ({ token, password }): Promise<boolean> =>
    new Promise((resolve, reject) => {
      PasswordReset.findOne({ token })
        .then(p => {
          if (p !== null) {
            User.findOne({ email: p.email })
              .then(u => {
                if (u !== null)
                  Password.generateSalt(
                    password,
                    error => reject(error),
                    (hash, salt) => {
                      u.salt = salt;
                      u.password = hash;
                      u.update();
                      resolve(true);
                    }
                  );
                else reject(new AuthError(EMAIL_NOT_FOUND_ERROR));
              })
              .catch(err => reject(err));
          } else reject(new AuthError(RESET_TOKEN_NOT_FOUND));
        })
        .catch(err => reject(err));
    });
}

export default Registry.createWithEnvelope<ResetService>(ResetService);
