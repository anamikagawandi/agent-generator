import { expressApp } from "./app";
import http from "http";
import { log } from "./helper/logger";
import { loadConfig } from "./config";
const config = loadConfig();

expressApp().then((app: any) => {
  try {
    const server = http.createServer(app);
    server.listen(config.port, () => {
      log("info", `server running at  ${config.port}`, null);
    });
  } catch (err) {
    log("error", "Server error", null, { message: err });
  }
});
