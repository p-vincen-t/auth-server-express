import * as express from "express";
import { VerifyLogin } from "../controller/login.controller";
import { Login, Logout, Refresh } from "./../controller";
import { LoginRules } from "./../middleware";

export class Route {
  constructor(private _app: express.Application) {
    this._app.use("/login", this.apiRoutes());
  }

  apiRoutes = (): express.Router => {
    const apiRouter = require("express").Router();
    apiRouter.post("/", LoginRules, Login);
    apiRouter.get("/verify", VerifyLogin);
    apiRouter.post("/logout", Logout);
    apiRouter.post("/refresh", Refresh);
    return apiRouter;
  };
}
