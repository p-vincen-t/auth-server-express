import { Token } from "../db/schema";
import * as jwt from "jsonwebtoken";
import Registry from "./registry";
import { Auth } from "../config/default/auth";
import AuthError, { TOKEN_NOT_FOUND_ERROR } from "./error";
const uuidv4 = require("uuid/v4");

/**
 *
 *
 * @class RoleService
 */
class TokenService {
  private readonly _jwtSecret = Auth.JWT_SECRET;
  addToken = (user, client): Promise<any> =>
    new Promise((resolve, reject) => {
      Token.findOneAndUpdate(
        { user: user._id, client_id: client._id }, // find a token with that user
        {
          //save this token if not found
          user: user._id,
          token: jwt.sign({ id: user._id }, this._jwtSecret, {
            expiresIn: 60 * 60 * 60
          }),
          refresh_token: uuidv4(),
          client_id: client._id
        }, // insert if doesn`t exist else update
        { upsert: true, new: true, runValidators: true }, // options
        (err, token) => {
          // callback
          if (err) reject(err);
          else resolve(token);
        }
      );
    });

  removeToken = (_id: string): Promise<any> =>
    new Promise((resolve, reject) => {
      Token.findByIdAndRemove(_id)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });

  verifyToken = (token): Promise<any> =>
    new Promise((resolve, reject) => {
      Token.findById(token)
        .then(t => {
          if (t) {
            jwt.verify(t.token, this._jwtSecret, (err, decoded) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(decoded["id"]);
            });
          } else {
            reject(new AuthError(TOKEN_NOT_FOUND_ERROR));
          }
        })
        .catch(err => reject(err));
    });

  refresh = (refresh_token: string): Promise<any> =>
    new Promise((resolve, reject) =>
      Token.findOne({ refresh_token })
        .then(t => {
          if (t === null) return reject(new AuthError(TOKEN_NOT_FOUND_ERROR));
          t.token = jwt.sign({ id: t.user }, this._jwtSecret, {
            expiresIn: 60 * 60 * 60
          });
          t.refresh_token = uuidv4();
          t.save(
            err => reject(err),
            tk => resolve({ token: tk.token, refresh_token: tk.refresh_token })
          );
        })
        .catch(err => reject(err))
    );
}

export default Registry.createWithEnvelope<TokenService>(TokenService);
