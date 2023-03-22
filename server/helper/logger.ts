import winston from "winston";
/**
 * Initializes logger object
 * @param {String} level
 * @param {String} message
 * @param {String} label
 * @param {String} data
 */
export const log = (
  level: string,
  message: string,
  label: string | null,
  data?: object
) => {
  const options = {
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
    },
  };

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: label || "unlabeled" }),
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [new winston.transports.Console(options.console)],
    exitOnError: false, // do not exit on handled exceptions
  });

  logger.log(level, message, { logDetails: data });
};
