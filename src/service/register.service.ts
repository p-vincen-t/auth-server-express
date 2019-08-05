import { AuthRule, User } from "../db/schema";
import { UserRegisterModel } from "../db/schema/user";
import commonService, { Password } from "./common.service";
import AuthError, {
  BASIC_ROLE_NOT_FOUND_ERROR,
  EMAIL_EXISTS_ERROR,
  EMAIL_NOT_FOUND_ERROR
} from "./error";
import Registry from "./registry";
/**
 * the registration service adds users to the system
 * it also removes existing accounts
 *
 * @export
 * @class RegistrationService
 */
class RegistrationService {
  /**
   * check if the email is already registered
   *
   * @memberof RegistrationService
   */
  register = ({ names, email, password }: UserRegisterModel): Promise<any> =>
    new Promise((resolve, reject) =>
      commonService
        .checkEmailExists(email)
        .then(_ => reject(new AuthError(EMAIL_EXISTS_ERROR)))
        .catch(_ =>
          Password.generateSalt(
            password,
            error => reject(error),
            (hash, salt) =>
              AuthRule.findOne({ name: "customer" })
                .then(role => {
                  if (role === null)
                    reject(new AuthError(BASIC_ROLE_NOT_FOUND_ERROR));
                  User.create({
                    email: email,
                    password: hash,
                    salt: salt,
                    roles: [role._id],
                    level: 1,
                    status: 0,
                    name: names
                  })
                    .then(user =>
                      resolve({
                        id: user._id,
                        email: user.email,
                        names: user.name,
                        level: user.level,
                        status: user.status
                      })
                    )
                    .catch(err => reject(err));
                })
                .catch(err => reject(err))
          )
        )
    );
  /**
   *
   *
   * @memberof RegistrationService
   */
  confirmEmail = (username: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      User.findOne({ username })
        .then(u => {
          if (u !== null) {
            u.status = 1;
            u.save();
          } else reject(new AuthError(EMAIL_NOT_FOUND_ERROR));
        })
        .catch(err => reject(err));
    });
}

export default Registry.createWithEnvelope<RegistrationService>(
  RegistrationService
);
