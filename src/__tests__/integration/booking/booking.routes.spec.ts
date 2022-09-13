import {
  mockedBooking,
  mockedBooking10,
  mockedBooking2,
  mockedBooking3,
  mockedBooking4,
  mockedBooking5,
  mockedBooking6,
  mockedBooking7,
  mockedBooking8,
  mockedBooking9,
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

  test("/GET /booking - Should be able to list all bookings", async () => {
    await request(app).post("/booking").send(mockedBooking7);

    const response = await request(app)
      .get("/booking")
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  test("GET /booking - Should not be able to list bookings without authentication", async () => {
    const response = await request(app).get("/booking");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /booking/:bookingId - Should be able to list one booking", async () => {
    const bookingResponse = await request(app)
      .post("/booking")
      .send(mockedBooking8)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    const response = await request(app).get(
      `/booking/${bookingResponse.body.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("message");
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: response.body.data.id,
        checkIn: response.body.data.checkIn,
        checkout: response.body.data.checkout,
        accommodationId: response.body.data.accommodationId,
        status: response.body.data.status,
        userId: response.body.data.userId,
      })
    );
  });

  test("GET /booking/:bookingId - Should no be able to list one booking without token", async () => {
    const bookingResponse = await request(app)
      .post("/booking")
      .send(mockedBooking8);

    const response = await request(app).get(
      `/booking/${bookingResponse.body.data.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /booking:bookingId - Must not be able to list a non-existent booking", async () => {
    const response = await request(app)
      .get("/booking/963")
      .set("Authorization", `Bearer ${genericUser.body.data.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /booking/:bookingId - Should be able to soft-delete booking as owner", async () => {
    const bookinResponse = await request(app)
      .post("/booking")
      .send(mockedBooking9);

    const response = await request(app)
      .delete(`/booking/${bookinResponse.body.data.id}`)
      .set("Authorization", `Bearer ${genericUser.body.data.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("canceled");
  });

  test("DELETE /booking/:bookingId - Should no be able to delete a booking without authentication", async () => {
    const bookinResponse = await request(app)
      .post("/booking")
      .send(mockedBooking10);

    const response = await request(app).delete(
      `/booking/${bookinResponse.body.data.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /booking/:bookingId - Should not be able to delete an inexistent booking", async () => {
    const response = await request(app)
      .delete("/booking/963")
      .set("Authorization", `Bearer ${genericUser.body.data.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
