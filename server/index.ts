"use strict";

import { expressApp } from "./app";
const http = require("http");
const logger = require("./helper/logger");
const config = require("./config")();

expressApp().then((app: any) => {
  const server = http.createServer(app);
  server.listen(config.port, (err: any) => {
    if (err) {
      logger.log("error", "Server error", null, { message: err });
    } else {
      logger.log("info", `server running at  ${config.port}`, null);
    }
  });
});
