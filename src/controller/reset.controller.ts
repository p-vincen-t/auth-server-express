import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
import { ResetService } from "../service";
import { UserLoginModel } from "./../db/schema/user";
import AuthError from "./../service/error";
import { Error422 } from "./error";

export const ChangePassword = (req, res, next) => {};

export const ResetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return Error422(errors, req, res);
  else
    ResetService.reset(matchedData(req) as UserLoginModel)
      .then(token => {
        res.status(200).send({});
        // MailService.send('auth/reset-password',
        //     { emails: req.body.email },
        //     'Password reset',
        //     { token })
      })
      .catch(err => {
        if (err instanceof AuthError) {
          /// err email not found error
        } else next(err);
      });
};

export const ConfirmResetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return Error422(errors, req, res);
  else
    ResetService.confirmReset({
      token: req.params.token,
      password: req.body.password
    })
      .then(b => res.status(200).send({}))
      .catch(err => {
        if (err instanceof AuthError) {
          /// err email not found or token not found err
        } else next(err);
      });
};
