import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import winston from "winston";
import expressWinston from "express-winston";
import { errorHandler } from "./helper/error-handler";
import helmet from "helmet";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

/**
 * Initializes the express application
 */
export const expressApp = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet());

  expressWinston.requestWhitelist.push("body");
  expressWinston.responseWhitelist.push("body");

  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      metaField: "apiDetails",
      format: winston.format.combine(winston.format.json()),
    })
  );

  app.get("/healthcheck", (_req: Request, res: Response) => {
    res.status(200).json({ message: "ok" });
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true, // process.env.NODE_ENV === "development",
    })
  );

  app.use(errorHandler);
  return app;
};
