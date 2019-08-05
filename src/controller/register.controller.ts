import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
import { UserRegisterModel } from "./../db/schema/user";
import { RegistrationService } from "./../service";
import AuthError, {
  BASIC_ROLE_NOT_FOUND_ERROR,
  EMAIL_EXISTS_ERROR
} from "./../service/error";
import { Error422 } from "./error";
/**
 *
 *
 * @param {*} user
 */

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */ export const Register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return Error422(errors, req, res);
  else
    RegistrationService.register(matchedData(req) as UserRegisterModel)
      .then(user => {
        res.status(201).send(user);
        // MailService.send('auth/confirm',
        //     { emails: user.email },
        //     'Welcome to Face4Biz',
        //     {})
      })
      .catch(err => {
        if (err instanceof AuthError) {
          if (err.code === BASIC_ROLE_NOT_FOUND_ERROR) {
            res.status(412).send({
              error: "customer role not found"
            });
          } else if (err.code === EMAIL_EXISTS_ERROR) {
            res.status(406).send({
              error: "email exists already"
            });
          }
        } else {
          next(err);
        }
      });
};

export const ConfirmEmail = (req, res, next) =>
  RegistrationService.confirmEmail(req.params.username)
    .then(r =>
      res.status(200).send({
        payload: "successfully confirmed email"
      })
    )
    .catch(err => {});
