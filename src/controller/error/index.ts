import AuthError from "./../../service/error";
/**
 *
 * @param req
 * @param res
 */
export const Error405 = (req, res) => {
  res.status(405).send({
    payload: {},
    message: req.method + " method not allowed here"
  });
};

export const Error500 = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    payload: {
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
      body: req.body,
      error: err
    },
    message: "Theres a problem, thats all we know"
  });
};

export const Error404 = (req, res) => {
  console.log(req.method);
  res.status(404).send({
    payload: {},
    message: "Error: resource not found"
  });
};

export const Error403 = (err: AuthError, req, res) => {
  res.status(403).send({ message: err.message, code: err.code });
};

export const Error422 = (err, req, res) => {
  res.status(422).send({ errors: err.mapped() });
};
