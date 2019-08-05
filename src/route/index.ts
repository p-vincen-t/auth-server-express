import * as cors from "cors";
import * as express from "express";
import { Error404, Error500 } from "./../controller/error";
import { Route as LoginRoutes } from "./login";
import { Route as RegisterRoutes } from "./register";
import { Route as ResetRoutes } from "./reset";
import { Route as UserRoutes } from "./users";
/**
 *
 *
 * @export
 * @class Route
 */
export default class Route {
  /**
   *Creates an instance of Route.
   * @param {express.Application} _app
   * @memberof Route
   */
  constructor(private _app: express.Application) {
    _app.use(this.apiRoutes());
    new LoginRoutes(_app);
    new ResetRoutes(_app);
    new RegisterRoutes(_app);
    new UserRoutes(_app);
    this._app.all("*", Error404);
    this._app.use(Error500);
  }
  /**
   *
   *
   * @memberof Route
   */
  apiRoutes = (): express.Router => {
    const apiRouter = require("express").Router();
    apiRouter.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 200
      })
    );

    apiRouter.get("/", (req, res) => {
      res.status(200).send({
        payload: { headers: req.headers },
        message: "Welcome to Nesst"
      });
    });

    return apiRouter;
  };
  /**
   *
   *
   * @readonly
   * @type {express.Application}
   * @memberof Route
   */
  public get app(): express.Application {
    return this._app;
  }
}
