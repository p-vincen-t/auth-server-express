export class Logger {
  static d(message) {
    console.log(message);
  }
  static e(error) {
    console.error(error);
  }
}

if (process.env.NODE_ENV !== "production") {
  Logger.d("Logging initialized at debug level");
}

export default Logger;
