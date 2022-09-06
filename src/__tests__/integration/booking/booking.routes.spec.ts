import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedBooking,
  mockedUpdateBooking,
} from "../../mocks";

describe("Testing the booking routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let genericToken: any;
  let genericBooking: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericToken = await request(app).post("/login").send(mockedUserLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /booking - Should be able to create a new booking", async () => {
    genericBooking = await request(app)
      .post("/booking")
      .send(mockedBooking)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericBooking.status).toBe(201);
    expect(genericBooking.body.data).toHaveProperty("id");
    expect(genericBooking.body.data).toHaveProperty("userId");
    expect(genericBooking.body.data).toHaveProperty("accommodationId");
    expect(genericBooking.body.data).toHaveProperty("checkin");
    expect(genericBooking.body.data).toHaveProperty("checkout");
    expect(genericBooking.body.data).toHaveProperty("status");
    expect(genericBooking.body).toHaveProperty("message");
  });

  test("PATCH /booking:id - Should be able to update a booking being owner", async () => {

    const response = await request(app)
      .patch(`/booking/${genericBooking.body.data.id}`)
      .send(mockedUpdateBooking)
      .set("Authorization", `Brearer ${genericToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("checkin");
    expect(response.body.data).toHaveProperty("checkout");
    expect(response.body.data).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
  });
});
