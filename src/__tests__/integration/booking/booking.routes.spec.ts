import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedBooking,
} from "../../mocks";

describe("Testing the booking routes", () => {
  let connection: DataSource;
  let genericUser;
  let genericToken: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericToken = await request(app)
      .post("/login")
      .send(mockedUserLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /booking - Should be able to create a new booking", async () => {

    const response = await request(app)
      .post("/booking")
      .send(mockedBooking)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("accommodationId");
    expect(response.body).toHaveProperty("checkin");
    expect(response.body).toHaveProperty("checkout");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
  });
});
