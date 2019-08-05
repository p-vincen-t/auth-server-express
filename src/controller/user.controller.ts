import { UserService } from "../service";

export const ClearUsers = (_, res, next) => {
  UserService.clear()
    .then(result =>
      res.status(410).send({
        payload: result
      })
    )
    .catch(err => next(err));
};

export const ListUsers = (_, res, next) => {
  UserService.list(res.locals.user)
    .then(result =>
      res.status(200).send({
        payload: result
      })
    )
    .catch(err => next(err));
};
