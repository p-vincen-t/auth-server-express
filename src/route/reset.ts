import * as express from "express";
import { ResetPassword } from "./../controller";
import { TokenGuard } from "./../middleware";
/**
 *
 *
 * @export
 * @class Route
 */
export class Route {
  /**
   *Creates an instance of Route.
   * @param {express.Application} _app
   * @memberof Route
   */
  constructor(private _app: express.Application) {
    this._app.use("/reset", this.apiRoutes());
  }
  /**
   *
   *
   * @memberof Route
   */
  apiRoutes = (): express.Router => {
    const apiRouter = require("express").Router();
    apiRouter.post("/", TokenGuard, ResetPassword);
    return apiRouter;
  };
}
