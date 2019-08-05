import Api from "./Api";
import Logger from "./util/Logger";
var http = require("http");
var name = "F4B-AUTH";
Logger("booting %o", name);

const port = normalizePort(process.env.API_PORT || 5001);
Api.set("port", port);

const server = http.createServer(Api);
server.listen(port, "0.0.0.0");
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
  let port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      console.error(error);
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  Logger(`Listening on ${bind}`);
}
