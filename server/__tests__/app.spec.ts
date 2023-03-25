import request from "supertest";
import { expressApp } from "../app";

describe("Test cases for App File", () => {
  test("Health Check route", async () => {
    const app = await expressApp();
    const response = await request(app).get("/healthcheck");
    expect(response.statusCode).toBe(200);
  });

  test("GraphQL route", async () => {
    const app = await expressApp();
    const query = `query{
      getAllTrainingPhrases{
        id,
        phrase,
        industry
      }
    }`;
    const response = await request(app).post("/graphql").query({ query });
    expect(response.statusCode).toBe(200);
  });

  test("Error Handler 400", async () => {
    const app = await expressApp();
    const response = await request(app).post("/graphql");
    expect(response.statusCode).toBe(400);
  });
});
