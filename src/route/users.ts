import * as express from "express";
import { ClearUsers, ListUsers } from "./../controller";

export class Route {
  constructor(private _app: express.Application) {
    this._app.use("/users", this.apiRoutes());
  }

  apiRoutes = (): express.Router => {
    const apiRouter = require("express").Router();
    apiRouter.post("/", ListUsers);
    apiRouter.delete("/", ClearUsers);
    return apiRouter;
  };
}
