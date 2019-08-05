import { User } from "../db/schema";
import { UserLoginModel } from "../db/schema/user";
import clientService from "./client.service";
import commonService, { Password } from "./common.service";
import AuthError, { EMAIL_NOT_FOUND_ERROR, PASSWORD_ERROR } from "./error";
import Registry from "./registry";
import tokenService from "./token.service";
/**
 *
 *
 * @class LoginService
 */
class LoginService {
  /**
   *
   *
   * @memberof LoginService
   */
  login = ({
    email,
    password,
    client_id
  }: UserLoginModel): Promise<{ token: string }> =>
    new Promise((resolve, reject) =>
      clientService
        .findClient(client_id)
        .then(client => {
          User.findOne({ email })
            .then(u => {
              if (u !== null)
                Password.compareHash(
                  password,
                  u.password,
                  _ => reject(new AuthError(PASSWORD_ERROR)),
                  _ =>
                    tokenService
                      .addToken(u, client)
                      .then(t => resolve({ token: t._id }))
                      .catch(err => reject(err))
                );
              else reject(new AuthError(EMAIL_NOT_FOUND_ERROR));
            })
            .catch(err => reject(err));
        })
        .catch(err => {
          reject(err);
        })
    );
  /**
   *
   *
   * @memberof LoginService
   */
  logout = (token): Promise<any> => tokenService.removeToken(token);

  /**
   *
   *
   * @memberof LoginService
   */
  verifyToken = (token): Promise<any> =>
    new Promise((resolve, reject) => {
      tokenService
        .verifyToken(token)
        .then(id => {
          resolve(commonService.getUserById(id));
        })
        .catch(err => {
          reject(err);
        });
    });
  /**
   *
   *
   * @memberof LoginService
   */
  refresh = (refresh_token: string): Promise<any> =>
    tokenService.refresh(refresh_token);
}

export default Registry.createWithEnvelope<LoginService>(LoginService);
