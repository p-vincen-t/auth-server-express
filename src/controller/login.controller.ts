import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
import { Token } from "../middleware/token";
import { LoginService } from "../service";
import { UserLoginModel } from "./../db/schema/user";
import AuthError, {
  EMAIL_NOT_FOUND_ERROR,
  PASSWORD_ERROR,
  TOKEN_NOT_FOUND_ERROR
} from "./../service/error";
import { Error403, Error404, Error422 } from "./error";

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const Login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return Error422(errors, req, res);
  else
    LoginService.login(matchedData(req) as UserLoginModel)
      .then(data => res.status(200).send(data))
      .catch(err => {
        if (err instanceof AuthError) {
          const error = err as AuthError;
          if ((error.code = EMAIL_NOT_FOUND_ERROR)) return Error404(req, res);
          else if ((error.code = PASSWORD_ERROR))
            return Error403(error, req, res);
          else {
            return Error403(error, req, res);
          }
        } else {
          next(err);
        }
      });
};

export const VerifyLogin = (req, res, next) => {
  LoginService.verifyToken(Token(req.headers))
    .then(data => res.status(200).send(data))
    .catch(err => {
      if (err instanceof AuthError) {
        const error = err as AuthError;
        if ((error.code = EMAIL_NOT_FOUND_ERROR)) return Error404(req, res);
        else if ((error.code = PASSWORD_ERROR))
          return Error403(error, req, res);
        else {
          return Error403(error, req, res);
        }
      } else {
        next(err);
      }
    });
};

export const Refresh = (req, res, next) =>
  LoginService.refresh(Token(req.headers))
    .then(r => res.status(200).send(r))
    .catch(err => {
      if (err instanceof AuthError) {
        if (err.code === TOKEN_NOT_FOUND_ERROR) {
          res.status(404).send({
            error: "user not found"
          });
        }
      } else next(err);
    });
/**
 *
 * @param req
 * @param res
 * @param next
 */
export const Logout = (req, res, next) =>
  LoginService.logout(Token(req.headers))
    .then(r => res.status(200).send(r))
    .catch(err => {
      if (err instanceof AuthError) {
      } else next(err);
    });
