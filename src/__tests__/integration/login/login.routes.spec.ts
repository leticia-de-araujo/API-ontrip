import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import { mockedUser, mockedUserLogin } from "../../mocks/userMocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - Should not be able to login without all required fields", async () => {
    const response = await request(app).post("/login").send({
      email: "hitalo@mail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty(
      "message",
      "password is a required field"
    );
  });

  test("POST /login - Should not be able to login with invalid email or password", async () => {
    const response = await request(app).post("/login").send({
      email: "hitalo@mail.com",
      password: "incorrectpwd928",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("status", "Error");
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
});
