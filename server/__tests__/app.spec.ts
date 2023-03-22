import request from "supertest";
import { expressApp } from "../app";

describe("Test cases for App File", () => {
  test("Health Check route", async () => {
    const app = await expressApp();
    const response = await request(app).get("/healthcheck");
    expect(response.statusCode).toBe(200);
  });
});
