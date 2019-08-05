require("dotenv").config();
import Route from "./route";
import * as express from "express";
import * as logger from "morgan";
import * as bodyparser from "body-parser";
/**
 *
 *
 * @class Api
 */
class Api {
  /**
   *
   *
   * @type {express.Application}
   * @memberof Api
   */
  public _app: express.Application;

  /**
   *Creates an instance of Api.
   * @memberof Api
   */
  constructor() {
    this._app = express();
    this.middleware();
    this.routes();
  }

  /**
   *
   *
   * @private
   * @memberof Api
   */
  private middleware = () => {
    this._app.use(logger("dev"));
    this._app.use(bodyparser.json());
    this._app.use(bodyparser.urlencoded({ extended: true }));
    // this._app.use((req, _, next) => {
    //   console.log('data received')
    //   console.log(req.body)
    //   console.log(req.params)
    //   console.log(req.query)
    //   next()
    // })
  };
  /**
   *
   *
   * @private
   * @memberof Api
   */
  private routes = () => (this._app = new Route(this._app).app);
  /**
   *
   *
   * @readonly
   * @type {express.Application}
   * @memberof Api
   */
  public get app(): express.Application {
    return this._app;
  }
}

export default new Api().app;
