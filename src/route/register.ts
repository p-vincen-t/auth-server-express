import * as express from "express";
import { ConfirmEmail, Register } from "./../controller";
import { RegisterRules } from "../middleware";
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
    this._app.use("/register", this.apiRoutes());
  }
  /**
   *
   *
   * @memberof Route
   */
  apiRoutes = (): express.Router => {
    const apiRouter = require("express").Router();
    apiRouter.post("/", RegisterRules, Register);
    apiRouter.post("/confirm", ConfirmEmail);
    return apiRouter;
  };
}
