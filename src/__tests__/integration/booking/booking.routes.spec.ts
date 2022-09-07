import {
  mockedBooking,
  mockedBooking2,
  mockedBooking3,
  mockedBooking4,
  mockedBooking5,
  mockedBooking6,
  mockedBookingWithoutAllFields,
  mockedBookingWithoutAllFields2,
  mockedUpdateBooking,
  mockedUpdateBooking2,
} from "./../../mocks/bookingMocks/index";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserLogin,
  mockedAdminLogin,
} from "../../mocks/userMocks/index";

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

  test("POST /booking - Should not be able to create a booking that already exists", async () => {
    const response = await request(app).post("/booking").send(mockedBooking);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /booking - should not be able to create a booking without all the information", async () => {
    const response = await request(app)
      .post("/booking")
      .send(mockedBookingWithoutAllFields);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /booking - should not be able to create a booking if isAdm", async () => {
    const genericAdmUser = await request(app)
      .post("/login")
      .send(mockedAdminLogin);
    const response = await request(app)
      .post("/booking")
      .send(mockedBooking2)
      .set("Authorization", `Bearer ${genericAdmUser.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /booking - should not be able to create a booking without authentication", async () => {
    const response = await request(app).post("/booking").send(mockedBooking3);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /booking/:id - Should be able to update a booking being owner", async () => {
    genericBooking = await request(app)
      .post("/booking")
      .send(mockedBooking4)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

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

  test("PATCH /booking/:id - Should not be able to update a booking being Adm", async () => {
    genericBooking = await request(app)
      .post("/booking")
      .send(mockedBooking5)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    const response = await request(app)
      .patch(`/booking/${genericBooking.body.id}`)
      .send(mockedUpdateBooking2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /booking/:id - Should not be able to update a booking without all the informations", async () => {
    const response = await request(app)
      .patch(`/booking/${genericBooking.body.id}`)
      .send(mockedBookingWithoutAllFields2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /booking/:id - Should not be able to update an inexistent booking", async () => {
    const response = await request(app)
      .patch(`/booking/007`)
      .send(mockedUpdateBooking2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /booking/:id - Should not be able to update a booking without authentication", async () => {
    genericBooking = await request(app)
      .post("/booking")
      .send(mockedBooking6)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    const response = await request(app)
      .patch(`/booking/${genericBooking.body.id}`)
      .send(mockedUpdateBooking2)
      .set("Authorization", `Bearer 1234`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
