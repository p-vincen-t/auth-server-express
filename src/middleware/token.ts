import { LoginService } from '../service';
import { Error403 } from './../controller/error';

export const Token = ({ authorization }) => {
  if (!authorization) return authorization
  return authorization.split(' ')[1]
}

export const TokenGuard = (req, res, next) => LoginService.verifyToken(Token(req.headers) || req.query.token || req.body.token || '')
  .then(user => {
    res.locals.user = user;
    next()
  })
  .catch(err => Error403(err, req, res))

